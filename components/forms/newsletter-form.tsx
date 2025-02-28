"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { addMail } from "@/actions/(newsletter)/add-mail/action";
import { ArrowRightIcon } from "lucide-react";
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

export default function NewsletterForm() {
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
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} className="text-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className={`${form.formState.isValid ? "animate-pulse" : ""}`}
        >
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
