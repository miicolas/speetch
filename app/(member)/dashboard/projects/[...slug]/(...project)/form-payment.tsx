"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  price: z.coerce.number().min(1, "Le prix doit être supérieur à 0"),
  description: z.string().min(3, "La description doit contenir au moins 3 caractères")
});

export default function FormPayment({ stripeAccountId, userId, projectId }: { stripeAccountId: string, userId: string, projectId: string }) {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      description: ""
    }
  });
 
  async function onSubmit(values: z.infer<typeof formSchema>) {    
    try {
      const response = await fetch("/api/stripe/create-payment", {

        
        method: "POST",
        body: JSON.stringify({
          amount: values.price,
          description: values.description,
          stripeAccountId: stripeAccountId,
          userId: userId,
          projectId: projectId
        })
      });

      const data = await response.json();
    
      if (data.status === "success") {
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant (€)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  placeholder="99.99" 
                />
              </FormControl>
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
                <Input 
                  {...field} 
                  placeholder="Description du paiement" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >
          Créer le paiement
        </Button>
      </form>
    </Form>
  );
} 