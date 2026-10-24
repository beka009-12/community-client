import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProjectDetail from "@/src/components/projects-sections/ProjectDetail";
import { parseId } from "@/src/lib/route-id";
import { withPeople } from "@/src/server/api/joins";
import { getMembers } from "@/src/server/api/members";
import { getProject, getProjects } from "@/src/server/api/projects";

// The header reads the pathname, which a shell for unknown params doesn't
// have: these pages may block on navigation instead of failing the build.
export const instant = false;

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

const Project = async ({ params }: Pick<PageProps<"/projects/[id]">, "params">) => {
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

const Page = ({ params }: PageProps<"/projects/[id]">) => (
  <Suspense fallback={null}>
    <Project params={params} />
  </Suspense>
);

export default Page;
