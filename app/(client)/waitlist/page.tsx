"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { addMail } from "@/actions/(newsletter)/add-mail/action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import EarlyAccessCard from "@/components/blocks/early-access-card";

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
});

export default function WaitlistPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await addMail(values);
            if (res.status === "success") {
                form.reset();
                toast.success("You are now on the waitlist!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred", {
                description: "Please try again later.",
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full space-y-8 text-center lg:text-left"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
                >
                    <span className="inline-block mb-2">Join the waitlist</span>{" "}
                    <div className="flex flex-col items-center lg:items-start justify-center gap-2 w-full">
                        <span className="text-indigo-600 dark:text-indigo-400">
                            and be the first to
                        </span>{" "}
                        <div className="inline-block">
                            <div className="group inline-block overflow-hidden relative rounded-lg">
                                <div className="px-3 py-1 text-4xl sm:text-5xl md:text-6xl font-bold group-hover:text-white transition-all duration-300">
                                    to discover Speetly
                                </div>
                                <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-400 -skew-x-20 -skew-y-20 group-hover:skew-x-0 group-hover:skew-y-0 transition-all duration-300 -z-10 opacity-0 group-hover:opacity-100"></div>
                            </div>
                        </div>
                    </div>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto lg:mx-0"
                >
                    Be among the first to benefit from our project and client
                    management platform{" "}
                    <span className="text-indigo-600 dark:text-indigo-400 italic">
                        for free
                    </span>
                    . Sign up to receive priority access and exclusive offers.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
                >
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex gap-2 w-full max-w-md"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Your email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={!form.formState.isValid}
                                className={`${form.formState.isValid ? "animate-pulse" : ""}`}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </form>
                    </Form>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-md"
            >
                <EarlyAccessCard />
            </motion.div>
        </div>
    );
}
