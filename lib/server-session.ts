import { getSession as getOriginalSession } from "@/lib/session";
import { Session } from "@/lib/types/auth-type";
import { unauthorized } from "next/navigation";

// Fonction pour obtenir la session et garantir qu'elle existe
export async function getServerSession(): Promise<Session> {
  const session = await getOriginalSession();
  
  if (!session) {
    unauthorized();
  }
  
  return session as Session;
}

// Fonction pour obtenir la session avec vérification du rôle
export async function getProtectedServerSession(allowedRoles: string[]): Promise<Session> {
  const session = await getServerSession();
  
  if (!session.user?.role || !allowedRoles.includes(session.user.role)) {
    unauthorized();
  }
  
  return session;
} 