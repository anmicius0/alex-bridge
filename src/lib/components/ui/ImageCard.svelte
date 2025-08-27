<!-- src/lib/components/ui/ImageCard.svelte -->
<script lang="ts">
	import Markdown from '$lib/components/ui/Markdown.svelte';
	import Carousel from '$lib/components/ui/Carousel.svelte';
	import type { Snippet } from 'svelte';

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
		<Carousel images={images.map(src => ({ src, alt: title || 'Product image' }))} />
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