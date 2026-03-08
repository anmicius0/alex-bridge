import ical from 'node-ical';
import { ErrorHandler } from '@lib/error-handler';
import type { CalendarEvent } from '../../../types/content';

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const ICS_URL = import.meta.env.PUBLIC_CALENDAR_ICS_URL;

  if (!ICS_URL) {
    ErrorHandler.logError(ErrorHandler.createError('PUBLIC_CALENDAR_ICS_URL is not configured', undefined, 'calendar/fetch'));
    return [];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(ICS_URL, { signal: controller.signal });
    if (!response.ok) throw ErrorHandler.createError(`HTTP ${response.status}`, response.status, 'calendar/fetch');

    const data = ical.parseICS(await response.text());

    return Object.values(data)
      .filter((event): event is ical.VEventType => event.type === 'VEVENT')
      .map((event) => ({
        id: String(event.uid ?? ''),
        title: String(event.summary ?? ''),
        start: event.start?.toISOString?.(),
        end: event.end?.toISOString?.(),
        allDay: false,
        extendedProps: {
          description: event.description,
          location: event.location,
        },
      }));
  } catch (error) {
    ErrorHandler.logError(error, 'calendar/fetch');
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
