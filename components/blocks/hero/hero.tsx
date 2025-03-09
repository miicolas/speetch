"use client";

import { useEffect, useRef } from "react";
import { renderCanvas } from "@/components/ui/canvas";
import { motion, useInView } from "framer-motion";
import { IntroBadge } from "./intro-badge";
import { HeroContent } from "./hero-content";
import { DashboardCard } from "./dashboard-card";
import { ScrollIndicator } from "./scroll-indicator";

export default function Hero() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    useEffect(() => {
        renderCanvas();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="py-20 relative overflow-hidden">
        
            <motion.div
                ref={containerRef}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <IntroBadge itemVariants={itemVariants} />

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                    <HeroContent itemVariants={itemVariants} />
                    <DashboardCard itemVariants={itemVariants} />
                </div>

                <ScrollIndicator itemVariants={itemVariants} />
            </motion.div>
        </section>
    );
}

