import React from "react";

export default function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Contact Information</h1>

            <div className="space-y-8">
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        How to Reach Us
                    </h2>
                    <p className="mb-4">
                        Our customer support team is available to assist you
                        Monday through Friday, 9 AM to 6 PM Eastern Time.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-3">
                            <h3 className="text-lg font-medium">By Email</h3>
                            <p>nicolas@speetly.com</p>
                            <p className="text-sm text-gray-500">
                                Response within 24-48 business hours
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-medium">Live Chat</h3>
                            <p>Available in your dashboard</p>
                            <p className="text-sm text-gray-500">
                                Monday to Friday, 9 AM - 6 PM ET
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Support Channels
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium">Help Center</h3>
                            <p className="mt-1">
                                Browse our extensive documentation, tutorials,
                                and FAQs at{" "}
                                <a
                                    href="https://help.speetly.com"
                                    className="text-indigo-600 hover:underline"
                                >
                                    help.speetly.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium">
                                Community Forum
                            </h3>
                            <p className="mt-1">
                                Connect with other users and our team at{" "}
                                <a
                                    href="https://community.speetly.com"
                                    className="text-indigo-600 hover:underline"
                                >
                                    community.speetly.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium">
                                Development API Support
                            </h3>
                            <p className="mt-1">
                                For technical questions regarding our API,
                                please email{" "}
                                <a
                                    href="mailto:api@speetly.com"
                                    className="text-indigo-600 hover:underline"
                                >
                                    api@speetly.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Business Address
                    </h2>
                    <address className="not-italic">
                        Speetly SAS
                        <br />
                        7 allée des Chevaux Ru
                        <br />
                        78400 Chatou
                        <br />
                        France
                    </address>
                </section>

                {/* <section className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Contact Form
                    </h2>
                    <p className="mb-4">
                        You can also reach us by filling out the form below:
                    </p>
                    <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <p className="text-center text-gray-500 italic">
                            Contact form to be integrated
                        </p>
                    </div>
                </section> */}
            </div>

            <div className="mt-12 text-sm text-gray-500">
                <p>
                    In accordance with applicable regulations, we are committed
                    to responding to all customer inquiries within a maximum of
                    2 business days.
                </p>
            </div>
        </div>
    );
}
