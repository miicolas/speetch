
import FormPayment from "./(...project)/form-payment"
import { getServerSession } from "@/lib/server-session";
import { getStripeAccount } from "@/actions/(stripe)/get-stripe/action"
import { getProjectPayment } from "@/actions/(stripe)/get-project-payment/action"
import LinksPayment from "./(...project)/links-payment";
export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const session = await getServerSession();
    const stripeAccountId = await getStripeAccount({ userId: session.user.id }) as { content: { stripeAccountId: string }[] };
    const sessionPayment = await getProjectPayment({ userId: session.user.id }) as { content :[] };

    return (
        <div className="p-4">
            <div className="mb-4">
                <span className="text-sm text-gray-500">Projet: {slug}</span>
                <h1 className="text-2xl font-bold">Formulaire de paiement</h1>
            </div>
            
            <FormPayment stripeAccountId={stripeAccountId.content[0].stripeAccountId} userId={session.user.id} />
            <LinksPayment linksPayment={sessionPayment.content} />
        </div>
    );
}
