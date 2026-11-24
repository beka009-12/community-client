import { z } from "zod";
import { isPosition, MEMBERSHIP_ROLES, PROJECT_STATUSES, USER_ROLES } from "@/src/lib/api-enums";
import { mediaUrl } from "@/src/lib/media";

// Shapes of the public endpoints (Swagger: API_URL + /api/docs/). Objects
// are non-strict, so new backend fields never break a page.

const text = z.string().nullish().transform((value) => value ?? "");
const url = z.string().nullish().transform((value) => value || null);
// Uploaded files go through our /media rewrite, never straight to the API host.
const media = z.string().nullish().transform((value) => mediaUrl(value));
// The main direction first. Fresh accounts have none yet; a value the
// frontend doesn't know is skipped, not the whole member.
const positions = z
  .array(z.unknown())
  .nullish()
  .catch(null)
  .transform((values) => (values ?? []).filter(isPosition));

// A row that doesn't match (say, an enum value the frontend doesn't know yet)
// is logged and dropped, so one odd row never takes a whole page down.
export const listOf = <T extends z.ZodType>(item: T) =>
  z.array(z.unknown()).transform((rows) =>
    rows.flatMap((row): z.output<T>[] => {
      const parsed = item.safeParse(row);
      if (parsed.success) return [parsed.data];
      console.error("Dropped an API row that doesn't match the schema", parsed.error.issues);
      return [];
    }),
  );

// A row of members/, and the `user` inside project memberships.
export const memberListItemSchema = z.object({
  id: z.number(),
  first_name: text,
  last_name: text,
  positions,
  avatar: media,
  // Requested from the backend (docs/backend-requests in community-service,
  // 2026-11-24); until members/ sends it everyone reads as a member.
  role: z.enum(USER_ROLES).catch("Member"),
});

const teamShortSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: media,
});

export const projectListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(PROJECT_STATUSES),
  category: text,
  image: media,
  team: teamShortSchema.nullable().catch(null),
});

const membershipSchema = z.object({
  user: memberListItemSchema,
  role: z.enum(MEMBERSHIP_ROLES),
});

export const projectDetailSchema = projectListItemSchema.extend({
  description: text,
  demo_url: url,
  github_url: url,
  created_at: z.string(),
  members: listOf(membershipSchema),
});

// A project on a member's public profile, with their role in it.
const memberProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(PROJECT_STATUSES),
  image: media,
  role: z.enum(MEMBERSHIP_ROLES),
});

export const memberDetailSchema = memberListItemSchema.extend({
  bio: text,
  skills: text,
  github: url,
  linkedin: url,
  portfolio: url,
  resume: media,
  projects: listOf(memberProjectSchema),
});

// stats/: companies_count counts accepted client requests only.
export const statsSchema = z.object({
  members_count: z.number(),
  teams_count: z.number(),
  projects_count: z.number(),
  companies_count: z.number(),
});

export type MemberListItem = z.infer<typeof memberListItemSchema>;
export type TeamShort = z.infer<typeof teamShortSchema>;
export type ProjectListItem = z.infer<typeof projectListItemSchema>;
export type Membership = z.infer<typeof membershipSchema>;
export type ProjectDetail = z.infer<typeof projectDetailSchema>;
export type MemberProject = z.infer<typeof memberProjectSchema>;
export type MemberDetail = z.infer<typeof memberDetailSchema>;
export type Stats = z.infer<typeof statsSchema>;
