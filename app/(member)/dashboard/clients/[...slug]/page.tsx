import { getServerSession } from "@/lib/server-session";
import { getClient } from "@/actions/(member)/get-client/action";
import { getProjects } from "@/actions/(member)/get-projects/action";
import { getStripeAccount } from "@/actions/(stripe)/get-stripe/action";
import { getProjectPayment } from "@/actions/(stripe)/get-project-payment/action";
import { Client } from "@/lib/types/client-type";
import { Project } from "@/lib/types/project-type";
import Link from "next/link";
import {
    Building,
    ChevronLeft,
    Mail,
    Phone,
    MapPin,
    FileText,
    FileCog,
    Globe,
    User,
    Briefcase,
    AlertCircle,
    Pencil,
    Trash2,
    CreditCard as Payment,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { DataTable } from "../_clients/table-client/data-table";
import { columns } from "./_client/project-columns";

export default async function ClientPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const session = await getServerSession();
    const clientData = await getClient({ clientId: slug[0] });
    const stripeAccountId = (await getStripeAccount({
        userId: session.user.id,
    })) as { content: { stripeAccountId: string }[] };

    if (!clientData || clientData.status === "error" || !clientData.content) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl font-bold">Client not found</h1>
                <p className="text-muted-foreground mt-2">
                    The client you are looking for does not exist or you do not
                    have access to it.
                </p>
                <Button className="mt-4" variant="outline" asChild>
                    <Link href="/dashboard/clients">Back to clients</Link>
                </Button>
            </div>
        );
    }

    const c = clientData.content as Client;

    const projectsData = await getProjects({ userId: session?.user.id });
    const clientProjects = (projectsData.content as Project[]).filter(
        (project) => project.clientId === c.id
    );

    const clientPayments = (await getProjectPayment({
        userId: session.user.id,
    })) as {
        content: {
            url: string;
            status: string;
            projectId: string;
            createdAt: string;
            amount: number;
        }[];
    };

    const clientProjectIds = clientProjects.map((project) => project.id);
    const filteredPayments = clientPayments.content.filter((payment) =>
        clientProjectIds.includes(payment.projectId)
    );

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Link
                        href="/dashboard/clients"
                        className="hover:text-foreground flex items-center"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to clients
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h1 className="text-3xl font-bold">{c.name}</h1>
                    <Badge
                        variant={c.type === "company" ? "default" : "secondary"}
                        className="ml-2 px-2 py-1 text-xs"
                    >
                        {c.type === "company" ? "Entreprise" : "Particulier"}
                    </Badge>
                </div>

                <div className="flex flex-col gap-2 md:self-start">
                    <Button className="w-full" asChild>
                        <Link href={`/dashboard/clients/${c.id}/edit`}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit client
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
                            <DropdownMenuItem asChild>
                                <Link
                                    href={`/dashboard/projects/create?client=${c.id}`}
                                >
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Create project
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete client
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
                                <Building className="h-5 w-5 text-muted-foreground" />
                                Detailed information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Contact
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <span>{c.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{c.phone}</span>
                                        </div>
                                        {c.website && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4 text-muted-foreground" />
                                                <a
                                                    href={c.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    {c.website}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        Address
                                    </h3>
                                    <div className="space-y-1">
                                        <p>{c.address}</p>
                                        <p>
                                            {c.zip} {c.city}
                                        </p>
                                        <p>{c.state}</p>
                                        <p>{c.country}</p>
                                    </div>
                                </div>

                                {c.vatNumber && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            VAT number
                                        </h3>
                                        <p>{c.vatNumber}</p>
                                    </div>
                                )}

                                {c.contactName && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            Main contact
                                        </h3>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span>
                                                    {c.contactName}
                                                    {c.contactPosition
                                                        ? ` - ${c.contactPosition}`
                                                        : ""}
                                                </span>
                                            </div>
                                            {c.contactEmail && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <span>
                                                        {c.contactEmail}
                                                    </span>
                                                </div>
                                            )}
                                            {c.contactPhone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <span>
                                                        {c.contactPhone}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {c.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-line leading-relaxed">
                                    {c.notes}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-muted-foreground" />
                                Associated projects
                            </CardTitle>
                            {clientProjects.length > 0 && (
                                <CardDescription>
                                    {clientProjects.length} project(s) associated
                                    with this client
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            {clientProjects.length > 0 ? (
                                <div className="overflow-hidden">
                                    <DataTable
                                        data={clientProjects}
                                        columns={columns}
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-6 border rounded-md">
                                    <p className="text-muted-foreground">
                                        No projects associated with this client
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-4"
                                        asChild
                                    >
                                        <Link
                                            href={`/dashboard/projects/create?client=${c.id}`}
                                        >
                                            <Briefcase className="h-4 w-4 mr-2" />
                                            Create project
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="aspect-video bg-muted flex items-center justify-center">
                                <iframe
                                    title="Client map"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                        `${c.address}, ${c.zip} ${c.city}, ${c.country}`
                                    )}&output=embed`}
                                    allowFullScreen
                                    aria-hidden="false"
                                    tabIndex={0}
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                Quick actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <Button
                                variant="outline"
                                asChild
                                className="justify-start"
                            >
                                <Link
                                    href={`/dashboard/projects/create?client=${c.id}`}
                                >
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Create project
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="justify-start"
                            >
                                <Link href={`mailto:${c.email}`}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send email
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="justify-start"
                            >
                                <Link href={`tel:${c.phone}`}>
                                    <Phone className="h-4 w-4 mr-2" />
                                    Call
                                </Link>
                            </Button>
                            {c.website && (
                                <Button
                                    variant="outline"
                                    asChild
                                    className="justify-start"
                                >
                                    <a
                                        href={c.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Globe className="h-4 w-4 mr-2" />
                                        Visit website
                                    </a>
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                                Reminder
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Client ajouté le{" "}
                                {c.createdAt
                                    ? new Date(c.createdAt).toLocaleDateString(
                                          "fr-FR"
                                      )
                                    : "date inconnue"}
                            </p>
                            {c.updatedAt && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    Last update on{" "}
                                    {new Date(c.updatedAt).toLocaleDateString(
                                        "fr-FR"
                                    )}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {stripeAccountId &&
                        stripeAccountId.content[0]?.stripeAccountId &&
                        filteredPayments.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Payment className="h-5 w-5 text-muted-foreground" />
                                        Payment links
                                    </CardTitle>
                                    <CardDescription>
                                        {filteredPayments.length} payment links
                                        generated
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {filteredPayments.map(
                                            (payment, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3 border rounded-md"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-medium">
                                                                {payment.amount}{" "}
                                                                €
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {new Date(
                                                                    payment.createdAt
                                                                ).toLocaleDateString(
                                                                    "fr-FR"
                                                                )}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <a
                                                                href={
                                                                    payment.url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                See
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                </div>
            </div>
        </div>
    );
}
