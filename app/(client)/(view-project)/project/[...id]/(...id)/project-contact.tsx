import { Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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
                        <div className="font-medium">Your project manager</div>
                        <div className="text-sm text-muted-foreground">
                            Thomas Dupont
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <div className="font-medium">Email</div>
                        <Link
                            href="mailto:contact@speetly.com"
                            className="text-sm text-primary hover:underline"
                        >
                            contact@speetly.com
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <div className="font-medium">Phone</div>
                        <Link
                            href="tel:+33123456789"
                            className="text-sm text-primary hover:underline"
                        >
                            +33 1 23 45 67 89
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
