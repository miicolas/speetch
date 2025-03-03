import React from "react";

export default function CancellationPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Cancellation Policy</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          At Speetly, we understand that your business needs may change over time. Our cancellation policy is designed to be transparent and fair, providing flexibility while maintaining business predictability.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Subscription Cancellation</h2>
        <div className="space-y-4">
          <p>
            You can cancel your subscription at any time, subject to the following conditions:
          </p>
          
          <div>
            <h3 className="text-lg font-medium">Monthly Subscriptions</h3>
            <p>
              Monthly subscriptions can be canceled at any time. Cancellation will take effect at the end of the current billing period. No partial refunds are provided for unused days in the current month.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Annual Subscriptions</h3>
            <p>
              Annual subscriptions can be canceled with a partial refund calculated on a prorated basis, minus a 20% administrative fee. Please refer to our <a href="/policies/refunds" className="text-indigo-600 hover:underline">Refund Policy</a> for more details.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Trial Period</h3>
            <p>
              If you cancel during the free trial period, no charges will be made to your account.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Enterprise Plan Cancellation</h2>
        <p className="mb-4">
          For Enterprise customers:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancellation terms are specified in your service agreement.</li>
          <li>Typically, a 30-day written notice is required before cancellation takes effect.</li>
          <li>Early termination fees may apply as outlined in your contract.</li>
          <li>Please contact your account manager to discuss cancellation procedures specific to your agreement.</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Retention After Cancellation</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>After subscription cancellation, your account will be deactivated and you will no longer have access to our services.</li>
          <li>Your data will be retained for 30 days after cancellation, during which time you can request a data export.</li>
          <li>After 30 days, your data will be permanently deleted from our active systems.</li>
          <li>Backup archives may retain your information for up to 90 days after deletion from active systems, after which it will be permanently removed from all our systems.</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Cancel</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Log in to your account and navigate to "Subscription Settings" in your account dashboard.</li>
          <li>Click on the "Cancel Subscription" button and follow the prompts to confirm your cancellation.</li>
          <li>Alternatively, contact our support team at support@speetly.com with your account details.</li>
          <li>Enterprise customers should contact their account manager directly.</li>
        </ol>
        <p className="mt-4">
          Upon cancellation, you will receive an email confirmation of your cancellation request with the effective end date of your subscription.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Account Reactivation</h2>
        <p className="mb-4">
          If you decide to return to Speetly after cancellation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You can reactivate your account within 30 days of cancellation without data loss.</li>
          <li>After 30 days, you will need to create a new account, and your previous data will no longer be available.</li>
          <li>Promotional pricing from your original subscription may not be available upon reactivation.</li>
        </ul>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>
          This cancellation policy was last updated on June 1, 2023. Speetly reserves the right to modify these terms with a 30-day notice period.
        </p>
      </div>
    </div>
  );
}