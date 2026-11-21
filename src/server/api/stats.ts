import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { request } from "./http";
import { statsSchema, type Stats } from "./schemas";

// Optional on the page: null when the API can't answer, so it never takes home down.
export async function getStats(): Promise<Stats | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("stats");
  try {
    return await request("/stats/", statsSchema);
  } catch (error) {
    console.error("GET stats/ failed", error);
    return null;
  }
}
