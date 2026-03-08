import { google } from 'googleapis';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

export function getGoogleAuth() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_SITE_URL ? 
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/google` :
      'http://localhost:3000/api/auth/callback/google'
  );

  auth.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return auth;
}

export function getCalendarClient() {
  const auth = getGoogleAuth();
  return google.calendar({ version: 'v3', auth });
}

export interface AppointmentData {
  clientEmail: string;
  clientName: string;
  appointmentDate: Date;
  durationMinutes?: number;
  notes?: string;
}

export async function createCalendarEvent(data: AppointmentData) {
  const calendar = getCalendarClient();
  
  const endDate = new Date(data.appointmentDate);
  endDate.setMinutes(endDate.getMinutes() + (data.durationMinutes || 60));

  const event = {
    summary: `Consulta de Diseño - ${data.clientName}`,
    description: `Reunión con cliente potencial: ${data.clientName}\nEmail: ${data.clientEmail}${data.notes ? `\nNotas: ${data.notes}` : ''}`,
    start: {
      dateTime: data.appointmentDate.toISOString(),
      timeZone: 'America/Mexico_City', // Ajusta según tu zona horaria
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: 'America/Mexico_City',
    },
    attendees: [
      { email: data.clientEmail },
    ],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 día antes
        { method: 'popup', minutes: 60 }, // 1 hora antes
        { method: 'email', minutes: 60 }, // 1 hora antes
      ],
    },
    guestsCanModify: false,
    guestsCanInviteOthers: false,
    guestsCanSeeOtherGuests: false,
  };

  try {
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Envía invitación por email automáticamente
    });

    return {
      eventId: response.data.id,
      meetLink: response.data.hangoutLink || response.data.conferenceData?.entryPoints?.[0]?.uri,
      htmlLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error('Failed to create calendar event');
  }
}

export async function getAvailableSlots(date: Date) {
  const calendar = getCalendarClient();
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw new Error('Failed to fetch calendar events');
  }
}

export async function cancelCalendarEvent(eventId: string) {
  const calendar = getCalendarClient();

  try {
    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
      sendUpdates: 'all', // Notifica a los asistentes
    });

    return true;
  } catch (error) {
    console.error('Error canceling calendar event:', error);
    throw new Error('Failed to cancel calendar event');
  }
}

export async function updateCalendarEvent(
  eventId: string,
  updates: Partial<AppointmentData>
) {
  const calendar = getCalendarClient();

  try {
    const event = await calendar.events.get({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
    });

    if (!event.data) {
      throw new Error('Event not found');
    }

    const updatedEvent: any = { ...event.data };

    if (updates.appointmentDate) {
      const endDate = new Date(updates.appointmentDate);
      endDate.setMinutes(endDate.getMinutes() + (updates.durationMinutes || 60));

      updatedEvent.start = {
        dateTime: updates.appointmentDate.toISOString(),
        timeZone: 'America/Mexico_City',
      };
      updatedEvent.end = {
        dateTime: endDate.toISOString(),
        timeZone: 'America/Mexico_City',
      };
    }

    if (updates.clientName || updates.clientEmail) {
      updatedEvent.summary = `Consulta de Diseño - ${updates.clientName || event.data.summary}`;
    }

    const response = await calendar.events.update({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId: eventId,
      requestBody: updatedEvent,
      sendUpdates: 'all',
    });

    return response.data;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    throw new Error('Failed to update calendar event');
  }
}
