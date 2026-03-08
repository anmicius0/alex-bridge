import { getSortedCollection } from '@lib/content';

export async function getAllFiles() {
  return getSortedCollection('file');
}

export async function getSortedFiles() {
  return getSortedCollection('file');
}