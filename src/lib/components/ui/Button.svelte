<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
  let {
    href = '',
    variant = 'primary',
    text = '',
    onclick = () => {},
    disabled = false,
    type = 'button',
  }: {
    href?: string;
    variant?: 'primary' | 'secondary' | 'danger';
    text?: string;
    onclick?: (event: MouseEvent) => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
  } = $props();

  const baseClasses =
    'px-4 py-2 rounded-md w-full font-semibold text-center focus:outline-none focus:ring-2 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',

    secondary:
      'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 focus:ring-secondary-300',

    danger:
      'border border-warning-500 text-warning-600 bg-transparent ' +
      'hover:bg-warning-600 hover:text-white focus:bg-warning-600 focus:text-white ' +
      'focus:ring-warning-500 focus:ring-2 focus:ring-offset-1',
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;

  function handleClick(event: MouseEvent) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onclick(event);
  }
</script>

{#if href}
  <a
    {href}
    class={classes}
    onclick={handleClick}
    aria-label={text}
    aria-disabled={disabled}
    class:pointer-events-none={disabled}
  >
    {text}
  </a>
{:else}
  <button {type} class={classes} onclick={handleClick} {disabled} aria-label={text}>
    {text}
  </button>
{/if}