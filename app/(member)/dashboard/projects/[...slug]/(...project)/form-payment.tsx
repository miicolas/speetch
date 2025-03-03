"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    price: z.string()
        .min(1, { message: "Le prix est requis" })
        .transform((val) => {
            const parsed = parseFloat(val);
            return isNaN(parsed) ? 0 : parsed;
        })
        .refine((val) => val > 0, { message: "Le prix doit être supérieur à 0" }),
    description: z.string().min(1, {
        message: "La description doit contenir au moins 1 caractère",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface FormPaymentProps {
    handleFormPayment: (price: number, description: string) => Promise<void>;
}

export default function FormPayment({ handleFormPayment }: FormPaymentProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0,
            description: "",
        },
    });

    async function onSubmit(values: FormValues) {
        try {
            setIsSubmitting(true);
            const { price, description } = values;
            await handleFormPayment(price, description);
            form.reset();
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prix (€)</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="100" 
                                    {...field} 
                                    type="number"
                                    min="0"
                                    step="0.01"
                                />
                            </FormControl>
                            <FormDescription>
                                Montant en euros
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Description du projet"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Description du projet ou du service
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Traitement en cours..." : "Soumettre le paiement"}
                </Button>
            </form>
        </Form>
    );
}
