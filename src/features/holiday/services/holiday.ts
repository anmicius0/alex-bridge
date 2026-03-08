import { getCollection, type CollectionEntry } from 'astro:content';
import { ErrorHandler } from '@lib/error-handler';

interface HolidayGroups {
  upcoming: CollectionEntry<'holiday'>[];
  past: CollectionEntry<'holiday'>[];
}

/**
 * Retrieves all holiday entries sorted chronologically by start date.
 */
export async function getAllHolidays(): Promise<CollectionEntry<'holiday'>[]> {
  const result = await ErrorHandler.safeExecute(
    function () {
      return getCollection('holiday');
    },
    { context: 'holiday/getAll' }
  );

  if (!result.success || !result.data) {
    return [];
  }

  return result.data.sort(function (a, b) {
    return a.data.startDate.valueOf() - b.data.startDate.valueOf();
  });
}

/**
 * Categorizes holidays into upcoming and past groups relative to the current date.
 */
export async function getHolidayGroups(): Promise<HolidayGroups> {
  const allHolidays = await getAllHolidays();
  const now = new Date();

  const upcoming = allHolidays.filter(function (holiday) {
    return holiday.data.endDate >= now;
  });

  const past = allHolidays
    .filter(function (holiday) {
      return holiday.data.endDate < now;
    })
    .reverse();

  return { upcoming, past };
}
