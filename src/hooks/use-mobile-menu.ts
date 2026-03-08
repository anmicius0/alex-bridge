const ANIMATION_TIMINGS = {
  DROPDOWN_MAX_HEIGHT: '1000px',
  DROPDOWN_DELAY: 300,
  LINK_CLOSE_DELAY: 100,
} as const;

let initialized = false;

let onDocumentClick: ((e: MouseEvent) => void) | null = null;
let onDocumentKeydown: ((e: KeyboardEvent) => void) | null = null;

function getMenuContent(): HTMLElement | null {
  return document.getElementById('menu-content') as HTMLElement | null;
}

function openMenu(): void {
  const menuContent = getMenuContent();
  if (!menuContent) return;
  menuContent.classList.remove('-translate-x-full');
  document.body.style.overflow = 'hidden';
}

function closeMenu(): void {
  const menuContent = getMenuContent();
  if (!menuContent) return;

  menuContent.classList.add('-translate-x-full');
  document.body.style.overflow = '';

  const dropdowns = menuContent.querySelectorAll('.mobile-dropdown-content');
  dropdowns.forEach((node) => {
    const el = node as HTMLElement;
    el.style.maxHeight = '0';

    const trigger = document.querySelector(
      `[data-dropdown-toggle="${el.id}"]`
    ) as HTMLElement | null;

    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      const icon = trigger.querySelector('.mobile-dropdown-icon');
      icon?.classList.remove('rotate-180');
    }
  });
}

function toggleMobileDropdown(trigger: HTMLElement): void {
  const dropdownId = trigger.getAttribute('data-dropdown-toggle');
  if (!dropdownId) return;

  const dropdown = document.getElementById(dropdownId) as HTMLElement | null;
  if (!dropdown) return;

  const icon = trigger.querySelector('.mobile-dropdown-icon');
  const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    trigger.setAttribute('aria-expanded', 'false');
    dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
    dropdown.getBoundingClientRect();
    dropdown.style.maxHeight = '0';
    icon?.classList.remove('rotate-180');
  } else {
    trigger.setAttribute('aria-expanded', 'true');
    dropdown.style.maxHeight = 'none';
    const h = dropdown.scrollHeight;
    dropdown.style.maxHeight = '0';
    dropdown.getBoundingClientRect();
    dropdown.style.maxHeight = h + 'px';
    icon?.classList.add('rotate-180');

    window.setTimeout(() => {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        dropdown.style.maxHeight = ANIMATION_TIMINGS.DROPDOWN_MAX_HEIGHT;
      }
    }, ANIMATION_TIMINGS.DROPDOWN_DELAY);
  }
}

function handleDocumentClick(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const openBtn = target.closest('#menu-open');
  if (openBtn) {
    e.preventDefault();
    openMenu();
    return;
  }

  const closeBtn = target.closest('#menu-close');
  if (closeBtn) {
    e.preventDefault();
    closeMenu();
    return;
  }

  const menuContent = getMenuContent();
  if (!menuContent) return;

  const dropdownTrigger = target.closest('[data-dropdown-toggle]');
  if (dropdownTrigger && menuContent.contains(dropdownTrigger)) {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileDropdown(dropdownTrigger as HTMLElement);
    return;
  }

  const anchor = target.closest('a');
  if (anchor && menuContent.contains(anchor)) {
    window.setTimeout(closeMenu, ANIMATION_TIMINGS.LINK_CLOSE_DELAY);
  }
}

function handleDocumentKeydown(e: KeyboardEvent): void {
  if (e.key !== 'Escape') return;
  const menuContent = getMenuContent();
  if (!menuContent) return;
  const isOpen = !menuContent.classList.contains('-translate-x-full');
  if (isOpen) {
    e.preventDefault();
    closeMenu();
  }
}

export function initMobileMenu(): void {
  if (initialized) return;
  initialized = true;

  onDocumentClick = handleDocumentClick;
  document.addEventListener('click', onDocumentClick, { passive: false });

  onDocumentKeydown = handleDocumentKeydown;
  document.addEventListener('keydown', onDocumentKeydown);

  const menuContent = getMenuContent();
  if (menuContent) {
    menuContent.classList.add('-translate-x-full');
  }
}

function cleanupMobileMenu(): void {
  if (!initialized) return;

  if (onDocumentClick) {
    document.removeEventListener('click', onDocumentClick as EventListener);
    onDocumentClick = null;
  }

  if (onDocumentKeydown) {
    document.removeEventListener('keydown', onDocumentKeydown as EventListener);
    onDocumentKeydown = null;
  }

  initialized = false;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initMobileMenu(), {
      once: true,
    });
  } else {
    initMobileMenu();
  }

  document.addEventListener('astro:before-preparation', () => {
    cleanupMobileMenu();
  });
  document.addEventListener('astro:after-swap', () => {
    initMobileMenu();
  });
  document.addEventListener('astro:page-load', () => {
    initMobileMenu();
  });
}
