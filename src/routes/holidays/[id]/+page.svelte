<!-- src/routes/holidays/[id]/+page.svelte -->
<script lang="ts">
  import Markdown from '$lib/components/ui/Markdown.svelte';
  import type { PageData, ActionData } from './$types';
  import { fade } from 'svelte/transition';
  import type { Holiday } from '$lib/types'; // Import from centralized types
  import DownloadLink from '$lib/components/ui/DownloadLink.svelte';
  import Carousel from '$lib/components/ui/Carousel.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import IconBox from '$lib/components/ui/IconBox.svelte';
  import { authStore } from '$lib/stores/user';
  import { auth, db } from '$lib/client/firebase.client';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { enhance } from '$app/forms';
  import { COLLECTIONS } from '$lib/constants';
  import { toastStore } from '$lib/stores/toasts';

  let { data, form } = $props<{ data: PageData; form?: ActionData }>();

  let holiday = $derived(data.holiday as Holiday);

  // Carousel state
  let currentImageIndex = $state(0);
  let images = $derived(holiday.image || []);

  // Registration state
  let idToken = $state('');
  let isRegistered = $state<boolean | null>(null); // null = loading
  let registrationLoading = $state(false);
  let cancellationLoading = $state(false);

  // Show toast notifications based on form action results
  $effect(() => {
    if (form?.success && form.message) {
      toastStore.add(form.message, 'success');
      form = undefined; // Clear form state to prevent re-showing toast on navigation
    }
    if (form?.error) {
      toastStore.add(form.error, 'error');
      form = undefined; // Clear form state
    }
  });

  // Re-check registration status whenever the user or form outcome changes
  $effect(() => {
    const checkRegistration = async () => {
      if ($authStore.firebaseUser) {
        isRegistered = null; // Set to loading state
        const q = query(
          collection(db, COLLECTIONS.HOLIDAY_REGISTRATIONS),
          where('uid', '==', $authStore.firebaseUser.uid),
          where('holidayId', '==', holiday.id),
        );
        const querySnapshot = await getDocs(q);
        isRegistered = !querySnapshot.empty;
      } else {
        isRegistered = false; // Not logged in, so not registered
      }
    };
    checkRegistration();
  });

  // Get user ID token for form submission
  $effect(() => {
    const unsub = auth.onIdTokenChanged(async (user) => {
      if (user) {
        idToken = await user.getIdToken();
      } else {
        idToken = '';
      }
    });
    return () => unsub();
  });
</script>

<section class="mx-auto max-w-6xl p-6" transition:fade={{ duration: 300 }}>
  <!-- Page Header -->
  <div class="mb-8">
    <a
      href="/holidays"
      class="text-primary-700 mb-4 inline-flex items-center font-semibold hover:underline"
    >
      ← Zurück zu den Reisen
    </a>
    <h1 class="text-4xl font-bold lg:text-5xl">{holiday.name}</h1>
  </div>

  <!-- Layout Grid -->
  <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
    <!-- Left Column: Main Content -->
    <div class="lg:col-span-2">
      <div class="space-y-8">
        {#if images.length > 0}
          <div class="card relative overflow-hidden rounded-2xl shadow-lg">
            <Carousel
              images={images.map((img) => ({ src: img.downloadURL, alt: img.name }))}
              autoplayDelay={5000}
            />
          </div>
        {/if}

        <div class="card space-y-4 rounded-2xl bg-white p-6 shadow-md md:p-8">
          <Markdown content={holiday.longDescription} />
        </div>

        <!-- File Downloads Section -->
        {#if holiday.files && holiday.files.length > 0}
          <div class="card space-y-4 rounded-2xl bg-white p-6 shadow-md md:p-8">
            <h3 class="text-surface-800 text-2xl font-bold">Reiseunterlagen</h3>
            <div class="flex flex-wrap gap-3">
              {#each holiday.files as file (file.downloadURL)}
                <DownloadLink href={file.downloadURL} name={file.name} />
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Right Column: Price & Registration -->
    <div class="lg:col-span-1">
      <div class="lg:sticky lg:top-32">
        <div class="card space-y-6 rounded-2xl p-6 shadow-md md:p-8">
          <!-- Price -->
          <div>
            <p class="text-surface-600 mb-1 text-sm font-semibold">Preis pro Person</p>
            <p class="text-4xl font-bold text-primary-600">€{holiday.price}</p>
          </div>

          <hr class="border-surface-200" />

          <!-- Registration -->
          <div class="space-y-4">
            <h3 class="text-surface-800 text-2xl font-bold">Anmeldung</h3>
            {#if $authStore.firebaseUser}
              {#if isRegistered === null}
                <div class="bg-surface-100 flex h-24 items-center justify-center rounded-lg">
                  <div
                    class="border-primary-500 h-6 w-6 animate-spin rounded-full border-t-2 border-solid"
                  ></div>
                </div>
              {:else if isRegistered}
                <!-- ALREADY REGISTERED (Minimalist View) -->
                <div
                  class="border-primary-200 bg-primary-50 space-y-4 rounded-lg border p-6 text-center"
                >
                  <IconBox icon="✅" size="md" class="mx-auto" />
                  <h4 class="text-primary-800 font-semibold">Sie sind angemeldet!</h4>
                  <form
                    method="POST"
                    action="?/cancel"
                    class="w-full"
                    use:enhance={() => {
                      cancellationLoading = true;
                      return async ({ update }) => {
                        await update();
                        cancellationLoading = false;
                      };
                    }}
                  >
                    <input type="hidden" name="idToken" bind:value={idToken} />
                    <Button
                      variant="danger"
                      text={cancellationLoading ? 'Wird storniert...' : 'Anmeldung stornieren'}
                      disabled={!idToken || cancellationLoading}
                      type="submit"
                    />
                  </form>
                </div>
              {:else}
                <!-- NOT REGISTERED -->
                <p class="text-surface-600 text-sm">
                  Sichern Sie sich jetzt Ihren Platz für dieses unvergessliche Bridge-Erlebnis.
                </p>
                <form
                  method="POST"
                  action="?/register"
                  use:enhance={() => {
                    registrationLoading = true;
                    return async ({ update }) => {
                      await update();
                      registrationLoading = false;
                    };
                  }}
                >
                  <input type="hidden" name="idToken" bind:value={idToken} />
                  <input type="hidden" name="holidayName" value={holiday.name} />
                  <Button
                    text={registrationLoading ? 'Wird bearbeitet...' : 'Jetzt anmelden'}
                    disabled={!idToken || registrationLoading}
                    type="submit"
                  />
                </form>
              {/if}
            {:else}
              <!-- LOGGED OUT -->
              <p class="text-surface-600 text-sm">
                Sie müssen
                <a href="/user" class="text-primary-600 font-semibold hover:underline"
                  >angemeldet sein</a
                >, um sich für eine Reise anzumelden.
              </p>
            {/if}

            <!-- Form error feedback -->
            {#if form?.error}
              <div
                class="bg-warning-50 text-warning-800 rounded-lg p-3 text-center text-sm font-medium"
              >
                {form.error}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>