"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Check, ArrowRight, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Feature } from "@/lib/types/features-type";

export default function MainFeatures() {
    return (
        <section
            className="py-10 flex flex-col gap-8 px-4 sm:px-8 md:px-0 mt-16"
            id="features"
        >
            <HeaderMainFeatures />
            <FeaturesMainFeatures />
        </section>
    );
}

const HeaderMainFeatures = () => {
    return (
        <div className="text-left flex flex-col gap-4">
            <motion.span
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Simple and intuitive
            </motion.span>
            <motion.h2
                className="text-3xl sm:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                How does{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                    Speetch
                </span>{" "}
                ?
            </motion.h2>
            <motion.p
                className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Manage your projects, clients and payments with ease. Discover how Speetch can help you focus on your work rather than administration.
            </motion.p>
        </div>
    );
};

const FeaturesMainFeatures = () => {
    const features = [
        {
            step: "Étape 1",
            title: "Créez    nouveau projet",
            content:
                "Création rapide d'un projet avec assignation à un client existant ou nouveau. Configuration des détails, échéances et tarification en quelques clics.",
            image: "https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=crop",
            icon: <Plus className="h-4 w-4" />,
            color: "bg-blue-500",
        },
        {
            step: "Étape 2",
            title: "Invitez votre client",
            content:
                "Envoyez une invitation personnalisée à votre client pour qu'il puisse suivre l'avancement, partager des documents et collaborer directement sur la plateforme.",
            image: "https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop",
            icon: <ArrowRight className="h-4 w-4" />,
            color: "bg-purple-500",
        },
        {
            step: "Étape 3",
            title: "Gérez la facturation",
            content:
                "Générez automatiquement des factures professionnelles, suivez les paiements et configurez des rappels. Acceptez les paiements en ligne directement via la plateforme.",
            image: "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop",
            icon: <Check className="h-4 w-4" />,
            color: "bg-green-500",
        },
    ];

    return <EnhancedFeatureSteps features={features} />;
};

const EnhancedFeatureSteps: React.FC<{ features: Feature[] }> = ({
    features,
}) => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isAutoplay) return;

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 100 / (5000 / 100);
                } else {
                    setCurrentFeature((prev) => (prev + 1) % features.length);
                    return 0;
                }
            });
        }, 50);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isAutoplay, features.length, currentFeature]);

    const handleFeatureClick = (index: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsAutoplay(false);
        setCurrentFeature(index);
        setProgress(0);

        setTimeout(() => {
            setIsAutoplay(true);
        }, 10000);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className="w-full mt-12">
            <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-10 overflow-hidden">
                <motion.div
                    className="h-full bg-indigo-500"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}

                />
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12">
                <div className="order-2 lg:order-1 space-y-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={cn(
                                "flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer",
                                index === currentFeature
                                    ? "bg-neutral-100 dark:bg-neutral-800/50"
                                    : "",
                                hoveredIndex === index &&
                                    index !== currentFeature
                                    ? "bg-neutral-50 dark:bg-neutral-900/30"
                                    : ""
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: index === currentFeature ? 1.02 : 1,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                                ease: "easeOut",
                            }}
                            onClick={() => handleFeatureClick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex flex-col items-center">
                                <motion.div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center text-white",
                                        "bg-indigo-500",
                                        index === currentFeature
                                            ? "scale-110 shadow-lg"
                                            : ""
                                    )}
                                    animate={{
                                        scale:
                                            index === currentFeature
                                                ? [1, 1.1, 1]
                                                : 1,
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat:
                                            index === currentFeature
                                                ? Infinity
                                                : 0,
                                        repeatType: "reverse",
                                    }}
                                >
                                    {index < currentFeature ? (
                                        <Check className="h-5 w-5" />
                                    ) : index === currentFeature ? (
                                        <span className="text-sm font-semibold">
                                            {index + 1}
                                        </span>
                                    ) : (
                                        <span className="text-sm font-semibold">
                                            {index + 1}
                                        </span>
                                    )}
                                </motion.div>

                                {index < features.length - 1 && (
                                    <motion.div
                                        className={cn(
                                            "w-0.5 h-12 mt-2",
                                            index < currentFeature
                                                ? "bg-indigo-500"
                                                : index === currentFeature
                                                  ? "bg-gradient-to-b from-indigo-500 to-neutral-300 dark:to-neutral-700"
                                                  : "bg-neutral-300 dark:bg-neutral-700"
                                        )}
                                        animate={{
                                            height:
                                                index === currentFeature
                                                    ? [40, 48, 40]
                                                    : 40,
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat:
                                                index === currentFeature
                                                    ? Infinity
                                                    : 0,
                                            repeatType: "reverse",
                                        }}
                                    />
                                )}
                            </div>

                            <div className="flex-1 pt-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                        {feature.step}
                                    </span>
                                    {index === currentFeature && (
                                        <motion.span
                                            className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500"
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                            }}
                                        />
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {feature.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="order-1 lg:order-2 relative">
                    <div className="aspect-video h-[250px] sm:h-[300px] lg:h-[350px] relative overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg">
                        <AnimatePresence mode="wait">
                            {features.map(
                                (feature, index) =>
                                    index === currentFeature && (
                                        <motion.div
                                            key={index}
                                            className="absolute inset-0"
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <div className="absolute inset-0 z-10 pointer-events-none">
                                                <motion.div
                                                    className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-70"
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                    }}
                                                />
                                                <motion.div
                                                    className="absolute right-12 bottom-6 h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-60"
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        y: [0, -10, 0],
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                    }}
                                                />
                                                <motion.div
                                                    className="absolute right-5 top-10 h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-teal-500 opacity-60"
                                                    animate={{
                                                        scale: [1, 1.4, 1],
                                                        y: [0, 5, 0],
                                                    }}
                                                    transition={{
                                                        duration: 5,
                                                        repeat: Infinity,
                                                    }}
                                                />
                                            </div>

                                            <div className="absolute inset-0 bg-black/30 z-10" />
                                            <Image
                                                src={feature.image}
                                                alt={feature.title}
                                                className="w-full h-full object-cover"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />

                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24 z-20 flex items-end p-4">
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{ delay: 0.3 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center text-white",
                                                            "bg-indigo-500"
                                                        )}
                                                    >
                                                        {
                                                            <BrainCircuit className="h-4 w-4" />
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium text-sm">
                                                            {feature.title}
                                                        </p>
                                                        <p className="text-white/70 text-xs">
                                                            {feature.step}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center mt-6 gap-2">
                        {features.map((_, index) => (
                            <motion.button
                                key={index}
                                className={cn(
                                    "w-2 h-2 rounded-full",
                                    index === currentFeature
                                        ? "bg-indigo-600"
                                        : "bg-neutral-300 dark:bg-neutral-700"
                                )}
                                animate={{
                                    scale:
                                        index === currentFeature
                                            ? [1, 1.3, 1]
                                            : 1,
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat:
                                        index === currentFeature ? Infinity : 0,
                                    repeatType: "reverse",
                                }}
                                onClick={() => handleFeatureClick(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
