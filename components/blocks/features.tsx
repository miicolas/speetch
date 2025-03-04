"use client";

import {
    Bot,
    CreditCard,
    FileText,
    Users,
    Layout,
    LifeBuoy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface FeaturesCard {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
    isNew?: boolean;
}

export default function FeaturesSection() {
    const features = [
        {
            title: "Smart Automation & AI",
            description:
                "AI tracks payments and automatically sends reminders to late payers. Analyzes your income and provides personalized suggestions to optimize your cash flow. Generate custom invoices in seconds.",
            icon: <Bot size={48} className="text-indigo-500" />,
            isNew: true,
            index: 1,
        },
        {
            title: "Ultra-flexible Payment Solution",
            description:
                "Stripe integration for hassle-free payments and transfers. Split payment options allow your clients to pay in installments for better flexibility.",
            icon: <CreditCard size={48} className="text-indigo-500" />,
            isNew: true,
            index: 2,
        },
        {
            title: "Simplified Administrative Management",
            description:
                "Automatic legal contract generator adapted to local regulations. Calculate your taxes and fees with a single click.",
            icon: <FileText size={48} className="text-indigo-500" />,
            isNew: true,
            index: 3,
        },
        {
            title: "CRM Designed for Freelancers",
            description:
                "Intuitive and visual dashboard to manage clients and projects. Automatic analysis of your most profitable clients to maximize revenue. Integration with Slack, Notion, and Trello for seamless project tracking.",
            icon: <Users size={48} className="text-indigo-500" />,
            isNew: true,
            index: 4,
        },
        {
            title: "User-friendly & Minimalist Interface",
            description:
                "Clean design accessible in 1-2 clicks. Customizable dashboards based on freelancer priorities and preferences.",
            icon: <Layout size={48} className="text-indigo-500" />,
            isNew: true,
            index: 5,
        },
        {
            title: "Support & Guidance",
            description:
                "Client contact form creation. Project calendar and scheduling tools to keep everything organized and on track.",
            icon: <LifeBuoy size={48} className="text-indigo-500" />,
            isNew: true,
            index: 6,
        },
    ];
    return (
        <section className="py-20  dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-6 text-neutral-800 dark:text-white">
                        The Problem: Freelancers Juggle Multiple Tools
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-300">
                        Managing clients, finances, projects, and administrative
                        tasks through different platforms leads to wasted time,
                        missed opportunities, stress, and unpaid invoices.
                    </p>
                    <div className="mt-8">
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            We are the all-in-one tool designed to simplify
                            everything and make freelancers' lives easier.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            index={feature.index}
                            isNew={feature.isNew}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

const FeatureCard = ({
    title,
    description,
    icon,
    index,
    isNew,
}: FeaturesCard) => {
    return (
        <div className="group/feature relative overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-600">
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-white dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-white dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="flex items-start justify-between">
                <div className="mb-4 text-neutral-600 dark:text-neutral-400">
                    {icon}
                </div>
                {isNew && (
                    <Badge className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs">
                        New Feature
                    </Badge>
                )}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 ">
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10">
                {description}
            </p>
        </div>
    );
};
