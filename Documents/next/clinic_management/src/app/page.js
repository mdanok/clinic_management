import Link from "next/link";
import { Header } from "@/components/Home/Header";
import { Hero } from "@/components/Home/Hero";
import { CTA } from "@/components/Home/CTA";
import { Features } from "@/components/Home/Features";
import { Team } from "@/components/Home/Team";
import { Contact } from "@/components/Home/Contact";
import { Footer } from "@/components/Home/Footer";
import { getNextAuthSession } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getNextAuthSession();
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      <Header session={session} />
      <Hero />
      <Features />
      <CTA />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
