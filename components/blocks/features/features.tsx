"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FeatureGrid, FeatureCard } from "../../ui/feature-grid";
import {
    Bot,
    CreditCard,
    FileText,
    LifeBuoy,
    Users,
} from "lucide-react";
import { SkeletonOne } from "./skeleton-one";
import { SkeletonTwo } from "./skeleton-two";
import { SkeletonThree } from "./skeleton-three";
import { SkeletonFour } from "./skeleton-four";
import { SkeletonFive } from "./skeleton-five";

export default function Features() {
    return (
        <FeatureGrid className="mx-auto auto-rows-[15rem] md:auto-rows-[16rem]">
            {items.map((item, i) => (
                <FeatureCard
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={cn("[&>p:text-lg]", item.className)}
                    icon={item.icon}
                    isNew={item.isNew}
                    disabled={item.disabled}
                />
            ))}
        </FeatureGrid>
    );
}

const items = [
    {
        title: "Smart Automation & AI",
        description: (
            <span className="text-sm">
                AI tracks payments and automatically sends reminders to late
                payers. Generate custom invoices in seconds.
            </span>
        ),
        header: <SkeletonOne />,
        className: "md:col-span-1",
        icon: <Bot className="h-4 w-4 text-neutral-500" />,
        isNew: true,
        disabled: false,
    },
    {
        title: "Ultra-flexible Payment Solution",
        description: (
            <span className="text-sm">
                Stripe integration for hassle-free payments and transfers. Split
                payment options allow your clients to pay in installments.
            </span>
        ),
        header: <SkeletonTwo />,
        className: "md:col-span-1",
        icon: <CreditCard className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Simplified Administrative Management",
        description: (
            <span className="text-sm">
                Automatic legal contract generator adapted to local regulations.
                Calculate your taxes and fees with a single click.
            </span>
        ),
        header: <SkeletonThree />,
        className: "md:col-span-1",
        icon: <FileText className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Client Management & Interactions",
        description: (
            <span className="text-sm">
                Centralize all communications and project information. Customize
                client portals for a branded experience.
            </span>
        ),
        header: <SkeletonFour />,
        className: "md:col-span-1",
        icon: <Users className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Support & Guided Workflows",
        description: (
            <span className="text-sm">
                Step-by-step workflows guide you through complex processes. 24/7
                support for any questions or issues.
            </span>
        ),
        header: <SkeletonFive />,
        className: "md:col-span-1",
        icon: <LifeBuoy className="h-4 w-4 text-neutral-500" />,
        disabled: false,
    },
]; 