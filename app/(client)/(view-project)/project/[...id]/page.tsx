import { getProject } from "@/actions/(member)/get-project/action";
import {
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    FileText,
    User,
    Mail,
    Phone,
    CreditCard,
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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Project } from "@/lib/types/project-type";
import { getPayment } from "@/actions/(member)/get-payment/action";
import { Payment } from "@/lib/types/payment-type";
export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const projectData = await getProject({ projectId: id[0] });
    const paymentData = await getPayment({ projectId: id[0] });
    console.log(paymentData);

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
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
            </div>
        );
    }

    const p = projectData.content as Project;
    const payments = paymentData.content as Payment[];

    // Calcul du progrès du projet en fonction de son statut
    const getProgressPercentage = (status: string) => {
        switch (status) {
            case "not_started":
                return 0;
            case "pending":
                return 60;
            case "done":
                return 100;
            case "failed":
                return 30;
            default:
                return 0;
        }
    };

    const getStatusDetails = (status: string) => {
        switch (status) {
            case "not_started":
                return {
                    label: "Non démarré",
                    variant: "outline",
                    icon: Clock,
                    color: "text-gray-500",
                };
            case "pending":
                return {
                    label: "En cours",
                    variant: "secondary",
                    icon: AlertCircle,
                    color: "text-blue-500",
                };
            case "done":
                return {
                    label: "Terminé",
                    variant: "default",
                    icon: CheckCircle,
                    color: "text-green-500",
                };
            case "failed":
                return {
                    label: "Échoué",
                    variant: "destructive",
                    icon: AlertCircle,
                    color: "text-red-500",
                };
            default:
                return {
                    label: status || "Non défini",
                    variant: "outline",
                    icon: Clock,
                    color: "text-gray-500",
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

    const getPaymentMethodDetails = (method: string) => {
        switch (method) {
            case "1_payment":
                return { label: "1 paiement", variant: "default" };
            case "2_payments":
                return { label: "2 paiements", variant: "secondary" };
            case "3_payments":
                return { label: "3 paiements", variant: "destructive" };
            default:
                return { label: method, variant: "outline" };
        }
    };
    const progressPercentage = getProgressPercentage(p.status);
    const statusInfo = getStatusDetails(p.status);
    const paymentStatusInfo = getPaymentStatusDetails(
        p.paymentStatus || "pending"
    );
    const paymentMethodInfo = getPaymentMethodDetails(p.paymentMethod);
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

    // Liste fictive des étapes du projet - à remplacer par de vraies données
    const projectSteps = [
        {
            id: 1,
            name: "Briefing initial",
            completed: true,
            date: "10/05/2023",
        },
        {
            id: 2,
            name: "Conception de la maquette",
            completed: true,
            date: "25/05/2023",
        },
        {
            id: 3,
            name: "Développement",
            completed: p.status === "done" || p.status === "pending",
            date: p.status === "done" ? "15/06/2023" : "",
        },
        {
            id: 4,
            name: "Tests",
            completed: p.status === "done",
            date: p.status === "done" ? "25/06/2023" : "",
        },
        {
            id: 5,
            name: "Livraison",
            completed: p.status === "done",
            date: p.status === "done" ? "30/06/2023" : "",
        },
    ];

    return (
        <div className="container max-w-5xl mx-auto px-4 py-12">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{p.name}</h1>
                        <p className="text-muted-foreground">{p.description}</p>
                    </div>
                    <div>
                        <Badge
                            variant={
                                statusInfo.variant as
                                    | "default"
                                    | "destructive"
                                    | "outline"
                                    | "secondary"
                            }
                            className="px-3 py-1 text-sm flex items-center gap-1"
                        >
                            <StatusIcon className="h-3.5 w-3.5" />
                            <span>{statusInfo.label}</span>
                        </Badge>
                    </div>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">
                            Progression du projet
                        </CardTitle>
                        <CardDescription>
                            Suivi de l'avancement global du projet
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between mb-1">
                                <span
                                    className={`text-sm font-medium ${statusInfo.color}`}
                                >
                                    {statusInfo.label}
                                </span>
                                <span className="text-sm font-medium">
                                    {progressPercentage}%
                                </span>
                            </div>
                            <Progress
                                value={progressPercentage}
                                className="h-2"
                            />

                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    Date de livraison prévue :{" "}
                                    {formattedEndDate} ({timeDistance})
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl">
                                Détails du projet
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Montant total:
                                </span>
                                <span className="font-semibold">
                                    {p.amount} €
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Statut de paiement:
                                </span>
                                <Badge
                                    variant={
                                        paymentStatusInfo.variant as
                                            | "default"
                                            | "destructive"
                                            | "outline"
                                            | "secondary"
                                    }
                                >
                                    {paymentStatusInfo.label}
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Date de création:
                                </span>
                                <span>
                                    {p.createdAt
                                        ? new Date(
                                              p.createdAt
                                          ).toLocaleDateString("fr-FR")
                                        : "-"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Référence:
                                </span>
                                <span className="font-mono text-sm">
                                    {p.id.substring(0, 8)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl">Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <div className="font-medium">
                                        Votre gestionnaire de projet
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Thomas Dupont
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <div className="font-medium">Email</div>
                                    <a
                                        href="mailto:contact@speetly.com"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        contact@speetly.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <div className="font-medium">Téléphone</div>
                                    <a
                                        href="tel:+33123456789"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        +33 1 23 45 67 89
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">
                            Étapes du projet
                        </CardTitle>
                        <CardDescription>
                            Progression détaillée de votre projet
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-border" />
                            <div className="space-y-6">
                                {projectSteps.map((step, index) => (
                                    <div key={step.id} className="relative">
                                        <div className="flex items-start ml-8 relative">
                                            <div
                                                className={`absolute -left-9 rounded-full p-1 ${step.completed ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
                                            >
                                                {step.completed ? (
                                                    <CheckCircle className="h-5 w-5" />
                                                ) : (
                                                    <Clock className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {step.name}
                                                        </h3>
                                                        {step.date && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {step.date}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {step.completed ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-green-50 text-green-700 border-green-200"
                                                        >
                                                            Terminé
                                                        </Badge>
                                                    ) : index ===
                                                      projectSteps.findIndex(
                                                          (s) => !s.completed
                                                      ) ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-blue-50 text-blue-700 border-blue-200"
                                                        >
                                                            En cours
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-gray-50 text-gray-500 border-gray-200"
                                                        >
                                                            À venir
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Paiement du projet */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">
                            Paiement du projet
                        </CardTitle>
                        <CardDescription>
                            {p.paymentMethod === "1_payment" 
                                ? "Paiement unique" 
                                : `Paiement en ${p.paymentMethod?.charAt(0) || '1'} fois`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Montant total:
                                </span>
                                <span className="font-semibold">
                                    {p.amount} €
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Méthode de paiement:
                                </span>
                                <span className="font-semibold">
                                    {paymentMethodInfo.label}
                                </span>
                            </div>
                        </div>
                        
                        {!payments || payments.length === 0 ? (
                            <div className="text-center p-4 bg-muted rounded-md">
                                <p className="text-muted-foreground">Aucun paiement n'a encore été configuré pour ce projet.</p>
                            </div>
                        ) : (
                            <>
                                {payments.length > 1 && (
                                    <h3 className="text-sm font-medium mb-4">Échéancier de paiement</h3>
                                )}
                                
                                <div className="space-y-4">
                                    {payments.map((payment, index) => (
                                        <div key={payment.id || index} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <p className="font-medium">
                                                        {payments.length > 1 ? `Paiement ${index + 1}/${payments.length}` : 'Paiement'}
                                                    </p>
                                                    {payments.length > 1 && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {Math.round(p.amount / payments.length)} €
                                                        </p>
                                                    )}
                                                </div>
                                                <Badge
                                                    variant={payment.status === "paid" ? "default" : "secondary"}
                                                >
                                                    {payment.status === "paid" ? "Payé" : "En attente"}
                                                </Badge>
                                            </div>
                                            
                                            {payment.status !== "paid" && payment.url && (
                                                <div className="flex justify-end mt-2">
                                                    <Button size="sm" asChild>
                                                        <Link href={payment.url}>
                                                            <CreditCard className="h-4 w-4 mr-2" />
                                                            Effectuer le paiement
                                                        </Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">
                            Questions fréquentes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-medium">
                                Comment suivre l'avancement de mon projet ?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Cette page se met à jour automatiquement pour
                                refléter les derniers changements. Consultez-la
                                régulièrement pour suivre l'avancement de votre
                                projet.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-medium">
                                Comment contacter mon gestionnaire de projet ?
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Vous pouvez contacter votre gestionnaire de
                                projet par email ou par téléphone en utilisant
                                les coordonnées indiquées dans la section
                                Contact.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col md:flex-row justify-between items-center border-t pt-8 mt-8">
                    <p className="text-sm text-muted-foreground">
                        Des questions ? Contactez-nous à{" "}
                        <a
                            href="mailto:contact@speetly.com"
                            className="text-primary hover:underline"
                        >
                            contact@speetly.com
                        </a>
                    </p>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="mt-4 md:mt-0"
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Télécharger le récapitulatif
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Fonctionnalité à venir</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}
