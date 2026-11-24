import type { Metadata } from "next";
import Team from "@/src/components/Team";

export const metadata: Metadata = {
  title: "Участники — Motion Community",
  description: "Разработчики, дизайнеры и тимлиды Motion Community.",
};

const Page = () => <Team />;

export default Page;
