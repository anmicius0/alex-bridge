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

export interface CalendarProps {
  events: CalendarEvent[];
}

export default function Calendar({ events }: CalendarProps) {
  const parseDescription = (html: string) => {
    if (!html) return '';
    // Remove HTML tags
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const eventContent = (info: EventContentArg) => {
    return (
      <div className="fc-event-content">
        <div className="fc-event-title">{info.event.title}</div>
        {info.event.extendedProps?.description && (
          <div className="fc-event-description text-xs mt-1">
            {parseDescription(info.event.extendedProps.description).substring(
              0,
              50
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
        buttonText={{
          today: 'Heute',
          month: 'Monat',
          week: 'Woche',
        }}
      />
    </div>
  );
}
