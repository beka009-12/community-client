import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/src/components/projects-sections/ProjectDetail";
import { parseId } from "@/src/lib/route-id";
import { withPeople } from "@/src/server/api/joins";
import { getMembers } from "@/src/server/api/members";
import { getProject, getProjects } from "@/src/server/api/projects";

// The header reads the pathname, which a shell for unknown params doesn't
// have, and an unknown id must answer 404 before anything streams: these
// pages block on navigation instead.
export const instant = false;
// Without it, Partial Prefetching streams the shell for an id the build
// didn't see, and notFound() can only answer 200 + noindex.
export const ensureStatic = "navigation";

// The route needs at least one id; an empty catalogue prerenders the 404.
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const projects = await getProjects();
  return projects.length > 0 ? projects.map((project) => ({ id: String(project.id) })) : [{ id: "0" }];
}

const load = async (rawId: string) => {
  const id = parseId(rawId);
  return id === null ? null : getProject(id);
};

export async function generateMetadata({
  params,
}: PageProps<"/projects/[id]">): Promise<Metadata> {
  const project = await load((await params).id);
  if (!project) return {};
  return {
    title: `${project.name} — Motion Community`,
    description: project.description || undefined,
  };
}

const Page = async ({ params }: PageProps<"/projects/[id]">) => {
  const project = await load((await params).id);
  if (!project) notFound();

  const [projects, roster] = await Promise.all([getProjects(), getMembers()]);
  const index = projects.findIndex((item) => item.id === project.id);
  const count = projects.length;
  // Wraps around; a single project, or one the cached list doesn't have
  // yet, gets no pager.
  const adjacent =
    index === -1 || count < 2
      ? null
      : { prev: projects[(index - 1 + count) % count], next: projects[(index + 1) % count] };

  return (
    <ProjectDetail project={project} team={withPeople(project.members, roster)} adjacent={adjacent} />
  );
};

export default Page;
