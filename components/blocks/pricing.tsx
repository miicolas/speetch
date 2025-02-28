"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { NumberTicker } from "../ui/number-ticker";
import { CheckIcon } from "lucide-react";
export default function Pricing() {
  const pricingCards = [
    {
      title: "Free",
      price: "0",
      description: "For personal use",
      features: ["1000 credits", "1000 words", "1000 characters"],
      typePricing: "month",
    },
    /* {
      title: "Pro",
      price: "10",
      description: "For professional use",
      features: ["1000 credits", "1000 words", "1000 characters"],
      typePricing: "month",
    },
    {
      title: "Enterprise",
      price: "100",
      description: "For enterprise use",
      features: [
        "1000 credits",
        "1000 words",
        "1000 characters",
        "1000 images",
      ],
      typePricing: "month",
    }, */
  ];

  const [selectedPricing, setSelectedPricing] = useState("monthly");

  return (
    <div className="flex flex-col gap-8 py-12">
      <h2 className="text-4xl font-bold text-center mt-10">
        Simple Pricing for Simple Solutions
      </h2>
      <p className="text-center text-neutral-500">
        Choose the plan that&apos;s right for you. No hidden fees, no surprises.
      </p>
      <div className="flex flex-row gap-4 justify-center items-center border border-neutral-200 w-fit mx-auto rounded-lg p-2">
        <Button
          variant="outline"
          onClick={() => setSelectedPricing("yearly")}
          className={selectedPricing === "yearly" ? "bg-neutral-200" : ""}
        >
          Yearly
        </Button>
        <Button
          variant="outline"
          onClick={() => setSelectedPricing("monthly")}
          className={selectedPricing === "monthly" ? "bg-neutral-200" : ""}
        >
          Monthly
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-start w-full h-full">
        {pricingCards.map((card) => (
          <PricingCard
            key={card.title}
            {...card}
            selectedPricing={selectedPricing}
          />
        ))}
      </div>
    </div>
  );
}

const PricingCard = ({
  title,
  price,
  description,
  features,

  selectedPricing,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  selectedPricing: string;
}) => {
  return (
    <div className="flex flex-1 flex-col p-4 border border-neutral-200 min-h-[400px] w-full md:w-[300px] gap-4 bg-neutral-50 justify-between">
      <div className="space-y-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="h-16 relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedPricing}
              className="text-2xl font-bold absolute"
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-4xl">
                {price === "0" ? (
                  "0"
                ) : selectedPricing === "yearly" ? (
                  <NumberTicker value={Number(price) * 10} />
                ) : (
                  <NumberTicker value={Number(price)} />
                )}
              </span>
              <span className="text-sm text-neutral-500">
                /{selectedPricing === "yearly" ? "year" : "month"}
              </span>
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="text-sm text-neutral-500">{description}</p>
        <Separator />
        <ul className="list-none space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button className="mt-auto">Get Started</Button>
    </div>
  );
};
