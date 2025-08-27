<!-- src/lib/components/ui/ImageCard.svelte -->
<script lang="ts">
  import Markdown from '$lib/components/ui/Markdown.svelte';
  import Carousel from '$lib/components/ui/Carousel.svelte';
  import type { Snippet } from 'svelte';

  let {
    images = [],
    title,
    description,
    children,
  }: {
    images?: string[];
    title?: string;
    description?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="card flex flex-col overflow-hidden">
  <!-- Image Carousel -->
  {#if images.length > 0}
    <Carousel images={images.map((src) => ({ src, alt: title || 'Product image' }))} />
  {/if}

  <!-- Content Section -->
  <div class="flex flex-grow flex-col p-6">
    <div class="flex-grow">
      {#if title}
        <h3 class="mb-2">{title}</h3>
      {/if}
      {#if description}
        <div class="prose-sm">
          <Markdown content={description} />
        </div>
      {/if}
    </div>
    {#if children}
      <div class="mt-4">
        {@render children()}
      </div>
    {/if}
  </div>
</div>