<script lang="ts">
  import { auth, db } from '$lib/client/firebase.client';
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { doc, setDoc } from 'firebase/firestore';
  import IconBox from '$lib/components/ui/IconBox.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import type { FirebaseError } from 'firebase/app';
  import { COLLECTIONS } from '$lib/constants';

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let errorMsg = $state('');

  // UI state: whether the form is in sign-up mode (show extra fields)
  let isSignup = $state(false);

  // Soft, positive guidance for first-time users
  let signupHint = $state('');

  // Extra fields (only required in sign-up mode)
  let name = $state('');
  let phone = $state('');
  let address = $state('');

  const resetErrors = () => {
    errorMsg = '';
  };

  const clearSignupHint = () => {
    signupHint = '';
  };

  const validateSignupFields = () => {
    if (!name.trim()) return 'Bitte geben Sie Ihren Namen ein.';
    if (!phone.trim()) return 'Bitte geben Sie Ihre Telefonnummer ein.';
    if (!address.trim()) return 'Bitte geben Sie Ihre Adresse ein.';
    return '';
  };

  // Login
  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    await goto('/user/dashboard');
  };

  // Register
  const register = async () => {
    const validationMsg = validateSignupFields();
    if (validationMsg) {
      throw new Error(validationMsg);
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      await setDoc(doc(db, COLLECTIONS.USER_META, user.uid), {
        uid: user.uid,
        email: user.email,
        phone,
        name,
        address,
        createdAt: new Date().toISOString(),
      });
    }

    await goto('/user/dashboard');
  };

  const handleLoginOrRegister = async () => {
    loading = true;
    resetErrors();
    clearSignupHint();

    try {
      // If already in sign-up mode, proceed to register directly
      if (isSignup) {
        await register();
        return;
      }

      // Try to log in first
      await login();
    } catch (error) {
      const firebaseError = error as FirebaseError;

      // For unknown user/invalid credential, switch to sign-up mode
      // and show a friendly hint instead of an error.
      if (
        firebaseError.code === 'auth/invalid-credential' ||
        firebaseError.code === 'auth/user-not-found'
      ) {
        isSignup = true;
        signupHint =
          'Sieht so aus, als wäre dies Ihre erste Anmeldung. Bitte fügen Sie Ihren Namen, Ihre Telefonnummer und Ihre Rechnungsadresse hinzu, um Ihr Konto zu erstellen.';
      } else if (firebaseError.code === 'auth/email-already-in-use') {
        errorMsg =
          'Diese E-Mail-Adresse wird bereits verwendet. Versuchen Sie stattdessen, sich anzumelden.';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMsg = 'Das Passwort ist zu schwach. Bitte verwenden Sie ein stärkeres Passwort.';
      } else if (firebaseError.message) {
        errorMsg = firebaseError.message;
      } else {
        errorMsg = 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
      }
    } finally {
      loading = false;
    }
  };
</script>

<div class="flex min-h-screen items-center justify-center py-12">
  <div class="w-full max-w-2xl">
    <div class="card p-8 md:p-10">
      <div class="mb-8 text-center">
        <div class="mb-6 flex justify-center">
          <IconBox icon="🔐" />
        </div>
        <h1>Willkommen</h1>
      </div>

      <form
        class="flex flex-col items-center justify-center space-y-6"
        onsubmit={(e) => {
          e.preventDefault();
          handleLoginOrRegister();
        }}
      >
        <div class="w-full">
          <label class="text-surface-700 mb-2 block text-sm font-semibold" for="email"
            >E-Mail-Adresse</label
          >
          <input
            bind:value={email}
            class="border-surface-300 focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2"
            id="email"
            placeholder="du@beispiel.de"
            required
            type="email"
          />
        </div>

        <div class="w-full">
          <label class="text-surface-700 mb-2 block text-sm font-semibold" for="password"
            >Passwort</label
          >
          <input
            bind:value={password}
            class="border-surface-300 focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2"
            id="password"
            placeholder="Geben Sie Ihr Passwort ein"
            required
            type="password"
          />
        </div>

        {#if isSignup}
          {#if signupHint}
            <div class="card border-surface-200 bg-surface-50 w-full border p-4">
              <p class="text-surface-700 text-sm">{signupHint}</p>
            </div>
          {/if}

          <div class="w-full">
            <label class="text-surface-700 mb-2 block text-sm font-semibold" for="name"
              >Vollständiger Name</label
            >
            <input
              bind:value={name}
              class="border-surface-300 focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2"
              id="name"
              placeholder="Max Mustermann"
              type="text"
              required
            />
          </div>

          <div class="w-full">
            <label class="text-surface-700 mb-2 block text-sm font-semibold" for="phone"
              >Telefonnummer</label
            >
            <input
              bind:value={phone}
              class="border-surface-300 focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2"
              id="phone"
              placeholder="+49 30 1234567"
              type="tel"
              required
            />
          </div>

          <div class="w-full">
            <label class="text-surface-700 mb-2 block text-sm font-semibold" for="address">
              Adresse
              <span class="text-surface-500 ml-2 text-xs font-normal"
                >(wird für die Rechnungstellung verwendet)</span
              >
            </label>
            <input
              bind:value={address}
              class="border-surface-300 focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2"
              id="address"
              placeholder="Musterstraße 123, Musterstadt, Deutschland"
              type="text"
              required
              aria-describedby="address-help"
            />
          </div>
        {/if}

        {#if errorMsg}
          <div class="card border border-red-200 bg-red-50 p-4">
            <p class="text-warning-700 text-center text-sm font-semibold">{errorMsg}</p>
          </div>
        {/if}

        <Button
          disabled={loading}
          text={loading
            ? 'Wird verarbeitet...'
            : isSignup
              ? 'Konto erstellen'
              : 'Anmelden / Registrieren'}
          type="submit"
        />
      </form>
    </div>
  </div>
</div>