<!-- src/lib/components/ui/Toaster.svelte -->
<script lang="ts">
  import { toastStore } from '$lib/stores/toasts';
  import Toast from './Toast.svelte';
</script>

{#if $toastStore.length > 0}
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end justify-start gap-4 p-6 md:p-8"
  >
    {#each $toastStore as toast (toast.id)}
      <div class="pointer-events-auto w-full max-w-sm">
        <Toast {toast} />
      </div>
    {/each}
  </div>
{/if}