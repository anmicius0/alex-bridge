import { getCollection } from 'astro:content';

export async function getAllHolidays() {
  const holidays = await getCollection('holiday');
  return holidays.sort((a, b) => a.data.startDate.valueOf() - b.data.startDate.valueOf());
}

export async function getHolidayGroups() {
  const allHolidays = await getAllHolidays();
  const now = new Date();

  return {
    upcoming: allHolidays.filter((h) => h.data.endDate >= now),
    past: allHolidays.filter((h) => h.data.endDate < now).reverse(),
  };
}