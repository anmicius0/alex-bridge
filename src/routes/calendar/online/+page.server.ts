// calendar/online/+page.server.ts
import ical from 'node-ical';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const icalUrl =
    'https://calendar.google.com/calendar/ical/b7ba0af741653fd2b3b03a3d9f12b50c9ca0068deae2b8fa197ed24153dd1b9a%40group.calendar.google.com/public/basic.ics';

  const data = await ical.async.fromURL(icalUrl);

  // Extract and map VEVENTs to FullCalendar-compatible event format
  const events = Object.values(data)
    .filter((event) => event.type === 'VEVENT')
    .map((event) => ({
      id: event.uid,
      title: event.summary,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      allDay: false,
      extendedProps: {
        description: event.description,
        location: event.location,
      },
    }));

  return {
    events,
    calendar: {
      label: 'onlineClass',
      id: 'b7ba0af741653fd2b3b03a3d9f12b50c9ca0068deae2b8fa197ed24153dd1b9a@group.calendar.google.com',
      className: 'onlineClass',
      color: '#6b7280',
    },
  };
};
