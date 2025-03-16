import { ArticleLayout } from "@/components/blog/article-layout";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles } from "@/lib/blog";
import { Metadata } from "next";

interface BlogPostPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug[0]);

    if (!article) {
        return {};
    }

    return {
        title: article.title,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            publishedTime: article.publishDate.toISOString(),
            authors: [article.author.name],
            tags: article.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug[0]);

    if (!article) {
        notFound();
    }

    const relatedArticles = await getRelatedArticles(slug[0], article.tags);
    const url = `${process.env.BETTER_AUTH_URL}/blog/${slug[0]}`;

    return (
        <ArticleLayout
            title={article.title}
            description={article.description}
            author={article.author}
            publishDate={article.publishDate}
            readingTime={article.readingTime}
            category={article.category}
            content={article.content}
            tags={article.tags}
            relatedArticles={relatedArticles}
            url={url}
        />
    );
}
