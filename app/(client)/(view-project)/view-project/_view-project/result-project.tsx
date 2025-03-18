import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProjectResult } from "@/lib/types/project-type";

export default function ResultProject({
    searchResults,
}: {
    searchResults: ProjectResult[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Résultats de la recherche</CardTitle>
                <CardDescription>
                    {searchResults.length} projet(s) trouvé(s)
                </CardDescription>
            </CardHeader>
            <CardContent>
                {searchResults.length > 0 ? (
                    <div className="space-y-4">
                        {searchResults.map((project) => (
                            <div
                                key={project.id}
                                className="border rounded-md p-4 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-lg">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Montant: {project.amount} €
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Status: {project.status}
                                        </p>
                                        {project.createdAt && (
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Créé le{" "}
                                                {new Date(
                                                    project.createdAt
                                                ).toLocaleDateString("fr-FR")}
                                            </p>
                                        )}
                                    </div>
                                    <Button asChild>
                                        <Link href={`/project/${project.id}`}>
                                            Voir le projet
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">
                            Aucun projet trouvé avec les critères spécifiés
                        </p>
                    </div>
                )}
            </CardContent>
            {searchResults.length > 0 && (
                <CardFooter className="border-t pt-6 flex justify-between">
                    <p className="text-sm text-muted-foreground">
                        Résultats correspondant à votre recherche
                    </p>
                </CardFooter>
            )}
        </Card>
    );
}
