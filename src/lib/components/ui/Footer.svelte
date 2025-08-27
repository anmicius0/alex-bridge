<!-- src/lib/components/ui/Footer.svelte -->
<footer class="border-surface-200 bg-surface-50 border-t">
  <div class="container mx-auto max-w-6xl px-4 py-8 text-center">
    <a href="/" class="mb-4 inline-block">
      <img src="/logo.webp" alt="Bridge mit Alexander Logo" class="mx-auto h-16 w-auto" />
    </a>
    <p class="text-surface-600">
      &copy; {new Date().getFullYear()} Bridge mit Alexander. Alle Rechte vorbehalten.
    </p>
    <div class="mt-4 flex justify-center gap-4">
      <a href="/holidays" class="text-surface-700 hover:text-primary-600 transition">Reisen</a>
      <a href="/calendar/online" class="text-surface-700 hover:text-primary-600 transition"
        >Online-Kurse</a
      >
    </div>
  </div>
</footer>