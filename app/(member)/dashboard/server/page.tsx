import { getServerSession } from "@/lib/server-session";

export default async function ServerPage() {
    // Accès à la session côté serveur
    const session = await getServerSession();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Page Serveur</h1>
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-lg mb-2">
                    Cette page est un Server Component. Bonjour, {session.user.name} !
                </p>
                <p className="text-muted-foreground">
                    Données utilisateur accessibles directement côté serveur.
                    Rôle: <span className="font-medium">{session.user.role}</span>
                </p>
                
                <div className="mt-4 p-3 bg-muted rounded-md">
                    <p className="font-medium mb-1">Avantages des Server Components:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Pas besoin de hooks comme useSession</li>
                        <li>Pas de "use client" nécessaire</li>
                        <li>Récupération des données plus directe</li>
                        <li>Meilleure performance (moins de JavaScript côté client)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 