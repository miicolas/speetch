import ScrollSmooth from "@/components/ui/scroll-smooth";
import type { Metadata } from "next";
import Footer from "@/components/blocks/footer";

export const metadata: Metadata = {
  title: "Speetch",
  description: "Speetch is a platform that allows you to create and manage your clients, projects, and tasks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollSmooth duration={2}>
      {children}
      <Footer />
    </ScrollSmooth>
  );
}