<!-- src/lib/components/ui/IconBox.svelte -->
<script lang="ts">
  interface Props {
    icon: string;
    size?: 'md' | 'lg' | 'xl';
    class?: string;
  }

  let { icon, size = 'lg', class: extraClass = '' }: Props = $props();

  // Refactored to be more descriptive and to support aspect-square
  const sizeStyles = {
    md: {
      dimension: 'w-12 md:w-16', // We only need to set the width now
      textSize: 'text-2xl md:text-3xl',
      rounded: 'rounded-xl',
    },
    lg: {
      dimension: 'w-16 md:w-20',
      textSize: 'text-3xl md:text-4xl',
      rounded: 'rounded-2xl',
    },
    xl: {
      dimension: 'w-20 md:w-24',
      textSize: 'text-4xl md:text-5xl',
      rounded: 'rounded-2xl',
    },
  };

  const currentStyle = $derived(sizeStyles[size]);
</script>

<div
  class="border-primary-200/60 bg-primary-50 my-4 flex aspect-square items-center justify-center border shadow-lg {currentStyle.dimension} {currentStyle.rounded} {extraClass}"
>
  <span class="drop-shadow-sm filter {currentStyle.textSize}">
    {icon}
  </span>
</div>
