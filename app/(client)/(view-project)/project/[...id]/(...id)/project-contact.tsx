import { Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectContact() {
    return (
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
    );
}
