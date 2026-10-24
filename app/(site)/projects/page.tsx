import type { Metadata } from "next";
import Projects from "@/src/components/Projects";
import { getProjects } from "@/src/server/api/projects";

export const metadata: Metadata = {
  title: "Проекты — Motion Community",
  description:
    "Проекты сообщества Motion: что мы делаем и что уже в работе.",
};

const Page = async () => <Projects projects={await getProjects()} />;

export default Page;
