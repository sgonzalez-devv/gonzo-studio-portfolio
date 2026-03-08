import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cancelCalendarEvent } from '@/lib/google-calendar';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { eventId } = await request.json();
    const appointmentId = params.id;

    // Cancelar evento en Google Calendar
    if (eventId) {
      try {
        await cancelCalendarEvent(eventId);
      } catch (error) {
        console.error('Error canceling Google Calendar event:', error);
        // Continuar aunque falle el cancelar en Google
      }
    }

    // Actualizar estado en base de datos
    const { error: updateError } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', appointmentId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return NextResponse.json(
      { error: 'Failed to cancel appointment' },
      { status: 500 }
    );
  }
}
