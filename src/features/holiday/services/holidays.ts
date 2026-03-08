import { getCollection, type CollectionEntry } from 'astro:content';

export async function getAllHolidays(): Promise<CollectionEntry<'holiday'>[]> {
  return await getCollection('holiday');
}

interface HolidayGroups {
  upcoming: CollectionEntry<'holiday'>[];
  past: CollectionEntry<'holiday'>[];
}

export async function getHolidayGroups(): Promise<HolidayGroups> {
  const holidays = await getAllHolidays();
  const now = new Date().getTime();

  const upcoming = holidays
    .filter((h) => new Date(h.data.startDate).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.data.startDate).getTime() -
        new Date(b.data.startDate).getTime()
    );

  const past = holidays
    .filter((h) => new Date(h.data.startDate).getTime() < now)
    .sort(
      (a, b) =>
        new Date(b.data.startDate).getTime() -
        new Date(a.data.startDate).getTime()
    );

  return { upcoming, past };
}
