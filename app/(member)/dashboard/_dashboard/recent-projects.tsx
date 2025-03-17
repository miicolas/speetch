"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/types/project-type";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { getPaymentStatusDetails } from "@/lib/utils/payment-status";

interface RecentProjectsProps {
    projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
    const recentProjects = [...projects]
        .sort(
            (a, b) =>
                new Date(b.createdAt || "").getTime() -
                new Date(a.createdAt || "").getTime()
        )
        .slice(0, 5);

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Projets récents</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {recentProjects.map((project) => {
                        const paymentStatus = getPaymentStatusDetails(
                            project.paymentStatus || "pending"
                        );

                        return (
                            <div key={project.id} className="flex items-center">
                                <div className="space-y-1 flex-1">
                                    <Link
                                        href={`/dashboard/projects/${project.id}`}
                                        className="font-medium leading-none hover:underline"
                                    >
                                        {project.name}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant={paymentStatus.variant}>
                                        {paymentStatus.label}
                                    </Badge>
                                    <div className="ml-auto text-sm text-muted-foreground">
                                        {formatDistanceToNow(
                                            new Date(project.endDate || ""),
                                            {
                                                addSuffix: true,
                                                locale: fr,
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
