<script lang="ts">
  import { auth, db } from '$lib/client/firebase.client';
  import { signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/user.js';
  import {
    doc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    getDoc,
    type Timestamp,
  } from 'firebase/firestore';
  import IconBox from '$lib/components/ui/IconBox.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { COLLECTIONS } from '$lib/constants';
  import { enhance } from '$app/forms';
  import ImageCard from '$lib/components/ui/ImageCard.svelte';
  import type { Holiday } from '$lib/types';
  import { toastStore } from '$lib/stores/toasts';

  let newEmail = $state('');
  let newName = $state('');
  let newPhone = $state('');
  let newAddress = $state('');
  let updateLoading = $state(false);

  // --- New state for holiday registrations ---
  type RegisteredHoliday = Holiday & { registrationId: string };
  let registeredHolidays = $state<RegisteredHoliday[]>([]);
  let holidaysLoading = $state(true);
  let cancellationLoading = $state(''); // Holds the ID of the registration being cancelled
  let idToken = $state('');
  // ------------------------------------------

  const handleLogout = async () => {
    await signOut(auth);
    await goto('/user');
  };

  const handleUpdate = async () => {
    if ($authStore.user && $authStore.firebaseUser) {
      updateLoading = true;
      try {
        const userRef = doc(db, COLLECTIONS.USER_META, $authStore.firebaseUser.uid);
        await updateDoc(userRef, {
          email: newEmail,
          name: newName,
          phone: newPhone,
          address: newAddress,
        });
        toastStore.add('Profil erfolgreich aktualisiert', 'success');
      } catch (err) {
        console.error('Error updating profile:', err);
        toastStore.add('Fehler beim Aktualisieren des Profils', 'error');
      } finally {
        updateLoading = false;
      }
    }
  };

  // Get user ID token for form submissions
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

  // Fetch registered holidays when user is available
  $effect(() => {
    const fetchRegisteredHolidays = async () => {
      if (!$authStore.firebaseUser) {
        registeredHolidays = [];
        holidaysLoading = false;
        return;
      }

      holidaysLoading = true;
      try {
        // NOTE on Data Fetching Strategy:
        // This pattern fetches registration documents and then fetches each holiday
        // document individually (known as an N+1 query problem). For a small number of
        // user registrations, this is acceptable and simple to implement.
        // For future scaling, consider denormalizing essential holiday data (like name,
        // image, and startDate) directly into the registration document itself.
        // This would reduce N+1 reads to a single query, improving performance
        // and reducing Firestore costs at scale.
        const registrationsQuery = query(
          collection(db, COLLECTIONS.HOLIDAY_REGISTRATIONS),
          where('uid', '==', $authStore.firebaseUser.uid),
        );
        const registrationsSnapshot = await getDocs(registrationsQuery);

        if (registrationsSnapshot.empty) {
          registeredHolidays = [];
          holidaysLoading = false;
          return;
        }

        const holidaysPromises = registrationsSnapshot.docs.map(async (regDoc) => {
          const registration = regDoc.data();
          const holidayRef = doc(db, COLLECTIONS.HOLIDAYS, registration.holidayId);
          const holidaySnap = await getDoc(holidayRef);

          if (holidaySnap.exists()) {
            const holidayData = holidaySnap.data();
            const startDateTimestamp = holidayData.startDate as Timestamp;
            const startDate = startDateTimestamp?.toDate();
            const now = new Date();

            // Filter out past holidays on the client
            if (startDate && startDate < now) {
              return null;
            }

            return {
              ...(holidayData as Holiday),
              id: holidaySnap.id,
              startDate: startDate ? startDate.toISOString() : '', // Standardize to ISO string
              registrationId: regDoc.id, // Pass registration ID for the cancel action
            };
          }
          return null;
        });

        const resolvedHolidays = (await Promise.all(holidaysPromises)).filter(
          (h): h is RegisteredHoliday => h !== null,
        );
        registeredHolidays = resolvedHolidays;
      } catch (err) {
        console.error('Error fetching registered holidays:', err);
      } finally {
        holidaysLoading = false;
      }
    };

    fetchRegisteredHolidays();
  });

  $effect(() => {
    if ($authStore.user) {
      newEmail = $authStore.user.email;
      newName = $authStore.user.name;
      newPhone = $authStore.user.phone;
      newAddress = $authStore.user.address || '';
    }
  });
</script>

<div class="min-h-screen py-20">
  <div class="container mx-auto px-3">
    {#if $authStore.firebaseUser && $authStore.user}
      <header class="animate-slide-up mb-10 text-center">
        <div class="mb-4 flex justify-center">
          <IconBox icon="🏠" />
        </div>
        <h1>Dashboard</h1>
        <p class="text-surface-600 text-lg">
          Willkommen zurück, <span class="text-surface-900 font-bold"
            >{$authStore.user.name || 'Benutzer'}</span
          >
        </p>
      </header>

      <!-- Profile Information Card -->
      <div class="animate-slide-up card mb-8 p-8">
        <div class="mb-5 flex items-center gap-3">
          <h2>Profilinformationen</h2>
        </div>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          class="space-y-4"
        >
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label for="email" class="text-surface-700 mb-1.5 block text-xs font-bold">
                E-Mail
              </label>
              <input id="email" type="email" bind:value={newEmail} class="w-full" />
            </div>

            <div>
              <label for="name" class="text-surface-700 mb-1.5 block text-xs font-bold">
                Name
              </label>
              <input id="name" type="text" bind:value={newName} class="w-full" />
            </div>

            <div>
              <label for="phone" class="text-surface-700 mb-1.5 block text-xs font-bold">
                Telefon
              </label>
              <input id="phone" type="tel" bind:value={newPhone} class="w-full" />
            </div>

            <div>
              <label for="address" class="text-surface-700 mb-1.5 block text-xs font-bold">
                Adresse <span class="text-surface-500 text-xs font-normal">(für Rechnungen)</span>
              </label>
              <input
                id="address"
                type="text"
                bind:value={newAddress}
                class="w-full"
                placeholder="Musterstraße 12, 10115 Berlin, Deutschland"
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-3">
            <Button
              type="submit"
              text={updateLoading ? 'Wird gespeichert...' : 'Änderungen speichern'}
              disabled={updateLoading}
            />
          </div>
        </form>
      </div>

      <!-- NEW: Registered Holidays Section -->
      <div class="animate-slide-up card mb-8 p-8">
        <div class="mb-5 flex items-center gap-3">
          <h2>Meine angemeldeten Reisen</h2>
        </div>
        {#if holidaysLoading}
          <p>Lade deine Reisen...</p>
        {:else if registeredHolidays.length > 0}
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            {#each registeredHolidays as holiday (holiday.registrationId)}
              <ImageCard
                images={holiday.image?.map((img) => img.downloadURL) ?? []}
                title={holiday.name}
                description={holiday.shortDescription}
              >
                <form
                  method="POST"
                  action="?/cancelRegistration"
                  use:enhance={() => {
                    cancellationLoading = holiday.registrationId;
                    return async ({ update, result }) => {
                      await update();
                      cancellationLoading = '';

                      // Type guard: Check if the action was successful and has data.
                      if (result.type === 'success' && result.data) {
                        // Now check the custom `success` property from your server action.
                        if (result.data.success) {
                          // Optimistically update the UI.
                          registeredHolidays = registeredHolidays.filter(
                            (h) => h.registrationId !== holiday.registrationId,
                          );
                          toastStore.add(result.data.message as string, 'success');
                        } else {
                          // Handle cases where the action ran but returned a failure message.
                          toastStore.add(
                            (result.data.error as string) || 'Stornierung fehlgeschlagen',
                            'error',
                          );
                        }
                      } else if (result.type === 'failure') {
                        // Handle server-level failures (e.g., a 4xx or 5xx response).
                        toastStore.add('Stornierung fehlgeschlagen', 'error');
                      }
                    };
                  }}
                >
                  <input type="hidden" name="registrationId" value={holiday.registrationId} />
                  <input type="hidden" name="idToken" bind:value={idToken} />
                  <Button
                    variant="danger"
                    type="submit"
                    disabled={cancellationLoading === holiday.registrationId}
                    text={cancellationLoading === holiday.registrationId
                      ? 'Wird storniert...'
                      : 'Anmeldung stornieren'}
                  />
                </form>
              </ImageCard>
            {/each}
          </div>
        {:else}
          <p class="text-surface-600">
            Sie sind derzeit für keine Reisen angemeldet.
            <a href="/holidays" class="text-primary-600 hover:underline"
              >Entdecken Sie unsere Reiseangebote!</a
            >
          </p>
        {/if}
      </div>

      <Button text="Abmelden" variant="danger" onclick={handleLogout} />
    {:else}
      <div class="animate-slide-up card p-10 text-center">
        <div class="animate-wiggle mb-5 text-6xl">🔒</div>
        <h1>Zugriff verweigert</h1>
        <p class="text-surface-600 mb-6 text-base">
          Bitte melden Sie sich an, um auf Ihr Dashboard zuzugreifen.
        </p>
        <Button text="Zum Login" href="/user" />
      </div>
    {/if}
  </div>
</div>