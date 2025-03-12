import FormPayment from "./(...project)/form-payment";
import { getServerSession } from "@/lib/server-session";
import { getStripeAccount } from "@/actions/(stripe)/get-stripe/action";
import { getProjectPayment } from "@/actions/(stripe)/get-project-payment/action";
import { getProject } from "@/actions/(member)/get-project/action";
import LinksPayment from "./(...project)/links-payment";
import {
    Calendar,
    CreditCard,
    FileCog,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    Euro,
    Building,
    User,
    History,
    CreditCard as Payment,
    ChevronLeft,
    ScrollText,
    BarChart3,
    CalendarDays,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/lib/types/project-type";
import {
    StatusUpdateWrapper,
    PaymentDateUpdateWrapper,
    ProjectDateUpdateWrapper,
} from "./(...project)/client-wrappers";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const session = await getServerSession();
    const stripeAccountId = (await getStripeAccount({
        userId: session.user.id,
    })) as { content: { stripeAccountId: string }[] };
    const sessionPayment = (await getProjectPayment({
        userId: session.user.id,
    })) as { content: [] };

    const projectData = await getProject({ projectId: slug[0] });

    if (
        !projectData ||
        projectData.status === "error" ||
        !projectData.content
    ) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl font-bold">Projet non trouvé</h1>
                <p className="text-muted-foreground mt-2">
                    Le projet que vous recherchez n'existe pas ou vous n'y avez
                    pas accès.
                </p>
                <Button className="mt-4" variant="outline" asChild>
                    <Link href="/dashboard/projects">Retour aux projets</Link>
                </Button>
            </div>
        );
    }

    const p = projectData.content as Project;

    // Fonction pour obtenir les détails du statut
    const getStatusDetails = (status: string) => {
        switch (status) {
            case "not_started":
                return {
                    label: "Non démarré",
                    variant: "outline",
                    icon: Clock,
                };
            case "pending":
                return {
                    label: "En cours",
                    variant: "secondary",
                    icon: AlertCircle,
                };
            case "done":
                return {
                    label: "Terminé",
                    variant: "default",
                    icon: CheckCircle,
                };
            case "failed":
                return {
                    label: "Échoué",
                    variant: "destructive",
                    icon: AlertCircle,
                };
            default:
                return {
                    label: status || "Non défini",
                    variant: "outline",
                    icon: Clock,
                };
        }
    };

    const getPaymentStatusDetails = (status: string) => {
        if (!status) return { label: "Non défini", variant: "outline" };

        switch (status) {
            case "paid":
                return { label: "Payé", variant: "default" };
            case "pending":
                return { label: "En attente", variant: "secondary" };
            case "overdue":
                return { label: "En retard", variant: "destructive" };
            default:
                return { label: status, variant: "outline" };
        }
    };

    const statusInfo = getStatusDetails(p.status);
    const paymentStatusInfo = getPaymentStatusDetails(
        p.paymentStatus || "pending"
    );
    const StatusIcon = statusInfo.icon;

    const formattedEndDate = p.endDate
        ? new Date(p.endDate).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "Non définie";

    const timeDistance = p.endDate
        ? formatDistanceToNow(new Date(p.endDate), {
              addSuffix: true,
              locale: fr,
          })
        : "Date non définie";

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Barre de navigation */}
            <div className="mb-8">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Link
                        href="/dashboard/projects"
                        className="hover:text-foreground flex items-center"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Retour aux projets
                    </Link>
                </div>
            </div>

            {/* En-tête du projet */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h1 className="text-3xl font-bold">{p.name}</h1>
                        <Badge
                            variant={statusInfo.variant as "default" | "destructive" | "outline" | "secondary"}
                            className="ml-2 px-2 py-1 text-xs flex items-center gap-1"
                        >
                            <StatusIcon className="h-3.5 w-3.5" />
                            <span>{statusInfo.label}</span>
                        </Badge>
        </div>

                    {p.client && (
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <Building className="h-4 w-4" />
                            <span>
                                Client:{" "}
                                <Link
                                    href={`/dashboard/clients/${p.clientId}`}
                                    className="font-medium hover:underline"
                                >
                                    {p.client.name}
                                </Link>
                            </span>
                        </div>
                    )}

                    <p className="text-muted-foreground max-w-2xl">
                        {p.description}
                    </p>
                </div>

                <div className="flex flex-col gap-2 md:self-start">
                    <Button className="w-full" asChild>
                        <Link href={`/dashboard/projects/${p.id}/edit`}>
                            <FileText className="h-4 w-4 mr-2" />
                            Éditer le projet
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <FileCog className="h-4 w-4 mr-2" />
                                Actions
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Marquer comme terminé
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ScrollText className="h-4 w-4 mr-2" />
                                Générer une facture
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Supprimer le projet
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                                Vue d'ensemble
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Project status
                                    </h3>
                                    <StatusUpdateWrapper
                                        projectId={p.id}
                                        currentStatus={p.status}
                                    />
                                </div>

                                {/* Montant */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Project amount
                                    </h3>
                                    <div className="flex items-center">
                                        <Euro className="h-6 w-6 mr-2 text-primary" />
                                        <span className="text-3xl font-bold">
                                            {p.amount} €
                                        </span>
                                    </div>
                                </div>

                                {/* Échéance */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Project due date
                                    </h3>
                                    <div className="space-y-1">
                                        <div className="flex items-center">
                                            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                                            <span className="text-lg font-medium">
                                                {formattedEndDate}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {timeDistance}
                                        </p>
                                    </div>
                                </div>

                                {/* Paiement */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Payment status
                                    </h3>
                                    <div className="space-y-2">
                                        <Badge
                                            variant={paymentStatusInfo.variant as "default" | "destructive" | "outline" | "secondary"}
                                            className="px-2 py-1 text-sm"
                                        >
                                            {paymentStatusInfo.label}
                                        </Badge>
                                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                                            <CreditCard className="h-4 w-4 mr-1" />
                                            <span>
                                                Method:{" "}
                                                {p.paymentMethod ||
                                                    "Not defined"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                Detailed description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-line leading-relaxed">
                                {p.description ||
                                    "No detailed description available."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Historique des activités */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="h-5 w-5 text-muted-foreground" />
                                Activity history
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-l-2 border-primary pl-4 pb-4">
                                    <p className="text-sm text-muted-foreground">
                                        Today
                                    </p>
                                    <p className="font-medium">
                                        Project consultation
                                    </p>
                                </div>
                                <div className="border-l-2 border-muted pl-4 pb-4">
                                    <p className="text-sm text-muted-foreground">
                                        {p.createdAt
                                            ? new Date(
                                                  p.createdAt
                                              ).toLocaleDateString("fr-FR")
                                            : "Date inconnue"}
                                    </p>
                                    <p className="font-medium">
                                        Project creation
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Barre latérale (1/3) */}
                <div className="space-y-8">
                    {/* Date de paiement */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                Payment date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PaymentDateUpdateWrapper
                                projectId={p.id}
                                currentPaymentDate={p.paymentDate}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                Project end date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProjectDateUpdateWrapper
                                projectId={p.id}
                                currentProjectDate={p.endDate}
                            />
                        </CardContent>
                    </Card>

                    {/* Lien de paiement */}
                    {stripeAccountId &&
                        stripeAccountId.content[0]?.stripeAccountId && (
                            <Card className="s">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Payment className="h-5 w-5 text-muted-foreground" />
                                        Payment link
                                    </CardTitle>
                                    <CardDescription>
                                        Create a payment link for your
                                        client
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FormPayment
                                        stripeAccountId={
                                            stripeAccountId.content[0]
                                                ?.stripeAccountId
                                        }
                                        userId={session.user.id}
                                        projectId={p.id}
                                    />

                                    <Separator className="my-6" />

                                    <h3 className="text-sm font-medium mb-2">
                                        Generated links
                                    </h3>
                                    <LinksPayment
                                        linksPayment={sessionPayment.content}
                                    />
                                </CardContent>
                            </Card>
                        )}

                    {p.client && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-muted-foreground" />
                                    Client information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {p.client.name}
                                        </h3>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        asChild
                                    >
                                        <Link href={`/dashboard/clients/${p.clientId}`}>
                                            <User className="h-4 w-4 mr-2" />
                                            View client file
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
