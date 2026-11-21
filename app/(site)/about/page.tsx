import type { Metadata } from "next";
import About from "@/src/components/About";

export const metadata: Metadata = {
  title: "О нас — Motion Community",
  description: "Проектная команда при IT-академии MotionWeb: как мы появились и что для нас важно.",
};

const Page = () => <About />;

export default Page;
