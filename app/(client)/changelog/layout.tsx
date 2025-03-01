import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog from my journey",
  description: "Changelog from my journey",
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4">{children}</div>;
}
