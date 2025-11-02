import { getCollection, type CollectionEntry } from 'astro:content';

export async function getAllHolidays(): Promise<CollectionEntry<'holiday'>[]> {
  return await getCollection('holiday');
}

export async function getSortedHolidays(): Promise<
  CollectionEntry<'holiday'>[]
> {
  const holidays = await getAllHolidays();
  return holidays.sort(
    (a, b) =>
      new Date(a.data.startDate).getTime() -
      new Date(b.data.startDate).getTime()
  );
}

export async function getUpcomingHolidays(): Promise<
  CollectionEntry<'holiday'>[]
> {
  const holidays = await getAllHolidays();
  const now = new Date().getTime();
  return holidays
    .filter((h) => new Date(h.data.startDate).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.data.startDate).getTime() -
        new Date(b.data.startDate).getTime()
    );
}

export async function getPastHolidays(): Promise<CollectionEntry<'holiday'>[]> {
  const holidays = await getAllHolidays();
  const now = new Date().getTime();
  return holidays
    .filter((h) => new Date(h.data.startDate).getTime() < now)
    .sort(
      (a, b) =>
        new Date(b.data.startDate).getTime() -
        new Date(a.data.startDate).getTime()
    );
}

export interface HolidayGroups {
  upcoming: CollectionEntry<'holiday'>[];
  past: CollectionEntry<'holiday'>[];
}

export async function getHolidayGroups(): Promise<HolidayGroups> {
  const upcoming = await getUpcomingHolidays();
  const past = await getPastHolidays();
  return { upcoming, past };
}
