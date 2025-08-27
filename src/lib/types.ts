// src/lib/types.ts
/** A generic representation of a file stored in Firebase Storage. */
export type FirebaseFile = {
  downloadURL: string;
  lastModifiedTS: number;
  name: string;
  ref: string;
  type: string;
};

/** Represents a holiday (travel package). */
export type Holiday = {
  id: string;
  name:string;
  shortDescription: string;
  longDescription: string;
  price: number;
  startDate: string;
  image?: FirebaseFile[];
  files?: FirebaseFile[];
};

/** Represents a document from the 'files' collection, containing multiple downloadable files. */
export type FileDocument = {
  id: string;
  filename: string;
  files: FirebaseFile[];
};