<script lang="ts">
  import Hero from '$lib/components/section/Hero.svelte';
  import FeaturesGrid from '$lib/components/section/FeaturesGrid.svelte';
  import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

  // Features data
  const features = [
    {
      icon: '👨‍🏫',
      title: 'Personalisierter Unterricht',
      description:
        'Maßgeschneiderter Unterricht, der auf Ihr Spielniveau und Ihr Lerntempo abgestimmt ist.',
    },
    {
      icon: '🎯',
      title: 'Fachkundige Anleitung',
      description: 'Lernen Sie von erfahrenen Bridge-Meistern mit jahrzehntelanger Lehrerfahrung.',
    },
    {
      icon: '🏆',
      title: 'Nachgewiesene Ergebnisse',
      description:
        'Schließen Sie sich Hunderten von erfolgreichen Schülern an, die das Spiel mit uns gemeistert haben.',
    },
  ];
</script>

<div>
  <!-- Hero -->
  <section>
    <Hero />
  </section>

  <!-- Features -->
  <section>
    <SectionHeader
      description="Von den Grundlagen für Anfänger bis zum fortgeschrittenen Bieten bieten wir ein komplettes Toolkit für Bridge-Spieler."
      title="Alles, was Sie für den Erfolg brauchen"
    />
    <FeaturesGrid {features} />
  </section>
</div>
