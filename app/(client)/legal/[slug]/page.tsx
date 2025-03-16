import { LegalContent } from "@/components/legal/legal-content";
import { getLegalPageBySlug } from "@/lib/legal";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { formatDate } from "@/lib/utils";

interface LegalPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: LegalPageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getLegalPageBySlug(slug);

    if (!page) {
        return {};
    }

    return {
        title: `${page.title} - Speetly`,
        description: `Mentions légales et conditions d'utilisation de Speetly`,
    };
}

export default async function LegalPage({ params }: LegalPageProps) {
    const { slug } = await params;
    const page = await getLegalPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
                <p className="text-sm text-muted-foreground mb-8">
                    Dernière mise à jour : {formatDate(page.lastUpdated)}
                </p>
                <LegalContent content={page.content} />
            </div>
        </div>
    );
} 