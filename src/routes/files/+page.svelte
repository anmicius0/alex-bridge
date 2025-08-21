<!-- src/routes/files/+page.svelte -->
<script lang="ts">
  import PageHeader from '$lib/components/section/PageHeader.svelte';
  import DownloadLink from '$lib/components/ui/DownloadLink.svelte'; // Import the new component
  import type { PageData } from './$types';

  let { data } = $props<{ data: PageData }>();
  $inspect(data);
  let fileDocuments = $derived(data.fileDocuments);
</script>

<section>
  <PageHeader
    description="Hier finden Sie verschiedene Materialien und Dokumente zum Herunterladen."
    icon="📁"
    title="Downloads"
  />
</section>

<!-- Files List -->
<section>
  <div class="card w-full space-y-8 p-6 md:p-8">
    {#if fileDocuments && fileDocuments.length > 0}
      {#each fileDocuments as doc (doc.id)}
        <div>
          <h2 class="text-surface-800 mb-4 text-xl font-bold">{doc.filename}</h2>
          <div class="flex flex-wrap gap-3">
            <!-- Use the DownloadLink component in a loop -->
            {#each doc.files as file (file.downloadURL)}
              <DownloadLink href={file.downloadURL} name={file.name} />
            {/each}
          </div>
        </div>
      {/each}
    {:else if data.error}
      <div class="p-12 text-center">
        <h3 class="text-warning-700 mb-2 text-lg font-semibold">Fehler beim Laden der Dateien</h3>
        <p class="text-surface-600">
          {data.error}
        </p>
      </div>
    {:else}
      <div class="p-12 text-center">
        <h3 class="mb-2 text-lg font-semibold">📂 Keine Dateien verfügbar</h3>
        <p class="text-surface-600">
          Derzeit sind keine Dateien zum Herunterladen verfügbar. Schauen Sie bald wieder vorbei!
        </p>
      </div>
    {/if}
  </div>
</section>
