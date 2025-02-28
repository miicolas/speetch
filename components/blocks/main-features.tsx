"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Feature } from "@/lib/types/features-type";

export default function MainFeatures() {
  return (
    <section className="py-10 flex flex-col gap-12 px-8 md:px-0">
      <HeaderMainFeatures />
      <FeaturesMainFeatures />
    </section>
  );
}

const HeaderMainFeatures = () => {
  return (
    <div className="text-left flex flex-col gap-2">
      <h2 className="text-4xl font-bold">What is Speetch?</h2>
      
    </div>
  );
};

const FeaturesMainFeatures = () => {
  const features = [
    {
      step: "Step 1",
      title: "Create a new project",
      content: "Create a new project with a new client.",
      image:
        "https://images.unsplash.com/photo-1723958929247-ef054b525153?q=80&w=2070&auto=format&fit=crop",
    },
    {
      step: "Step 2",
      title: "Send an invite to your client",
      content:
        "Send an invite to your client so they can inform, track and collaborate with you on the project.",
      image:
        "https://images.unsplash.com/photo-1723931464622-b7df7c71e380?q=80&w=2070&auto=format&fit=crop",
    },
    {
      step: "Step 3",
      title: "Send him the invoice",
      content: "Send him the invoice so he can pay you for your work.",
      image:
        "https://images.unsplash.com/photo-1725961476494-efa87ae3106a?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return <FeatureSteps features={features} />;
};

const FeatureSteps: React.FC<{ features: Feature[] }> = ({ features }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (3000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length]);

  return (
    <div className="mx-auto w-full my-12">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
        <div className="order-2 md:order-1 space-y-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-6 md:gap-8"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
              onClick={() => setCurrentFeature(index)}
            >
              <motion.div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                  index === currentFeature
                    ? "bg-blue-500 border-blue-600 text-white scale-110"
                    : "bg-blue-100 border-blue-200 text-white"
                )}
              >
                {index <= currentFeature ? (
                  <span className="text-lg font-bold">✓</span>
                ) : (
                  <span className="text-lg font-semibold">{index + 1}</span>
                )}
              </motion.div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {feature.title || feature.step}
                </h3>
                <p className="text-sm md:text-lg text-muted-foreground">
                  {feature.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className={cn(
            "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px]"
          )}
        >
          <AnimatePresence mode="wait">
            {features.map(
              (feature, index) =>
                index === currentFeature && (
                  <motion.div
                    key={index}
                    className="absolute inset-0 "
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 , transition: { duration: 0.5 } }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Plus
                      strokeWidth={1}
                      className="text-ali absolute -left-5 -top-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                    />
                    <Plus
                      strokeWidth={1}
                      className="text-ali absolute -bottom-5 -left-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                    />
                    <Plus
                      strokeWidth={1}
                      className="text-ali absolute -right-5 -top-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                    />
                    <Plus
                      strokeWidth={1}
                      className="text-ali absolute -bottom-5 -right-5 h-10 w-10 z-10 text-neutral-900 animate-pulse"
                    />
                    <Image
                      src={feature.image}
                      alt={feature.step}
                      className="w-full h-full object-cover transition-transform transform"
                      width={1000}
                      height={500}
                    />
                    {/*                       <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
                     */}{" "}
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
