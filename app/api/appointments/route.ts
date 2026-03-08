import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCalendarEvent } from '@/lib/google-calendar';
import { Resend } from 'resend';

// Inicializar Resend solo si hay API key válida
const resend = process.env.RESEND_API_KEY && 
               process.env.RESEND_API_KEY !== 'PENDING_CREATE_RESEND_ACCOUNT' 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientEmail, clientName, appointmentDate, notes } = body;

    // Validaciones
    if (!clientEmail || !appointmentDate) {
      return NextResponse.json(
        { error: 'Email and appointment date are required' },
        { status: 400 }
      );
    }

    // Verificar que la fecha sea futura
    const appointmentDateTime = new Date(appointmentDate);
    if (appointmentDateTime <= new Date()) {
      return NextResponse.json(
        { error: 'Appointment date must be in the future' },
        { status: 400 }
      );
    }

    // Crear evento en Google Calendar
    const calendarEvent = await createCalendarEvent({
      clientEmail,
      clientName: clientName || 'Cliente',
      appointmentDate: appointmentDateTime,
      durationMinutes: 60,
      notes,
    });

    // Guardar en base de datos
    const supabase = await createClient();
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert({
        client_email: clientEmail,
        client_name: clientName || 'Cliente',
        appointment_date: appointmentDateTime.toISOString(),
        duration_minutes: 60,
        google_calendar_event_id: calendarEvent.eventId,
        google_meet_link: calendarEvent.meetLink,
        status: 'scheduled',
        notes: notes || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save appointment to database');
    }

    // Enviar email de confirmación adicional (opcional, ya que Google Calendar envía uno)
    if (resend && process.env.BUSINESS_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.BUSINESS_EMAIL,
          to: clientEmail,
          subject: '✅ Cita Confirmada - Gonzo Studio',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">¡Tu cita ha sido confirmada!</h1>
              <p>Hola ${clientName || 'Cliente'},</p>
              <p>Tu cita para discutir tu proyecto de diseño ha sido confirmada.</p>
              
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Detalles de la reunión:</h3>
                <p><strong>Fecha y hora:</strong> ${appointmentDateTime.toLocaleString('es-MX', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                  timeZone: 'America/Mexico_City'
                })}</p>
                <p><strong>Duración:</strong> 1 hora</p>
                ${calendarEvent.meetLink ? `
                  <p><strong>Link de Google Meet:</strong></p>
                  <a href="${calendarEvent.meetLink}" style="display: inline-block; background-color: #4285f4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 10px;">
                    Unirse a la reunión
                  </a>
                ` : ''}
              </div>

              <p>También recibirás una invitación de calendario de Google con todos los detalles y recordatorios automáticos.</p>
              
              <p>Si necesitas cancelar o reprogramar, por favor contáctame lo antes posible.</p>
              
              <p>¡Espero poder hablar contigo pronto!</p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              <p style="color: #666; font-size: 14px;">
                Gonzo Studio<br>
                Design & Branding
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // No lanzar error, el appointment ya fue creado
      }
    }

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        meetLink: calendarEvent.meetLink,
        calendarLink: calendarEvent.htmlLink,
      },
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

// GET - Obtener slots disponibles para una fecha
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Obtener citas para la fecha específica
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('appointment_date, duration_minutes')
      .gte('appointment_date', startOfDay.toISOString())
      .lte('appointment_date', endOfDay.toISOString())
      .eq('status', 'scheduled');

    if (error) {
      throw error;
    }

    // Generar slots disponibles (ej: 9am - 6pm, cada hora)
    const availableSlots = [];
    const workingHours = { start: 9, end: 18 }; // 9am a 6pm
    
    for (let hour = workingHours.start; hour < workingHours.end; hour++) {
      const slotTime = new Date(date);
      slotTime.setHours(hour, 0, 0, 0);

      // Verificar si ya hay una cita en este horario
      const isBooked = appointments?.some((apt) => {
        const aptDate = new Date(apt.appointment_date);
        return aptDate.getHours() === hour;
      });

      if (!isBooked && slotTime > new Date()) {
        availableSlots.push({
          time: slotTime.toISOString(),
          label: `${hour}:00`,
        });
      }
    }

    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}
