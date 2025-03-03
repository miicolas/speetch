import React from "react";

export default function RestrictionsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Legal and Export Restrictions</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">General Restrictions</h2>
        <p className="mb-4">
          Speetly is committed to complying with all applicable national and international laws and regulations. The use of our software and services is subject to certain legal restrictions that all users must adhere to.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Age Restrictions</h2>
        <p className="mb-4">
          Our services are intended for users who are 18 years of age or older. In some cases, users aged 16-18 may access our services with the consent of a parent or legal guardian.
        </p>
        <p>
          Account administrators are responsible for ensuring that all users within their organization comply with these age requirements.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Geographic Restrictions</h2>
        <p className="mb-4">
          Our software and services are primarily designed for use in the United States, Canada, the European Union, the United Kingdom, Australia, and New Zealand, and may not be available or appropriate for use in other countries or jurisdictions.
        </p>
        <p className="mb-4">
          Speetly does not guarantee that its services are available or appropriate for use in locations other than those listed above. Access to our services from territories where their content is illegal is strictly prohibited.
        </p>
        <p>
          Users are responsible for complying with all applicable local regulations in their jurisdiction.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Export Restrictions</h2>
        <p className="mb-4">
          Our software and services may be subject to export control laws and regulations of the United States, the European Union, and other countries. You agree to comply with all such laws and regulations and acknowledge that you have the responsibility to obtain any licenses necessary to export, re-export, transfer, or import our software or services.
        </p>
        <p className="mb-4">
          Without limitation to the foregoing, you may not export or re-export our software or services:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To any country embargoed or sanctioned by the U.S., E.U., or U.N.</li>
          <li>To any person or entity on any sanctions or restricted trade list.</li>
          <li>For any prohibited military or nuclear end-use.</li>
          <li>For any activity related to weapons of mass destruction, including chemical or biological weapons, or missiles.</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usage Restrictions</h2>
        <p className="mb-4">
          You agree not to use our software and services for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Any illegal or fraudulent activity.</li>
          <li>Harassing, abusing, or harming others.</li>
          <li>Distributing malware or compromising software.</li>
          <li>Attempting to gain unauthorized access to our systems or networks.</li>
          <li>Violating others' intellectual property rights.</li>
          <li>Circumventing any security measures.</li>
          <li>Mining cryptocurrency or performing other computationally intensive operations unrelated to the intended use of our platform.</li>
          <li>Reverse engineering, decompiling, or disassembling our software.</li>
          <li>Scraping, data mining, or automated collection of information from our services without our explicit permission.</li>
          <li>Reselling, sublicensing, or redistributing our services without proper authorization.</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">API Usage Restrictions</h2>
        <p className="mb-4">
          When using our API:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must adhere to any rate limits and quotas we establish.</li>
          <li>You may not share your API credentials with third parties.</li>
          <li>You must maintain reasonable security measures to protect your access keys.</li>
          <li>You may not use the API in a manner that imposes an unreasonable load on our infrastructure.</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Compliance and Enforcement</h2>
        <p className="mb-4">
          Speetly reserves the right to suspend or terminate access to services for any user who does not comply with these legal and export restrictions.
        </p>
        <p className="mb-4">
          In case of violation, the user may be held responsible for any damages caused and may face legal action in accordance with applicable laws.
        </p>
        <p>
          For any questions regarding these restrictions, please contact our legal department at legal@speetly.com.
        </p>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>
          These legal and export restrictions were last updated on June 1, 2023, and may be modified to remain compliant with evolving international laws and regulations.
        </p>
      </div>
    </div>
  );
}