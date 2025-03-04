import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";

export default function AlertStripeAccount() {
    return (
        <Alert className="w-full flex items-center justify-between m-2">
            <AlertTitle>Vous n'avez pas de compte Stripe</AlertTitle>
            <AlertDescription> 
                <Button variant="outline" asChild className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    <Link href="/dashboard/account-stripe" className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Créer un compte Stripe
                    </Link>
                </Button>
            </AlertDescription>
        </Alert>
    );
}