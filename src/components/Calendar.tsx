import type { EventContentArg } from '@fullcalendar/core';
import deLocale from '@fullcalendar/core/locales/de';
import listPlugin from '@fullcalendar/list';
// FullCalendar ships React typings; this project uses Preact via Astro's renderer which
// can cause an incompatible JSX type error. Narrowing to `any` for the imported
// component avoids a broad refactor while keeping type-safety for our props below.
import FullCalendar from '@fullcalendar/react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FullCalendarAny: any = FullCalendar;

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  extendedProps?: {
    description?: string;
    location?: string;
  };
}

export interface CalendarProps {
  events: CalendarEvent[];
}

export default function Calendar({ events }: CalendarProps) {
  const parseDescription = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elements: any[] = [];
    let index = 0;

    Array.from(div.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        elements.push(node.textContent);
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as Element).tagName === 'A'
      ) {
        const href = (node as Element).getAttribute('href') || '';
        elements.push(
          <a
            key={`link-${index++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {(node as Element).textContent || href}
          </a>
        );
      }
    });

    return elements;
  };

  return (
    <div className="p-4 bg-white border-black rounded-2xl shadow-brutalSm border-3">
      <FullCalendarAny
        locale={deLocale}
        initialView="listMonth"
        plugins={[listPlugin]}
        headerToolbar={{ left: '', center: 'title', right: 'prev,next' }}
        events={events}
        eventContent={(arg: EventContentArg) => (
          <div className="flex flex-col">
            <div className="font-bold">{arg.event.title}</div>
            <div className="text-sm text-gray-600">{arg.timeText}</div>
            <div className="mt-1 text-sm">
              {parseDescription(arg.event.extendedProps?.description || '')}
            </div>
          </div>
        )}
      />
    </div>
  );
}
