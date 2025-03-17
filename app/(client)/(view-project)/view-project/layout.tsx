import { Metadata } from "next";

export const metadata: Metadata = {
    title: "View Project | Speetly",
    description: "View your project with Speetly",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "View Project | Speetly",
        description: "View your project with Speetly",
        url: "https://speetly.com/view-project",
        type: "website",
        images: [
            {
                url: "https://speetly.com/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Speetly View Project",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "View Project | Speetly",
        description: "View your project with Speetly",
        images: ["https://speetly.com/images/og-image.png"],
    },
    alternates: {
        canonical: "https://speetly.com/view-project",
    },
};

export default function ViewProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="max-w-7xl mx-auto">{children}</div>;
}
