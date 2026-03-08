import ical from 'node-ical';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  extendedProps: {
    description?: string;
    location?: string;
  };
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const ICS_URL = import.meta.env.PUBLIC_CALENDAR_ICS_URL;

  if (!ICS_URL) {
    console.warn('PUBLIC_CALENDAR_ICS_URL is not configured');
    return [];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(ICS_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

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
    console.error('Failed to fetch calendar events:', error);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
