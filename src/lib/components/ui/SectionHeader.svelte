<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div class="my-8 text-center">
	<div>
		<h2>{title}</h2>
	</div>

	<p class="text-surface-600 mx-auto">
		{description}
	</p>
</div>
