import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
export interface BlogArticle {
    slug: string;
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
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export async function getAllArticles(): Promise<BlogArticle[]> {
    try {
        const files = await fs.readdir(CONTENT_DIR);
        const articles = await Promise.all(
            files
                .filter((file) => file.endsWith(".mdx"))
                .map(async (file) => {
                    const slug = file.replace(".mdx", "");
                    const article = await getArticleBySlug(slug);
                    return article;
                })
        );

        return articles
            .filter((article): article is BlogArticle => article !== null)
            .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    } catch (error) {
        console.error("Error fetching all articles:", error);
            return [];
    }
}

export async function getArticleBySlug(
    slug: string
): Promise<BlogArticle | null> {
    try {
        const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const mdxSource = await serialize(content);

        return {
            slug,
            title: data.title,
            description: data.description,
            author: {
                name: data.author.name,
                image: data.author.image,
            },
            publishDate: new Date(data.publishDate),
            readingTime: readingTime(content).text,
            category: data.category,
            content: mdxSource,
            tags: data.tags || [],
        };
    } catch (error) {
        console.error("Error fetching article:", error);
        return null;
    }
}

export async function getRelatedArticles(
    currentSlug: string,
    tags: string[],
    limit = 2
): Promise<Array<{ slug: string; title: string; description: string }>> {
    try {
        const files = await fs.readdir(CONTENT_DIR);
        const articles = await Promise.all(
            files
                .filter((file) => file.endsWith(".mdx"))
                .map(async (file) => {
                    const slug = file.replace(".mdx", "");
                    if (slug === currentSlug) return null;

                    const article = await getArticleBySlug(slug);
                    if (!article) return null;

                    const sharedTags = article.tags.filter((tag) =>
                        tags.includes(tag)
                    );
                    return {
                        slug,
                        title: article.title,
                        description: article.description,
                        score: sharedTags.length,
                    };
                })
        );

        return articles
            .filter(
                (article): article is NonNullable<typeof article> =>
                    article !== null
            )
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(({ slug, title, description }) => ({
                slug,
                title,
                description,
            }));
    } catch (error) {
        console.error("Error fetching related articles:", error);
        return [];
    }
}
