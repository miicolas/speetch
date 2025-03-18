"use client";

import { Button } from "@/components/ui/button";

interface CreateStripeAccountButtonProps {
  userEmail?: string;
  userName?: string;
}

export default function CreateStripeAccountButton({ userEmail, userName }: CreateStripeAccountButtonProps) {
  const handleCreateAccount = async () => {
    try {
      const res = await fetch("/api/stripe/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, name: userName }), 
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte Stripe:", error);
      alert("Une erreur est survenue lors de la création du compte");
    }
  };

  return (
    <Button
      onClick={handleCreateAccount}
      className="mt-4"
      disabled={!userEmail}
    >
      Créer un compte Stripe
    </Button>
  );
} 
