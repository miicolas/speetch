"use client";

import { ArticleHeader } from "./article-header";
import { ArticleContent } from "./article-content";
import { ArticleFooter } from "./article-footer";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
interface ArticleLayoutProps {
    title: string;
    description: string;
    author: {
        name: string;
        image: string;
    };
    publishDate: Date;
    readingTime: string;
    category: string;
    content: MDXRemoteSerializeResult;
    tags: string[];
    relatedArticles: Array<{
        slug: string;
        title: string;
        description: string;
    }>;
    url: string;
}

export function ArticleLayout({
    title,
    description,
    author,
    publishDate,
    readingTime,
    category,
    content,
    tags,
    relatedArticles,
    url,
}: ArticleLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <ArticleHeader
                title={title}
                description={description}
                author={author}
                publishDate={publishDate.toISOString()}
                readingTime={readingTime}
                category={category}
            />

            <div className="my-8">
                <ArticleContent content={content} />
            </div>

            <ArticleFooter
                tags={tags}
                relatedArticles={relatedArticles}
                url={url}
            />
        </div>
    );
} 