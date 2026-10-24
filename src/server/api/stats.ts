import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { request } from "./http";
import { statsSchema, type Stats } from "./schemas";

export async function getStats(): Promise<Stats> {
  "use cache";
  cacheLife("minutes");
  cacheTag("stats");
  return request("/stats/", statsSchema);
}
