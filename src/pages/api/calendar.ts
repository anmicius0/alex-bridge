import { fetchCalendarEvents } from '../../features/calendar/services/calendar';
import { safeExecute } from '../../lib/api/error-handler';

export async function GET() {
  const result = await safeExecute(fetchCalendarEvents, {
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
