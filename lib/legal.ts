import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
export interface LegalPage {
    slug: string;
    title: string;
    lastUpdated: Date;
    content: MDXRemoteSerializeResult;
}

const LEGAL_DIR = path.join(process.cwd(), "content/legal");

export async function getAllLegalPages(): Promise<LegalPage[]> {
    try {
        const files = await fs.readdir(LEGAL_DIR);
        const pages = await Promise.all(
            files
                .filter((file) => file.endsWith(".mdx"))
                .map(async (file) => {
                    const slug = file.replace(".mdx", "");
                    const page = await getLegalPageBySlug(slug);
                    return page;
                })
        );

        return pages
            .filter((page): page is LegalPage => page !== null)
            .sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
        console.error("Error fetching legal pages:", error);
        return [];
    }
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
    try {
        const filePath = path.join(LEGAL_DIR, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const mdxSource = await serialize(content);

        return {
            slug,
            title: data.title,
            lastUpdated: new Date(data.lastUpdated),
            content: mdxSource,
        };
    } catch (error) {
        console.error("Error fetching legal page:", error);
        return null;
    }
} 