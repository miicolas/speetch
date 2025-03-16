import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Customizing the h1 component
        h1: ({ children }) => (
            <h1 style={{ color: "red", fontSize: "48px" }}>{children}</h1>
        ),
        // Customizing the img component to use Next.js Image
        img: (props) => (
            <Image
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                {...(props as ImageProps)}
            />
        ),

        // Customizing the p component
        p: ({ children }) => (
            <p style={{ color: "blue", fontSize: "24px" }}>{children}</p>
        ),
        ...components,  // Spread the default components
    };
}