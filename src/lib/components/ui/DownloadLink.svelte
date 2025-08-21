<!-- src/lib/components/ui/DownloadLink.svelte -->
<script lang="ts">
  let { href, name }: { href: string; name: string } = $props();
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  download
  class="bg-surface-100 hover:bg-surface-200 text-surface-800 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200"
>
  <!-- Download Icon -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-download"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
  <span>{name}</span>
</a>
