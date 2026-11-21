import type { Metadata } from "next";
import Contact from "@/src/components/Contact";

export const metadata: Metadata = {
  title: "Заявка на проект — Motion Community",
  description: "Расскажите о проекте — предложим команду и сроки.",
};

const Page = () => <Contact />;

export default Page;
