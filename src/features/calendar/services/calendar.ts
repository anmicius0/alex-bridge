import ical from 'node-ical';

const ICSURL =
  'https://calendar.google.com/calendar/ical/b7ba0af741653fd2b3b03a3d9f12b50c9ca0068deae2b8fa197ed24153dd1b9a%40group.calendar.google.com/private-0935864adb090d476b7d8ddafe76c363/basic.ics';

export async function fetchCalendarEvents() {
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
