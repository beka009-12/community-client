import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { nullIfNotFound } from "./errors";
import { getAll, request } from "./http";
import {
  projectDetailSchema,
  projectListItemSchema,
  type ProjectDetail,
  type ProjectListItem,
} from "./schemas";

export async function getProjects(): Promise<ProjectListItem[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("projects");
  return getAll("/projects/", projectListItemSchema);
}

export async function getProject(id: number): Promise<ProjectDetail | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("projects");
  return nullIfNotFound(request(`/projects/${id}/`, projectDetailSchema));
}
