import type { EventContentArg } from '@fullcalendar/core';
import deLocale from '@fullcalendar/core/locales/de';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useState } from 'react';

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

export default function Calendar({ events: initialEvents }: CalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/calendar', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch calendar: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data.events || []);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Calendar fetch error:', err);
        // Keep existing events if fetch fails
        setEvents(initialEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarEvents();

    // Optional: Refetch every 5 minutes
    const interval = setInterval(fetchCalendarEvents, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [initialEvents]);

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

  if (error) {
    return (
      <div className="p-4 mb-4 border-3 border-red-500 rounded-md bg-red-100">
        <p className="font-semibold text-red-700">
          Fehler beim Laden des Kalenders
        </p>
        <p className="text-sm text-red-600">{error}</p>
        <p className="text-xs text-red-500 mt-2">
          Bitte versuchen Sie die Seite zu aktualisieren.
        </p>
      </div>
    );
  }

  if (loading && events.length === 0) {
    return (
      <div className="p-8 text-center border-3 border-gray-300 rounded-md bg-gray-50">
        <p className="text-gray-600 font-medium">Kalender wird geladen...</p>
      </div>
    );
  }

  return (
    <div className="calendar-wrapper">
      {loading && (
        <div className="mb-4 p-2 bg-yellow-50 border-2 border-yellow-300 rounded-md text-sm text-yellow-700">
          Kalender wird aktualisiert...
        </div>
      )}
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
