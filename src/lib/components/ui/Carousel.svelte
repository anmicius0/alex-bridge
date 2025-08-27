<!-- src/lib/components/ui/Carousel.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';

  type Image = { src: string; alt: string };

  let {
    images,
    showDots = true,
    showNavButtons = true,
    autoplayDelay = 0, // in ms, 0 to disable
  }: {
    images: Image[];
    showDots?: boolean;
    showNavButtons?: boolean;
    autoplayDelay?: number;
  } = $props();

  let currentIndex = $state(0);
  let isHovering = $state(false);
  const numImages = images.length;

  function next(): void {
    currentIndex = (currentIndex + 1) % numImages;
  }

  function prev(): void {
    currentIndex = (currentIndex - 1 + numImages) % numImages;
  }

  function goTo(index: number): void {
    currentIndex = index;
  }

  // Use $effect for lifecycle-aware intervals
  $effect(() => {
    if (autoplayDelay > 0 && !isHovering) {
      const interval = setInterval(next, autoplayDelay);

      // Cleanup function is returned from the effect
      return () => {
        clearInterval(interval);
      };
    }
  });
</script>

{#if numImages > 0}
  <div
    role="region"
    aria-roledescription="carousel"
    aria-label="Bildergalerie"
    class="group relative aspect-[8/5] overflow-hidden"
    onmouseenter={() => (isHovering = true)}
    onmouseleave={() => (isHovering = false)}
  >
    <!-- Keyed block for transitions -->
    {#key currentIndex}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        class="absolute inset-0 h-full w-full object-cover"
        transition:fade={{ duration: 300 }}
      />
    {/key}

    <!-- Navigation -->
    {#if numImages > 1 && showNavButtons}
      <div
        class="absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <button
          onclick={prev}
          aria-label="Previous image"
          class="bg-surface-900/40 hover:bg-surface-900/60 rounded-full p-2.5 text-white"
        >
          &larr;
        </button>
        <button
          onclick={next}
          aria-label="Next image"
          class="bg-surface-900/40 hover:bg-surface-900/60 rounded-full p-2.5 text-white"
        >
          &rarr;
        </button>
      </div>
    {/if}

    <!-- Dots -->
    {#if numImages > 1 && showDots}
      <div class="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {#each { length: numImages } as _, i}
          <button
            aria-label={`Go to image ${i + 1}`}
            class="h-2 w-2 rounded-full {currentIndex === i ? 'bg-white' : 'bg-white/50'}"
            onclick={() => goTo(i)}
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}