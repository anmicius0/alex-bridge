<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import Menubar from '$lib/components/ui/Menubar.svelte';
  import Footer from '$lib/components/ui/Footer.svelte'; // Import the new Footer component
  import { authStore } from '$lib/stores/user.js';

  let { children } = $props();
</script>

{#if $authStore.loading}
  <div class="bg-surface-100 flex h-screen items-center justify-center">
    <div
      class="border-primary-500 h-12 w-12 animate-spin rounded-full border-t-2 border-solid"
    ></div>
  </div>
{:else}
  <Menubar />

  <div
    class="from-surface-50 via-primary-50/30 to-surface-100 relative min-h-screen bg-gradient-to-br"
  >
    <main class="container mx-auto max-w-6xl px-4">
      {@render children()}
    </main>
  </div>

  <!-- Add the Footer component at the end of the layout -->
  <Footer />
{/if}
