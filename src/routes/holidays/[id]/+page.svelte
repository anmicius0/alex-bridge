<!-- src/routes/holidays/[id]/+page.svelte -->
<script lang="ts">
  import Markdown from '$lib/components/ui/Markdown.svelte';
  import type { PageData } from './$types';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import type { Holiday } from '$lib/types'; // Import from centralized types
  import DownloadLink from '$lib/components/ui/DownloadLink.svelte'; // Import the new component

  let { data } = $props<{ data: PageData }>();

  let holiday = $derived(data.holiday as Holiday);

  // Carousel state
  let currentImageIndex = $state(0);
  let images = $derived(holiday.image || []);

  onMount(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
      }, 5000); // Auto-advance every 5 seconds
      return () => clearInterval(interval);
    }
  });
</script>

<section class="mx-auto max-w-4xl p-6" transition:fade={{ duration: 300 }}>
  <a
    href="/holidays"
    class="text-primary-700 mb-6 inline-flex items-center font-semibold hover:underline"
    >← Zurück zu den Reisen</a
  >

  <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
    <h1 class="text-3xl font-bold">{holiday.name}</h1>
    <span
      class="border-surface-200 bg-surface-50 text-surface-900 inline-flex items-center rounded-xl border px-4 py-2 text-lg font-bold shadow-sm"
    >
      €{holiday.price}
    </span>
  </div>

  <!-- Main content (full width) -->
  <div class="space-y-6">
    {#if images.length > 0}
      <div class="card relative overflow-hidden rounded-lg shadow-md">
        <!-- Simplified Carousel using a #key block for transitions -->
        <div class="relative h-64 w-full md:h-96">
          {#key currentImageIndex}
            <img
              src={images[currentImageIndex].downloadURL}
              alt={images[currentImageIndex].name}
              class="absolute inset-0 h-full w-full rounded-lg object-cover"
              loading="lazy"
              transition:fade={{ duration: 500 }}
            />
          {/key}
        </div>
        <!-- Carousel controls -->
        <button
          class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow"
          aria-label="Vorheriges Bild"
          onclick={() =>
            (currentImageIndex = (currentImageIndex - 1 + images.length) % images.length)}
        >
          ←
        </button>
        <button
          class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow"
          aria-label="Nächstes Bild"
          onclick={() => (currentImageIndex = (currentImageIndex + 1) % images.length)}
        >
          →
        </button>
      </div>
    {/if}

    <div class="card space-y-4 rounded-lg bg-white p-6 shadow-md">
      <Markdown content={holiday.longDescription} />
    </div>

    <!-- File Downloads Section -->
    {#if holiday.files && holiday.files.length > 0}
      <div class="card space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h3 class="text-surface-800 text-2xl font-bold">Reiseunterlagen</h3>
        <div class="flex flex-wrap gap-3">
          <!-- Use the DownloadLink component -->
          {#each holiday.files as file (file.downloadURL)}
            <DownloadLink href={file.downloadURL} name={file.name} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>
