"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    CheckCircle,
    XCircle,
    Loader2,
    ArrowLeft,
    Home,
    RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PaymentSuccess() {
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    useEffect(() => {
        const checkPayment = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionId = urlParams.get("session_id");

            if (!sessionId) {
                setStatus("error");

                return;
            }

            try {
                const response = await fetch(
                    `/api/stripe/check-payment?session_id=${sessionId}`
                );
                const data = await response.json();

                console.log(data);

                if (data.status === "paid") {
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la vérification du paiement:",
                    error
                );
                setStatus("error");
            }
        };
        checkPayment();
    }, []);

    const handleRetry = () => {
        setStatus("loading");
        window.location.reload();
    };

    const getStatusIcon = () => {
        switch (status) {
            case "loading":
                return (
                    <div className="flex justify-center my-8">
                        <Loader2 className="h-24 w-24 text-primary animate-spin" />
                    </div>
                );
            case "success":
                return (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        className="flex justify-center my-8"
                    >
                        <CheckCircle className="h-24 w-24 text-green-500" />
                    </motion.div>
                );
            case "error":
                return (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        className="flex justify-center my-8"
                    >
                        <XCircle className="h-24 w-24 text-red-500" />
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-2 shadow-lg">
                    <CardHeader className={cn("text-center border-b")}>
                        <CardTitle className="text-2xl ">
                            {status === "loading"
                                ? "Traitement du paiement"
                                : status === "success"
                                  ? "Paiement réussi"
                                  : "Paiement échoué"}
                        </CardTitle>
                        <CardDescription className="pb-4">
                            {status === "loading"
                                ? "Merci de patienter quelques instants"
                                : status === "success"
                                  ? "Votre transaction a été complétée"
                                  : "Un problème est survenu avec votre paiement"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {getStatusIcon()}
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-4">
                        {status === "loading" ? (
                            <Button disabled className="w-full">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Veuillez patienter...
                            </Button>
                        ) : status === "success" ? (
                            <>
                                <Button
                                    className="w-full sm:w-1/2"
                                    variant="default"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    <Home className="mr-2 h-4 w-4" />
                                    Tableau de bord
                                </Button>
                                <Button
                                    className="w-full sm:w-1/2"
                                    variant="outline"
                                    onClick={() => router.push("/")}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Retour à l'accueil
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="w-full sm:w-1/2"
                                    variant="default"
                                    onClick={handleRetry}
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Réessayer
                                </Button>
                                <Button
                                    className="w-full sm:w-1/2"
                                    variant="outline"
                                    onClick={() => router.push("/")}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Retour à l'accueil
                                </Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
