import React from "react";

export default function RefundsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Refund Policy & Dispute Resolution</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
        <p className="mb-4">
          At Speetly, we are committed to providing high-quality software services. We understand, however, that there may be situations where a refund is warranted.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Software Subscription Refunds</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>We offer a 14-day money-back guarantee for all new subscriptions.</li>
          <li>If you are unsatisfied with our service within the first 14 days after initial payment, you are eligible for a full refund.</li>
          <li>To request a refund within this period, contact our support team via email at support@speetly.com.</li>
          <li>After the 14-day period, subscriptions are non-refundable for the current billing period.</li>
        </ul>
        <p>
          For monthly subscriptions, you can cancel at any time to avoid future charges, but no partial refunds will be issued for the current billing month.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Annual Subscription Refunds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Annual subscriptions also come with a 14-day money-back guarantee.</li>
          <li>After the 14-day period, annual subscriptions may be eligible for a partial, prorated refund minus a 20% administrative fee.</li>
          <li>The prorated refund is calculated based on the remaining full months in your subscription period.</li>
          <li>Enterprise customers should refer to their service agreement for specific refund terms, as these may differ from our standard policy.</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Refund Request Procedure</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Contact our support team at support@speetly.com with the subject line "Refund Request".</li>
          <li>Include your account email address, subscription details, and the reason for your refund request.</li>
          <li>Our team will review your request and respond within 2 business days.</li>
          <li>If approved, refunds will be processed to the original payment method used for the purchase.</li>
          <li>Please allow 5-10 business days for the refund to appear in your account, depending on your payment provider's processing times.</li>
        </ol>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
        <div className="space-y-4">
          <p>
            If you have a disagreement regarding a purchase, service, or refund, we encourage you to follow our dispute resolution procedure:
          </p>
          
          <div>
            <h3 className="text-xl font-medium mb-2">1. Direct Resolution</h3>
            <p>
              Contact our customer support team directly to express your concern. Most issues can be resolved quickly at this stage.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">2. Formal Complaint</h3>
            <p>
              If you are not satisfied with the initial response, you can submit a formal complaint by email to complaints@speetly.com or through your account dashboard. We will examine your case in detail and provide a response within 5 business days.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">3. Mediation</h3>
            <p>
              If the dispute persists, we offer mediation services through an independent third party. We commit to participating in good faith in any alternative dispute resolution procedures.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">4. Legal Recourse</h3>
            <p>
              As a last resort, you retain the right to pursue legal action under the applicable laws of your jurisdiction.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Service Level Failures</h2>
        <p className="mb-4">
          In the event of service outages or failures that breach our Service Level Agreement (SLA):
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Credits may be issued according to the terms outlined in our SLA.</li>
          <li>Service credits are applied to future billing cycles and are not refundable as cash.</li>
          <li>To claim SLA credits, submit a request within 30 days of the incident.</li>
        </ul>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>
          This refund policy and dispute resolution procedure was last updated on June 1, 2023, and complies with applicable consumer protection regulations.
        </p>
      </div>
    </div>
  );
}