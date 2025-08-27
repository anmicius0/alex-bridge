<!-- alex-bridge/src/routes/+page.svelte -->
<script lang="ts">
  import Hero from '$lib/components/section/Hero.svelte';
  import FeaturesGrid from '$lib/components/section/FeaturesGrid.svelte';
  import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import IconBox from '$lib/components/ui/IconBox.svelte';

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

  <!-- What I Offer Section -->
  <section>
    <SectionHeader
      title="Mein Angebot für Sie"
      description="Entdecken Sie die Vielfalt meiner Kurse, Reisen und Coaching-Möglichkeiten."
    />
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- Offer Card 1: Reisen -->
      <div class="card flex flex-col items-center p-8 text-center">
        <IconBox icon="🧳" size="lg" />
        <h3 class="mt-4">Bridge-Reisen</h3>
        <p class="text-surface-600 my-4 flex-grow">
          Kombinieren Sie Ihre Leidenschaft für Bridge mit exklusiven Reisen zu den schönsten Zielen.
        </p>
        <Button href="/holidays" text="Reisen entdecken" variant="secondary" />
      </div>

      <!-- Offer Card 2: Online Kurse -->
      <div class="card flex flex-col items-center p-8 text-center">
        <IconBox icon="💻" size="lg" />
        <h3 class="mt-4">Online-Kurse</h3>
        <p class="text-surface-600 my-4 flex-grow">
          Lernen Sie flexibel von zu Hause aus in interaktiven Online-Gruppen und Seminaren.
        </p>
        <Button href="/calendar/online" text="Kurskalender ansehen" variant="secondary" />
      </div>

      <!-- Offer Card 3: Coaching -->
      <div class="card flex flex-col items-center p-8 text-center">
        <IconBox icon="💡" size="lg" />
        <h3 class="mt-4">Privatunterricht</h3>
        <p class="text-surface-600 my-4 flex-grow">
          Intensives Einzel- oder Gruppencoaching, um Ihr Spiel gezielt auf das nächste Level zu
          heben.
        </p>
        <Button href="#contact" text="Kontakt aufnehmen" variant="secondary" />
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about">
    <!-- Hero Greeting -->
    <div
      class="mb-16 flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:gap-12 lg:text-left"
    >
      <div class="relative flex-shrink-0">
        <img
          alt="Alexander - Bridge-Lehrer"
          class="border-primary-200 h-48 w-48 rounded-full border-4 object-cover shadow-lg md:h-64 md:w-64"
          src="/alex/square.webp"
        />
      </div>
      <div class="flex-1 space-y-4">
        <h1 class="text-surface-900 text-4xl leading-tight font-black md:text-5xl lg:text-6xl">
          Alexander
        </h1>
        <p class="text-primary-700 text-xl font-semibold">
          Mehrfacher Deutscher Meister, Coach, Bridgelehrer, Turnierleiter und Reiseveranstalter
        </p>
        <p class="text-surface-600 max-w-3xl text-lg">
          Alexander zählt zu den profiliertesten Persönlichkeiten der deutschen Bridgeszene. Das
          Bridgespielen hat er bereits im Alter von fünf Jahren von seinem Vater erlernt. Mit neun
          Jahren nahm er an seinem ersten Bridgeturnier teil – der Beginn einer außergewöhnlichen
          Karriere.
        </p>
      </div>
    </div>

    <!-- Alternating Content 1: Berufliche Schwerpunkte -->
    <div class="mb-16 grid items-center gap-12 lg:grid-cols-2">
      <div class="order-2 lg:order-1">
        <div class="mb-4 flex items-center gap-4">
          <IconBox icon="💼" size="md" />
          <h3 class="text-surface-900 text-2xl font-bold">Berufliche Schwerpunkte</h3>
        </div>
        <p class="text-surface-700 mb-6">
          Als professioneller Lehrer bringt er nicht nur tiefes strategisches Verständnis mit, sondern
          auch die Fähigkeit, komplexe Inhalte verständlich und motivierend zu vermitteln.
        </p>
        <ul class="text-surface-700 list-inside list-disc space-y-3">
          <li>Bridgeunterricht für alle Spielstärken – Gruppen, Einzelcoaching, Onlineformate</li>
          <li>Turnierleitung nach DBV-Standards</li>
          <li>Coaching für ambitionierte Spieler und Teams</li>
          <li>Organisation von Bridge-Reisen und Seminaren weltweit</li>
          <li>Entwicklung von Lehrmaterialien und digitalen Lernangeboten</li>
          <li>Mentoring für Nachwuchsspieler und Juniorenteams</li>
        </ul>
      </div>
      <div class="order-1 lg:order-2">
        <img
          alt="Alexander unterrichtet Bridge"
          class="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          src="/alex/pic1.webp"
        />
      </div>
    </div>

    <!-- Alternating Content 2: Erfolge & Auszeichnungen -->
    <div class="mb-16 grid items-center gap-12 lg:grid-cols-2">
      <div>
        <img
          alt="Alexander bei einem Bridge Turnier"
          class="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
          src="/alex/pic2.webp"
        />
      </div>
      <div>
        <div class="mb-4 flex items-center gap-4">
          <IconBox icon="🏆" size="md" />
          <h3 class="text-surface-900 text-2xl font-bold">Erfolge & Auszeichnungen</h3>
        </div>
        <p class="text-surface-700 mb-6">
          Im Alter von 17 Jahren wurde er erstmals in die deutsche Juniorennationalmannschaft berufen.
          Seit 1998 ist Alexander hauptberuflich als Bridgelehrer tätig und hat seither Hunderte von
          Schülern unterrichtet.
        </p>
        <ul class="text-surface-700 list-inside list-disc space-y-3">
          <li>Mehrfacher Deutscher Meister</li>
          <li>Langjähriges Mitglied der deutschen Nationalmannschaft</li>
          <li>Erfolgreicher Coach bei internationalen Wettbewerben</li>
          <li>Veranstalter renommierter Bridge-Events und -Reisen</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="scroll-mt-24">
    <div class="text-center">
      <div class="card rounded-xl bg-white p-8 shadow-md md:p-10">
        <div class="mb-4 flex justify-center">
          <IconBox icon="📧" size="lg" />
        </div>
        <h2 class="text-surface-900 mb-4 text-3xl font-black">Lassen Sie uns vernetzen!</h2>
        <p class="text-surface-600 mx-auto mb-8 max-w-2xl text-lg">
          Bereit, Ihre Bridge-Reise zu beginnen oder haben Sie Fragen zu meinen Kursen? Kontaktieren
          Sie mich gerne per E-Mail oder WhatsApp. Ich freue mich darauf, von Ihnen zu hören.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            href="mailto:bridge.mit.alexander@gmx.de"
            text="E-Mail senden"
            variant="secondary"
          />
          <Button
            href="https://wa.me/+4901794880345"
            text="WhatsApp schreiben"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  </section>
</div>