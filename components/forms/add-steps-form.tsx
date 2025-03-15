"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "../ui/form";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "../ui/select";
import { toast } from "sonner";
import { addStep } from "@/actions/(member)/add-step/action";
import { useRouter } from "next/navigation";
import { PlusCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    description: z
        .string()
        .min(5, {
            message: "La description doit contenir au moins 5 caractères",
        }),
    status: z.string().min(1, { message: "Veuillez sélectionner un statut" }),
});

export function AddStepsForm({ projectId }: { projectId: string }) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            status: "no started",
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const addStepAction = await addStep({
                name: values.name,
                description: values.description,
                status: values.status,
                projectId: projectId,
            });
            if (addStepAction.status === "error") {
                toast.error(addStepAction.message);
            } else {
                toast.success(
                    addStepAction.message || "Étape ajoutée avec succès"
                );
                router.refresh();
                form.reset();
            }
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue lors de l'ajout de l'étape");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Step name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Ex: Design of the interface"
                                    className="w-full"
                                    disabled={isSubmitting}
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
                                <Textarea
                                    {...field}
                                    placeholder="Describe this step in more detail..."
                                    className="resize-none min-h-[100px]"
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isSubmitting}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="no started">
                                        Not started
                                    </SelectItem>
                                    <SelectItem value="in progress">
                                        In progress
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The status indicates the progress of this step
                                in the project
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="min-w-[120px]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creation...
                            </>
                        ) : (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add step
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
