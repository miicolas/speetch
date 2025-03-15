"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
        message: "Please enter a valid email address.",
    }),
    projectName: z.string().min(1, {
        message: "Please enter a project name.",
    }),
});

export default function ProjectSearchForm() {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<ProjectResult[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

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
                    toast.info("No project found with these criteria.");
                }
            } else {
                setSearchResults([]);
                toast.error(result.message || "No project found.");
            }
        } catch (error) {
            console.error("Error searching for project:", error);
            toast.error("Error searching for project.");
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
                                            <FormLabel>Client email</FormLabel>
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
                                            <FormLabel>Project name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Client website X"
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
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Search
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
