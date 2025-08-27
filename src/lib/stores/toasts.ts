import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

const createToastStore = () => {
  const { subscribe, update } = writable<Toast[]>([]);

  function addToast(message: string, type: ToastType = 'info', duration = 3000) {
    const id = Date.now();
    const newToast: Toast = { id, message, type, duration };

    update((toasts) => [...toasts, newToast]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }

  function removeToast(id: number) {
    update((toasts) => toasts.filter((t) => t.id !== id));
  }

  return {
    subscribe,
    add: addToast,
    remove: removeToast,
  };
};

export const toastStore = createToastStore();