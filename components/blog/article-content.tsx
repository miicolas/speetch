"use client";

import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface ArticleContentProps {
    content: MDXRemoteSerializeResult;
    className?: string;
}

const components = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className={cn(
                "mt-8 mb-4 text-4xl font-bold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                "mt-8 mb-4 text-3xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={cn(
                "mt-6 mb-3 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    p: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({
        className,
        ...props
    }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className={cn(
                "mt-6 border-l-4 border-primary pl-6 italic",
                className
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
                className
            )}
            {...props}
        />
    ),
    pre: ({ children }: { children: React.ReactElement<{ children: string; className?: string }> }) => {
        const code = children?.props?.children || "";
        const language = children?.props?.className?.replace("language-", "") || "text";

        return (
            <div className="my-6 overflow-hidden rounded-lg bg-neutral-20 text-lg">
                <SyntaxHighlighter
                    language={language}
                    style={vs}
                    customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        backgroundColor: "hsl(var(--muted))",
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        );
    },
};

export function ArticleContent({ content, className }: ArticleContentProps) {
    return (
        <article
            className={cn(
                "prose prose-slate dark:prose-invert max-w-none",
                className
            )}
        >
            <MDXRemote {...content} components={components} />
        </article>
    );
}
