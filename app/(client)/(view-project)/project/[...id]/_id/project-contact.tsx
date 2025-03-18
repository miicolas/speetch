import { Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function ProjectContact({ projectContact }: { projectContact: any }) {
    console.log(projectContact, "projectContact");

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
                            {projectContact.name}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <div className="font-medium">Email</div>
                        <Link
                            href={`mailto:${projectContact.email}`}
                            className="text-sm text-primary hover:underline"
                        >
                            {projectContact.email}
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
