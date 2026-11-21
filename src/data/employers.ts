import type { StaticImageData } from "next/image";
import mbank from "@/src/assets/employers/mbank.png";
import aiylBank from "@/src/assets/employers/aiyl-bank.png";
import bankAsia from "@/src/assets/employers/bank-asia.png";
import kyrgyzaltyn from "@/src/assets/employers/kyrgyzaltyn.png";
import bishkekCityHall from "@/src/assets/employers/bishkek-city-hall.png";
import growave from "@/src/assets/employers/growave.webp";
import remotion from "@/src/assets/employers/remotion.svg";
import skynet from "@/src/assets/employers/skynet.png";
import timelySkills from "@/src/assets/employers/timelyskills.png";
import jogorkuKenesh from "@/src/assets/employers/jogorku-kenesh.png";

export interface Employer {
  name: string;
  logo: StaticImageData;
  // Rendered height in px: wordmarks sit lower than square emblems, so
  // every logo reads about the same size.
  height: number;
}

// Where the academy's graduates work, with the logos motion.kg shows in its
// «Биздин студенттер кайсыл жерде иштешет» block (taken 2026-11-21).
export const EMPLOYERS: Employer[] = [
  { name: "MBank", logo: mbank, height: 30 },
  { name: "Айыл Банк", logo: aiylBank, height: 26 },
  { name: "Банк Азии", logo: bankAsia, height: 34 },
  { name: "Кыргызалтын", logo: kyrgyzaltyn, height: 26 },
  { name: "Мэрия Бишкека", logo: bishkekCityHall, height: 52 },
  { name: "Growave", logo: growave, height: 28 },
  { name: "Remotion", logo: remotion, height: 32 },
  { name: "Skynet", logo: skynet, height: 32 },
  { name: "TimelySkills", logo: timelySkills, height: 30 },
  { name: "Жогорку Кенеш", logo: jogorkuKenesh, height: 50 },
];
