import React from "react";

export default function PromotionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Promotional Terms & Conditions</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Application of Terms</h2>
        <p className="mb-4">
          These terms and conditions apply to all promotional offers, discounts, promo codes, contests, and loyalty programs (hereafter "Promotions") offered by Speetly, unless otherwise explicitly stated in the specific terms of a particular promotion.
        </p>
        <p>
          By participating in our promotions, you agree to be bound by these general terms and conditions as well as any specific conditions applicable to each promotion.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Eligibility for Promotions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Unless otherwise specified, promotions are open to individuals aged 18 or over who have the legal capacity to enter into binding contracts.</li>
          <li>Employees of Speetly, their immediate families, and anyone professionally connected with the organization or promotion are not eligible to participate.</li>
          <li>Speetly reserves the right to verify the eligibility of participants and to disqualify any person who does not comply with these terms.</li>
          <li>Some promotions may be limited to new customers or specific customer segments, as detailed in the specific offer terms.</li>
          <li>Business entities must be legally registered and in good standing to be eligible for business-specific promotions.</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Promotional Codes</h2>
        <div className="space-y-4">
          <p>
            The following conditions apply to the use of promotional codes:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Promotional codes can only be used during the specified validity period.</li>
            <li>Unless otherwise stated, promotional codes are valid for a single use per customer and cannot be combined with other offers.</li>
            <li>Promotional codes are not exchangeable for cash and cannot be transferred or sold to third parties.</li>
            <li>Certain products or subscription tiers may be excluded from promotional offers, as indicated in the specific terms.</li>
            <li>Speetly reserves the right to cancel or modify promotional codes at any time without notice in the event of technical error, human error, or fraud.</li>
            <li>Promotional discounts typically apply to the first billing cycle only, unless explicitly stated as applying to the lifetime of the subscription.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Free Trials</h2>
        <div className="space-y-4">
          <p>
            For free trial offers:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Free trials are typically limited to one per customer or business entity.</li>
            <li>A valid payment method is usually required to start a free trial, but you will not be charged until the trial period ends.</li>
            <li>You can cancel your subscription at any time during the trial period to avoid being charged.</li>
            <li>Some features or usage limits may be restricted during the trial period.</li>
            <li>Speetly reserves the right to modify or terminate free trial offers at any time.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Referral Programs</h2>
        <div className="space-y-4">
          <p>
            For our customer referral program:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Referral rewards are issued only when the referred customer signs up using your unique referral link and completes the qualifying action (e.g., subscribing to a paid plan).</li>
            <li>Both the referrer and the referred customer must have active, paid accounts in good standing at the time the reward is issued.</li>
            <li>Referral credits typically expire after 12 months if not used.</li>
            <li>Self-referrals or creating multiple accounts to earn referral bonuses is prohibited.</li>
            <li>Speetly reserves the right to modify, suspend, or terminate the referral program with a 30-day notice period.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Beta Program Terms</h2>
        <div className="space-y-4">
          <p>
            For participation in our beta programs:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Beta features are provided "as is" without warranty of any kind.</li>
            <li>Beta participants agree to provide feedback when requested.</li>
            <li>Beta features may be modified, suspended, or discontinued at any time without notice.</li>
            <li>Data entered during the beta period may not be preserved when the feature moves to general availability.</li>
            <li>Beta participants may be subject to non-disclosure agreements regarding unreleased features.</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
        <p className="mb-4">
          Personal data collected as part of promotions is processed in accordance with our privacy policy. This data may be used to administer the promotion, contact participants, and award benefits.
        </p>
        <p>
          For certain promotions, with your explicit consent, your data may be used for marketing purposes as specified in the specific terms.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">General Provisions</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Speetly reserves the right to modify or cancel any promotion at any time in the event of exceptional circumstances beyond its control.</li>
          <li>Any attempt to circumvent, hack, or abuse the systems or rules of promotions will result in immediate disqualification.</li>
          <li>Speetly's decision regarding any aspect of promotions is final, and no correspondence will be entered into regarding this matter.</li>
          <li>In case of dispute, the laws of the State of Delaware shall apply, and the courts of Delaware shall have exclusive jurisdiction.</li>
        </ul>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>
          These promotional terms and conditions were last updated on June 1, 2023. Speetly reserves the right to modify them for legal or operational reasons.
        </p>
      </div>
    </div>
  );
}