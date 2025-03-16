import { getAllLegalPages } from "@/lib/legal";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales - Speetly",
    description: "Consultez nos mentions légales, conditions d'utilisation et politique de confidentialité",
};

export default async function LegalIndexPage() {
    const pages = await getAllLegalPages();

    return (
        <div className="mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
                <div className="grid gap-4">
                    {pages.map((page) => (
                        <Card key={page.slug} className="p-6 hover:bg-muted/50 transition-colors">
                            <Link href={`/legal/${page.slug}`}>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold">
                                        {page.title}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Dernière mise à jour : {formatDate(page.lastUpdated)}
                                    </p>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
} 