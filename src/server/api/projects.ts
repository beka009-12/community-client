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

// The list has no description or members, so those cost one (cached)
// request per project. They run in parallel.
export async function getProjectsWithMembers(): Promise<ProjectDetail[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("projects");
  const projects = await getProjects();
  const details = await Promise.all(projects.map((project) => getProject(project.id)));
  return details.filter((project): project is ProjectDetail => project !== null);
}
