<!-- src/lib/components/ui/ImageCard.svelte -->
<script lang="ts">
	import Markdown from '$lib/components/ui/Markdown.svelte';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	let {
		images = [],
		title,
		description,
		currentImageIndex = $bindable(0),
		children
	}: {
		images?: string[];
		title?: string;
		description?: string;
		currentImageIndex?: number;
		children?: Snippet;
	} = $props();

	const numImages = images.length;

	function nextImage() {
		if (numImages > 0) {
			currentImageIndex = (currentImageIndex + 1) % numImages;
		}
	}

	function prevImage() {
		if (numImages > 0) {
			currentImageIndex = (currentImageIndex - 1 + numImages) % numImages;
		}
	}

	function goToImage(index: number) {
		if (index >= 0 && index < numImages) {
			currentImageIndex = index;
		}
	}
</script>

<div class="card flex flex-col overflow-hidden">
	<!-- Image Carousel -->
	{#if numImages > 0}
		<div class="group relative aspect-[8/5] overflow-hidden">
			<!-- The #key block re-renders the image on change, allowing for transitions -->
			{#key currentImageIndex}
				<img
					src={images[currentImageIndex]}
					alt={title ?? 'Product image'}
					class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
					transition:fade={{ duration: 300 }}
				/>
			{/key}

			{#if numImages > 1}
				<!-- Navigation Buttons -->
				<div
					class="absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				>
					<button
						onclick={prevImage}
						aria-label="Previous image"
						class="bg-surface-900/40 hover:bg-surface-900/60 rounded-full p-2.5 text-white transition-colors focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="h-5 w-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
					<button
						onclick={nextImage}
						aria-label="Next image"
						class="bg-surface-900/40 hover:bg-surface-900/60 rounded-full p-2.5 text-white transition-colors focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="h-5 w-5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>

				<!-- Dot Indicators -->
				<div class="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
					{#each { length: numImages } as _, i}
						<button
							aria-label={`Go to image ${i + 1}`}
							class="h-2 w-2 rounded-full transition-colors duration-300 {currentImageIndex === i
								? 'bg-white'
								: 'bg-white/50 hover:bg-white/75'}"
							onclick={() => goToImage(i)}
						></button>
					{/each}
				</div>
			{/if}
		</div>
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