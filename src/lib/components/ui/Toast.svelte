<!-- src/lib/components/ui/Toast.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  import { toastStore, type Toast } from '$lib/stores/toasts';

  let { toast }: { toast: Toast } = $props();

  const baseClasses =
    'relative flex w-full items-start gap-4 overflow-hidden rounded-xl p-4 pr-10 shadow-strong backdrop-blur-sm';

  const typeStyles = {
    success: {
      container: 'bg-primary-50/90 text-primary-900 border border-primary-200/80',
      iconContainer: 'bg-primary-200 text-primary-700',
      progress: 'bg-primary-400'
    },
    error: {
      container: 'bg-warning-50/90 text-warning-900 border border-warning-200/80',
      iconContainer: 'bg-warning-200 text-warning-700',
      progress: 'bg-warning-400'
    },
    info: {
      container: 'bg-surface-100/90 text-surface-900 border border-surface-200/80',
      iconContainer: 'bg-surface-200 text-surface-700',
      progress: 'bg-surface-400'
    }
  };

  const currentStyle = typeStyles[toast.type];

  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  };
</script>

<div
  role="alert"
  class="{baseClasses} {currentStyle.container}"
  transition:fly={{ x: 100, duration: 400 }}
>
  <!-- Icon -->
  <div class="flex-shrink-0">
    <div
      class="flex h-8 w-8 items-center justify-center rounded-full {currentStyle.iconContainer}"
    >
      {@html icons[toast.type]}
    </div>
  </div>

  <!-- Message -->
  <div class="flex-1">
    <p class="font-semibold">{toast.message}</p>
  </div>

  <!-- Close Button -->
  <button
    onclick={() => toastStore.remove(toast.id)}
    aria-label="Benachrichtigung schließen"
    class="text-surface-500 hover:text-surface-900 absolute top-3 right-3 rounded-full p-1 transition-colors duration-200 hover:bg-black/10"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>

  <!-- Progress Bar -->
  {#if toast.duration > 0}
    <div
      class="absolute bottom-0 left-0 h-1 {currentStyle.progress}"
      style="animation: progress {toast.duration}ms linear forwards;"
    ></div>
  {/if}
</div>

<style>
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
</style>