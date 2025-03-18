import type { Metadata } from "next";
import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";
export const metadata: Metadata = {
  title: "Speetly",
  description: "Speetly is a platform that allows you to create and manage your clients, projects, and tasks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4">
        {children}
      </main>
      <Footer />
    </>
  );
}