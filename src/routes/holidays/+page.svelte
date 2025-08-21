<!-- src/routes/holidays/+page.svelte -->
<script lang="ts">
  import PageHeader from '$lib/components/section/PageHeader.svelte';
  import ImageCard from '$lib/components/ui/ImageCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import type { PageData } from './$types';
  import type { Holiday } from '$lib/types';

  let { data } = $props<{ data: PageData }>();

  let holidays: Holiday[] = $derived(data.holidays as Holiday[]);
  let currentImageIndices = $state<number[]>([]);

  $effect.pre(() => {
    currentImageIndices.length = holidays.length;
    currentImageIndices.fill(0);
  });
</script>

<section>
  <PageHeader
    description="Kombinieren Sie Ihre Leidenschaft für Bridge mit unvergesslichen Reiseerlebnissen."
    icon="🧳"
    title="Bridge-Reisen"
  />
</section>

<!-- Holidays Grid -->
<section>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#if holidays.length > 0}
      {#each holidays as holiday, i (holiday.id)}
        <ImageCard
          images={holiday.image?.map((img) => img.downloadURL) ?? []}
          title={holiday.name}
          bind:currentImageIndex={currentImageIndices[i]}
          description={holiday.shortDescription}
        >
          <Button href={`/holidays/${holiday.id}`} text="Details ansehen" />
        </ImageCard>
      {/each}
    {:else}
      <div class="col-span-1 p-12 text-center md:col-span-2 lg:col-span-3">
        <h3>🧳 Keine Reisen verfügbar</h3>
        <p class="text-surface-600">
          Schauen Sie bald wieder vorbei für aufregende Bridge-Reisemöglichkeiten!
        </p>
      </div>
    {/if}
  </div>
</section>
