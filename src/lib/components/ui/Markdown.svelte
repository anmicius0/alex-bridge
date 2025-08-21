<!-- src/lib/components/ui/Markdown.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { browser } from '$app/environment';

	let { content = '', truncate = null } = $props<{
		content?: string;
		truncate?: number | null;
	}>();

	let truncatedContent = $derived(
		truncate && content && content.length > truncate
			? content.substring(0, truncate) + '...'
			: content || ''
	);

	const rawHtml = $derived(marked(truncatedContent) as string);
	let safeHTML = $state('');

	$effect(() => {
		if (browser) {
			safeHTML = DOMPurify.sanitize(rawHtml);
		} else {
			safeHTML = rawHtml;
		}
	});
</script>

<!-- Changed class to 'prose' to use the Tailwind typography plugin -->
<div class="prose max-w-none">
	{@html safeHTML}
</div>