import ical from 'node-ical';
import { safeExecute } from '../../lib/api/error-handler';

const ICSURL =
  'https://calendar.google.com/calendar/ical/b7ba0af741653fd2b3b03a3d9f12b50c9ca0068deae2b8fa197ed24153dd1b9a%40group.calendar.google.com/private-0935864adb090d476b7d8ddafe76c363/basic.ics';

async function fetchEvents() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(ICSURL, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = ical.parseICS(await response.text());

    return Object.values(data)
      .filter((e: any) => e.type === 'VEVENT')
      .map((ev: any) => ({
        id: String(ev.uid ?? ''),
        title: String(ev.summary ?? ''),
        start: ev.start?.toISOString?.(),
        end: ev.end?.toISOString?.(),
        allDay: false,
        extendedProps: {
          description: ev.description,
          location: ev.location,
        },
      }));
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const result = await safeExecute(fetchEvents, {
    logLevel: 'error',
    context: 'calendar/api',
  });

  if (!result.success) {
    return new Response(JSON.stringify({ error: 'Failed to fetch calendar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ events: result.data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
