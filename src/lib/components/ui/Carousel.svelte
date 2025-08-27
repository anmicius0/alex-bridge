<!-- src/lib/components/ui/Carousel.svelte -->
<script lang="ts">
	import { fade } from 'svelte/transition';

	type Image = { src: string; alt: string };

	let {
		images,
		showDots = true,
		showNavButtons = true,
		autoplayDelay = 0
	}: {
		images: Image[];
		showDots?: boolean;
		showNavButtons?: boolean;
		autoplayDelay?: number; // in ms, 0 to disable
	} = $props();

	let currentIndex = $state(0);
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

	if (autoplayDelay > 0) {
		setInterval(next, autoplayDelay);
	}
</script>

{#if numImages > 0}
	<div class="group relative aspect-[8/5] overflow-hidden">
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
					/>
				{/each}
			</div>
		{/if}
	</div>
{/if}