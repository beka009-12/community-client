import type { Metadata } from "next";
import Team from "@/src/components/Team";

export const metadata: Metadata = {
  title: "Команда — Motion Community",
  description: "Разработчики, дизайнеры и тимлиды сообщества Motion.",
};

const Page = () => <Team />;

export default Page;
