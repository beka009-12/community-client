// Home cards, mapped from the API next to each section
// (statCardsFromApi, projectFromApi, peopleFromApi).
import type { StaticImageData } from "next/image";

export interface StatCard {
  value: string;
  label: string;
}

export interface HomeProject {
  key: string;
  title: string;
  description?: string;
  image: StaticImageData | string | null;
  tags: string[];
  teamLabel?: string;
  // Null: a demo case without a page of its own.
  href: string | null;
}

export interface HomePerson {
  key: string;
  name: string;
  position: string;
  focus?: string;
  badge?: { label: string; strong?: boolean };
  photo: string | null;
  href: string | null;
}
