"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { findProject } from "@/actions/(member)/find-project/action";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Search } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ResultProject from "@/app/(client)/(view-project)/view-project/(...view-project)/result-project";
interface ProjectResult {
    id: string;
    name: string;
    amount: number;
    status: string;
    createdAt?: string | Date;
}

const formSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide.",
    }),
    projectName: z.string().min(1, {
        message: "Veuillez entrer un nom de projet.",
    }),
});

export default function ProjectSearchForm() {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<ProjectResult[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            projectName: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSearching(true);
        setHasSearched(true);

        try {
            const result = await findProject({
                email: values.email,
                projectName: values.projectName,
            });

            if (result.status === "success" && result.content) {
                const projects = result.content as ProjectResult[];
                setSearchResults(projects);
                if (projects.length === 0) {
                    toast.info("Aucun projet trouvé avec ces critères.");
                }
            } else {
                setSearchResults([]);
                toast.error(result.message || "Aucun projet trouvé.");
            }
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
            toast.error("Erreur lors de la recherche du projet.");
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Rechercher un projet</CardTitle>
                    <CardDescription>
                        Entrez l'email du client et le nom du projet pour le
                        trouver.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email du client
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@email.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="projectName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom du projet</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Site web client X"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isSearching}
                                className="w-full"
                            >
                                {isSearching ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Recherche en cours...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Rechercher
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {hasSearched && <ResultProject searchResults={searchResults} />}
        </div>
    );
}
