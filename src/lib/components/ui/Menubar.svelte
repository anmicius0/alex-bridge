<!--src/lib/components/Menubar.svelte-->
<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import { authStore } from '$lib/stores/user.js';
  import { afterNavigate } from '$app/navigation';
  import { browser } from '$app/environment';

  let expandedMenu = $state<string | null>(null);
  let mobileMenuOpen = $state(false);
  let pathname = $state(browser ? window.location.pathname : '');

  afterNavigate(({ to }) => {
    if (to) pathname = to.url.pathname;
    mobileMenuOpen = false; // Close mobile menu on navigation
  });

  type NavLink = { href: string; text: string };
  type DropdownMenu = { title: string; links: NavLink[] };

  const navLinks: NavLink[] = [
    { href: '/holidays', text: 'Reisen' },
    { href: '/files', text: 'Dateien' },
    // { href: '/news', text: 'News' }
  ];

  const dropdownMenus: DropdownMenu[] = [
    {
      title: 'Kalender',
      links: [{ href: '/calendar/online', text: 'Online-Kurse' }],
    },
  ];

  function isActive(href: string): boolean {
    return pathname === href;
  }

  function getLinkClasses(href: string, isMobile = false): string {
    const baseDesktop =
      'hover:bg-surface-50/50 hover:text-primary-500 rounded-lg px-4 py-3 transition duration-200';
    const baseMobile =
      'text-surface-700 hover:bg-surface-50/50 hover:text-primary-500 rounded-lg p-4 transition duration-200';
    const activeClasses = 'bg-surface-50/50 text-primary-500 font-bold';

    const base = isMobile ? baseMobile : baseDesktop;

    return `${base} ${isActive(href) ? activeClasses : ''}`;
  }

  function toggleMenu(menuTitle: string | null): void {
    expandedMenu = expandedMenu === menuTitle ? null : menuTitle;
  }
</script>

<header
  class="border-surface-200/80 shadow-soft fixed inset-x-4 top-4 z-50 mx-auto max-w-6xl rounded-2xl border bg-white/90 font-sans text-base font-semibold backdrop-blur-sm transition duration-300"
  onmouseleave={() => toggleMenu(null)}
  role="presentation"
>
  <div class="mx-auto flex items-center justify-between px-6 py-4 md:px-12">
    <!-- Logo -->
    <a
      class="hover:bg-surface-50/50 flex items-center gap-4 rounded-2xl p-2 transition duration-200"
      href="/"
    >
      <img src="/logo.webp" alt="Bridge mit Alexander Logo" class="h-14 w-auto" />
      <span class="text-surface-900 font-serif text-2xl font-bold md:text-3xl"
        >Bridge mit Alexander</span
      >
    </a>

    <!-- Desktop navbar -->
    <div class="text-surface-700 hidden items-center gap-3 lg:flex">
      <nav class="flex items-center gap-2">
        {#each navLinks as link (link.href)}
          <a href={link.href} class={getLinkClasses(link.href)}>
            {link.text}
          </a>
        {/each}
        {#each dropdownMenus as menu (menu.title)}
          <div class="relative">
            <button
              onclick={() => toggleMenu(menu.title)}
              class="hover:bg-surface-50/50 hover:text-primary-500 flex items-center gap-2 rounded-lg px-4 py-3 transition duration-200 {expandedMenu ===
              menu.title
                ? 'border-primary-200/50 border'
                : ''}"
            >
              {menu.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition duration-300 {expandedMenu === menu.title
                  ? 'rotate-180'
                  : ''}"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            {#if expandedMenu === menu.title}
              <div
                class="border-surface-200/80 shadow-soft absolute right-0 mt-2 w-48 rounded-2xl border bg-white/90 py-2 backdrop-blur-sm"
              >
                {#each menu.links as link (link.href)}
                  <a
                    href={link.href}
                    class="text-surface-700 hover:bg-surface-50/50 hover:text-primary-500 block px-4 py-2 transition duration-200 {isActive(
                      link.href,
                    )
                      ? 'bg-surface-50/50 text-primary-500 border-primary-500 border-l-4 font-bold'
                      : ''}"
                  >
                    {link.text}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </nav>

      <div class="flex items-center">
        {#if $authStore.user}
          <Button href="/user/dashboard" variant="primary" text="Dashboard" />
        {:else}
          <Button href="/user" variant="primary" text="Anmelden" />
        {/if}
      </div>
    </div>

    <!-- Mobile Menu Toggle -->
    <div class="lg:hidden">
      <button
        aria-label="Mobiles Menü umschalten"
        class="p-3"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      >
        <svg
          class="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <nav class="border-surface-200/80 flex flex-col gap-4 border-t px-4 pt-4 pb-6 lg:hidden">
      {#each navLinks as link (link.href)}
        <a href={link.href} class={getLinkClasses(link.href, true)}>
          {link.text}
        </a>
      {/each}

      {#each dropdownMenus as menu (menu.title)}
        <div class="flex flex-col">
          <p class="p-4 font-semibold">{menu.title}</p>
          {#each menu.links as link (link.href)}
            <a
              href={link.href}
              class="text-surface-700 hover:bg-surface-50/50 hover:text-primary-500 ml-3 rounded-md p-4 font-normal transition duration-200 {isActive(
                link.href,
              )
                ? 'bg-surface-50/50 text-primary-500 border-primary-500 border-l-4 font-bold'
                : ''}"
            >
              {link.text}
            </a>
          {/each}
        </div>
      {/each}

      <div class="mt-2">
        {#if $authStore.user}
          <Button href="/user/dashboard" variant="primary" text="Dashboard" />
        {:else}
          <Button href="/user" variant="primary" text="Anmelden" />
        {/if}
      </div>
    </nav>
  {/if}
</header>