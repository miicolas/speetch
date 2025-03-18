import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, Linkedin, Facebook, Link } from "lucide-react";

interface RelatedArticle {
    slug: string;
    title: string;
    description: string;
}

interface ArticleFooterProps {
    tags: string[];
    relatedArticles: RelatedArticle[];
    url: string;
}

export function ArticleFooter({ tags, relatedArticles, url }: ArticleFooterProps) {
    const shareUrl = encodeURIComponent(url);
    const shareTitle = encodeURIComponent("Découvrez cet article intéressant !");

    return (
        <div className="space-y-8 pt-8 border-t">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag}>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Partager</h3>
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        asChild
                    >
                        <a
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Partager sur Twitter"
                        >
                            <Twitter className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        asChild
                    >
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Partager sur LinkedIn"
                        >
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        asChild
                    >
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Partager sur Facebook"
                        >
                            <Facebook className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                            navigator.clipboard.writeText(url);
                        }}
                        aria-label="Copier le lien"
                    >
                        <Link className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {relatedArticles.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Articles similaires</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {relatedArticles.map((article) => (
                            <Card
                                key={article.slug}
                                className="p-4 hover:bg-muted/50 transition-colors"
                            >
                                <a href={`/blog/${article.slug}`}>
                                    <h4 className="font-medium mb-1">
                                        {article.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {article.description}
                                    </p>
                                </a>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 