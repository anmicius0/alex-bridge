<!-- src/lib/components/section/FeaturesGrid.svelte -->
<script lang="ts">
  import IconBox from '$lib/components/ui/IconBox.svelte';

  interface FeatureItem {
    icon: string;
    title: string;
    description: string;
    delay?: string; // Optional, but not currently used; consider removing if unnecessary
  }

  interface Props {
    features: FeatureItem[];
  }

  let { features }: Props = $props();
</script>

<div class="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {#each features as feature, i (feature.title)}
    <div
      class="card flex flex-col justify-between p-7 text-center"
      style="animation-delay: {i * 0.1}s;"
    >
      <div class="flex flex-col items-center">
        <div class="mb-5 flex justify-center">
          <IconBox icon={feature.icon} size="lg" />
        </div>
        <h3>
          {feature.title}
        </h3>
      </div>
      <p class="text-surface-600 text-base">{feature.description}</p>
    </div>
  {/each}
</div>
