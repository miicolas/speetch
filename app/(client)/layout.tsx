import ScrollSmooth from "@/components/ui/scroll-smooth";
import type { Metadata } from "next";
/* import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header"; */
export const metadata: Metadata = {
  title: "Speetly",
  description: "Speetly is a platform that allows you to create and manage your clients, projects, and tasks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollSmooth duration={2}>
      {/* <Header /> */}
      
      {children}
      {/* <Footer /> */}
    </ScrollSmooth>
  );
}