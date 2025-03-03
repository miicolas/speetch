import FormPayment from "./(...project)/form-payment";
import { getServerSession } from "@/lib/server-session";
import db from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

async function handleFormPayment(price: number, description: string) {
    "use server";
    
    const session = await getServerSession();
    console.log("Traitement du paiement:", price, description, "pour l'utilisateur:", session.user.id);

    const stripeAccountId = await db
        .select({ stripeAccountId: user.stripeAccountId })
        .from(user)
        .where(eq(user.id, session?.user.id));
    
    try {
        const response = await fetch(`${process.env.BETTER_AUTH_URL}/api/stripe/create-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                amount: price, 
                description, 
                userId: session.user.id,
                stripeAccountId: stripeAccountId[0].stripeAccountId
            }),
        });
        
        if (!response.ok) {
            throw new Error("Erreur lors de la création du paiement");
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur:", error);
        throw error;
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <div className="p-4">
            <div className="mb-4">
                <span className="text-sm text-gray-500">Projet: {slug}</span>
                <h1 className="text-2xl font-bold">Formulaire de paiement</h1>
            </div>
            
            <FormPayment handleFormPayment={handleFormPayment} />
        </div>
    );
}
