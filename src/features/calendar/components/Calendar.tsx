import type { EventContentArg } from '@fullcalendar/core';
import deLocale from '@fullcalendar/core/locales/de';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';

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

interface CalendarProps {
  events: CalendarEvent[];
}

const CALENDAR_LOCALE = {
  buttonText: {
    today: 'Heute',
    month: 'Monat',
    week: 'Woche',
  },
} as const;

const DESCRIPTION_PREVIEW_LENGTH = 50;

export default function Calendar({ events }: CalendarProps) {
  const parseDescription = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const eventContent = (info: EventContentArg) => {
    const description = info.event.extendedProps?.description;
    return (
      <div className="fc-event-content">
        <div className="fc-event-title">{info.event.title}</div>
        {description && (
          <div className="fc-event-description text-xs mt-1">
            {parseDescription(description).substring(
              0,
              DESCRIPTION_PREVIEW_LENGTH
            )}
            ...
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[listPlugin]}
        initialView="listMonth"
        locale={deLocale}
        events={events}
        eventContent={eventContent}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'listMonth,listWeek',
        }}
        buttonText={CALENDAR_LOCALE.buttonText}
      />
    </div>
  );
}
