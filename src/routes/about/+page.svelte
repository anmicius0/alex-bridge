<!-- src/routes/about/+page.svelte -->
<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import IconBox from '$lib/components/ui/IconBox.svelte';
</script>

<div class="container mx-auto px-4 py-12 md:py-16">
  <!-- Hero Greeting Section -->
  <section
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
  </section>

  <!-- Main Content Sections -->
  <section class="mb-16 grid gap-8 lg:grid-cols-2">
    <div class="card rounded-xl bg-white p-6 shadow-md md:p-8">
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
    <div class="card rounded-xl bg-white p-6 shadow-md md:p-8">
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
  </section>

  <!-- Image Gallery -->
  <section class="mb-16">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <img
        alt="Alexander unterrichtet Bridge"
        class="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
        src="/alex/pic1.webp"
      />
      <img
        alt="Alexander bei einem Bridge Turnier"
        class="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
        src="/alex/pic2.webp"
      />
      <img
        alt="Alexander hält einen Bridge Vortrag"
        class="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
        src="/alex/pic3.webp"
      />
    </div>
  </section>

  <!-- Contact Section -->
  <section class="text-center">
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
        <Button href="https://wa.me/+4901794880345" text="WhatsApp schreiben" variant="secondary" />
      </div>
    </div>
  </section>
</div>
