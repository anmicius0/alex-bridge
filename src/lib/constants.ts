/**
 * @file Centralized constants for the application.
 * Using a single file for constants helps avoid magic strings and ensures consistency.
 */

/**
 * Firestore collection names.
 * Using these constants prevents typos when querying the database.
 */
export const COLLECTIONS = {
  USER_META: 'userMeta',
  HOLIDAYS: 'holiday',
  FILES: 'files',
  HOLIDAY_REGISTRATIONS: 'holidayRegistration',
};

/**
 * Other application-wide constants can be added here in the future.
 * For example:
 *
 * export const LOCAL_STORAGE_KEYS = {
 *   THEME: 'app-theme',
 * };
 */