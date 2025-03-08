import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
export const FeatureGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const FeatureCard = ({
    className,
    title,
    description,
    header,
    icon,
    isNew,
    disabled,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    isNew?: boolean;
    disabled?: boolean;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 relative",
                className,
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <Plus
                strokeWidth={1}
                className="text-ali absolute -left-3 -top-3 h-5 w-5 z-10 text-indigo-500 animate-pulse"
            />
            <Plus
                strokeWidth={1}
                className="text-ali absolute -bottom-7 -left-3 h-5 w-5 z-10 text-indigo-500 animate-pulse"
            />
            <Plus
                strokeWidth={1}
                className="text-ali absolute -right-3 -top-3 h-5 w-5 z-10 text-indigo-500 animate-pulse"
            />
            <Plus
                strokeWidth={1}
                className="text-ali absolute -bottom-7 -right-3 h-5 w-5 z-10 text-indigo-500 animate-pulse"
            />

            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="flex items-center gap-2">
                    {icon} {isNew && <Badge>New</Badge>}
                </div>
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};
