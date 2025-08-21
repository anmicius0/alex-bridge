<script lang="ts">
  import { auth, db } from '$lib/client/firebase.client';
  import { signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/user.js';
  import { doc, updateDoc } from 'firebase/firestore';
  import IconBox from '$lib/components/ui/IconBox.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let editMode = $state(false);
  let newEmail = $state('');
  let newName = $state('');
  let newPhone = $state('');
  let newAddress = $state(''); // Added address field

  const handleLogout = async () => {
    await signOut(auth);
    await goto('/user');
  };

  const handleUpdate = async () => {
    if ($authStore.user && $authStore.firebaseUser) {
      // Changed from 'users' to 'userMeta' and use uid as document ID
      const userRef = doc(db, 'userMeta', $authStore.firebaseUser.uid);
      await updateDoc(userRef, {
        email: newEmail,
        name: newName,
        phone: newPhone,
        address: newAddress, // Added address update
      });
      editMode = false;
    }
  };

  $effect(() => {
    if ($authStore.user) {
      newEmail = $authStore.user.email;
      newName = $authStore.user.name;
      newPhone = $authStore.user.phone;
      newAddress = $authStore.user.address || ''; // Added address initialization
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
        {#if editMode}
          <form onsubmit={handleUpdate} class="space-y-4">
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
              <Button type="submit" text="Änderungen speichern" />
              <Button text="Abbrechen" variant="secondary" onclick={() => (editMode = false)} />
            </div>
          </form>
        {:else}
          <div class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="card p-3">
                <div class="text-surface-600 mb-1.5 text-xs font-bold">E-Mail</div>
                <div class="text-base font-semibold">{$authStore.user.email}</div>
              </div>
              <div class="card p-3">
                <div class="text-surface-600 mb-1.5 text-xs font-bold">Name</div>
                <div class="text-base font-semibold">
                  {$authStore.user.name || 'Nicht angegeben'}
                </div>
              </div>
              <div class="card p-3">
                <div class="text-surface-600 mb-1.5 text-xs font-bold">Telefon</div>
                <div class="text-base font-semibold">
                  {$authStore.user.phone || 'Nicht angegeben'}
                </div>
              </div>
              <div class="card p-3">
                <div class="text-surface-600 mb-1.5 text-xs font-bold">
                  Adresse
                  <span class="text-surface-500 text-xs font-normal">(für Rechnungen)</span>
                </div>
                <div class="text-base font-semibold">
                  {$authStore.user.address || 'Nicht angegeben'}
                </div>
              </div>
            </div>
            <div class="flex justify-end pt-3">
              <Button text="Profil bearbeiten" onclick={() => (editMode = true)} />
            </div>
          </div>
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
