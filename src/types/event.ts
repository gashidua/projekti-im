export const eventCategories = [
  "Muzikë",
  "Teatër",
  "Ceremoni",
  "Lojëra",
  "Sport",
] as const;

export type EventCategory = (typeof eventCategories)[number];

export type Event = {
  id: number;
  titulli: string;
  data: string;
  ora: string;
  vendi: string;
  kategoria: EventCategory;
  pershkrimi: string;
};
