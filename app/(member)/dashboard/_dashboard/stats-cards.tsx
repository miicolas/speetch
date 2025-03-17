import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/types/project-type";
import { Payment } from "@/lib/types/payment-type";
import { Euro, FileCheck, Clock, AlertCircle } from "lucide-react";

interface StatsCardsProps {
    projects: Project[];
    payments: Payment[];
}

export function StatsCards({ projects, payments }: StatsCardsProps) {
    const totalAmount = projects.reduce((acc, project) => acc + project.amount, 0);
    const paidAmount = payments
        .filter(payment => payment.status === "paid")
        .reduce((acc, payment) => acc + payment.amount, 0);
    
    const pendingProjects = projects.filter(
        (project) => project.status === "pending"
    ).length;
    
    const completedProjects = projects.filter(
        (project) => project.status === "done"
    ).length;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Revenus totaux
                    </CardTitle>
                    <Euro className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalAmount}€</div>
                    <p className="text-xs text-muted-foreground">
                        {paidAmount}€ reçus
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Projets en cours
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pendingProjects}</div>
                    <p className="text-xs text-muted-foreground">
                        projets actifs
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Projets terminés
                    </CardTitle>
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completedProjects}</div>
                    <p className="text-xs text-muted-foreground">
                        projets complétés
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Taux de complétion
                    </CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {projects.length > 0
                            ? Math.round((completedProjects / projects.length) * 100)
                            : 0}
                        %
                    </div>
                    <p className="text-xs text-muted-foreground">
                        des projets terminés
                    </p>
                </CardContent>
            </Card>
        </div>
    );
} 