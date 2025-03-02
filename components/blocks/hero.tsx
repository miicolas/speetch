"use client";

import { useEffect } from "react";
import Link from "next/link";
import { renderCanvas } from "@/components/ui/canvas";
import { ArrowRight, Plus, Shapes } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { Cover } from "../ui/cover";
import HoverBorderGradient from "../ui/hover-border-gradient";

export default function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section className="relative ">
      <div className="animation-delay-8 animate-fadeIn flex flex-col items-center justify-center px-4 text-center z-10">
        <div className="z-10 mb-6 mt-10 justify-center">
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover px-3 py-1 text-xs leading-6  text-primary/60 ">
            <Shapes className="h-5 p-1" />
            Introducing Speech.
            <Link
              href="/products/dicons"
              rel="noreferrer"
              className="hover:text-ali ml-1 flex items-center font-semibold"
            >
              <div className="absolute inset-0 flex" aria-hidden="true" />
              Explore{" "}
              <span aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        <div className="px-2">
          <div className="border-ali relative mx-auto h-full max-w-7xl border p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20 bg-white">
            <h1 className="flex select-none flex-col px-3 py-2 text-center text-4xl font-semibold leading-none tracking-tight md:flex-col lg:flex-row lg:text-8xl">
              <Plus
                strokeWidth={4}
                className="text-ali absolute -left-5 -top-5 h-10 w-10 text-indigo-500"
              />
              <Plus
                strokeWidth={4}
                className="text-ali absolute -bottom-5 -left-5 h-10 w-10 text-indigo-500"
              />
              <Plus
                strokeWidth={4}
                className="text-ali absolute -right-5 -top-5 h-10 w-10 text-indigo-500"
              />
              <Plus
                strokeWidth={4}
                className="text-ali absolute -bottom-5 -right-5 h-10 w-10 text-indigo-500"
              />
              <span className="flex flex-col gap-4">
                Everything pass through{" "}
                <div className="flex items-center justify-center gap-4">
                  {" "}
                  <span className="text-ali">your</span>{" "}
                  <Cover className="space-x-2 group overflow-hidden">
                    
                    <FlipWords
                      className="group-hover:text-ali group-hover:text-white px-4"
                      words={["business", "projects", "clients", "growth"]}
                    />{" "}
                  </Cover>{" "}
                </div>
              </span>
            </h1>
          </div>
        </div>

        <h1 className="mt-8 text-2xl md:text-2xl">
          Speetch is a platform that allows you to create and manage your
          clients, projects, and money.
        </h1>

        <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
          Allow you to simplify your workflow and improve your productivity.
        </p>
        <div className="flex justify-center gap-2">
          <Link href={"/dashboard"}>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-indigo-500 text-white flex items-center space-x-2"
            >
              <Plus />
              <span>Waitlist</span>
            </HoverBorderGradient>
          </Link>
          <Link href={"https://cal.com/aliimam/designali"} target="_blank">
            <Button variant="outline" size="lg">
              Book a call
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
