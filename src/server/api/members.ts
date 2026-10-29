import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { nullIfNotFound } from "./errors";
import { getAll, request } from "./http";
import {
  memberDetailSchema,
  memberListItemSchema,
  type MemberDetail,
  type MemberListItem,
} from "./schemas";

// The API lists only filled-in profiles: this is the public roster.
export async function getMembers(): Promise<MemberListItem[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("members");
  return getAll("/members/", memberListItemSchema);
}

export async function getMember(id: number): Promise<MemberDetail | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("members");
  return nullIfNotFound(request(`/members/${id}/`, memberDetailSchema));
}
