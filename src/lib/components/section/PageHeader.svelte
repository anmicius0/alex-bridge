<script lang="ts">
	import IconBox from '$lib/components/ui/IconBox.svelte';

	let { icon, title, description }: {
		icon: string;
		title: string;
		description: string;
	} = $props();
</script>

<header class="animate-slide-up mb-16 text-center">
	<div class="mb-8 flex flex-col items-center justify-center">
		<IconBox icon={icon} size="xl" />
		<h1>{title}</h1>
		<p class="text-surface-600  max-w-3xl text-xl">
			{description}
		</p>
	</div>
</header>
