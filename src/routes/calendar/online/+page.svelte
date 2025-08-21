<script lang="ts">
  import FullCalendar from 'svelte-fullcalendar';
  import listPlugin from '@fullcalendar/list';
  import iCalendarPlugin from '@fullcalendar/icalendar';
  import deLocale from '@fullcalendar/core/locales/de';
  import PageHeader from '$lib/components/section/PageHeader.svelte';

  let { data } = $props();
  $inspect(data);

  let options = $state({
    locale: deLocale, // Set calendar language to German
    initialView: 'listMonth',
    plugins: [listPlugin, iCalendarPlugin],
    headerToolbar: {
      left: '',
      center: 'title',
      right: 'prev,next',
    },
    events: data.events,
    // Custom event rendering to include description
    eventContent: (arg: {
      event: { title: string; extendedProps?: { description?: string } };
      timeText: string;
    }) => {
      const { event } = arg;
      const title = event.title;
      const timeText = arg.timeText; // e.g., '14:00 - 15:00'
      const description = event.extendedProps?.description || 'Keine Beschreibung verfügbar';

      // Return custom HTML structure (you can style with Tailwind classes)
      return {
        html: `
			  <div class="flex flex-col">
				<div class="font-bold">${title}</div>
				<div class="text-sm text-gray-600">${timeText}</div>
				<div class="text-sm mt-1">${description}</div>
			  </div>
			`,
      };
    },
  });
</script>

<section>
  <PageHeader
    description="Durchsuchen Sie den Zeitplan für bevorstehende Online-Bridgekurse. Alle Sitzungen finden live statt und sind interaktiv."
    icon="📅"
    title="Online-Kursplan"
  />
</section>

<!-- Calendar section -->
<section>
  <div class="bg-surface-50 card p-4">
    <FullCalendar {options} />
  </div>
</section>
