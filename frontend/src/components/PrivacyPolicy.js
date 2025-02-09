// src/components/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-600 mt-2">
            Welcome to Digital Market! We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
          <p className="text-gray-600 mt-2">
            We collect personal information when you visit our website, create an account, make purchases, or interact with our services. The types of information we may collect include:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Personal identification details (e.g., name, email address, etc.)</li>
            <li>Payment and billing information (e.g., credit card details)</li>
            <li>Usage data (e.g., browsing activity, device information, etc.)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Information</h2>
          <p className="text-gray-600 mt-2">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>To process and manage your transactions</li>
            <li>To personalize your experience on our website</li>
            <li>To send you updates, promotions, and other communications</li>
            <li>To improve our services and website functionality</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">How We Protect Your Information</h2>
          <p className="text-gray-600 mt-2">
            We take the security of your personal information seriously and implement industry-standard measures to protect your data from unauthorized access, disclosure, or alteration.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Third-Party Services</h2>
          <p className="text-gray-600 mt-2">
            We may share your information with trusted third-party service providers to perform functions such as payment processing, data analytics, and email communication. These providers are required to maintain the confidentiality of your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
          <p className="text-gray-600 mt-2">
            You have the right to access, correct, or delete your personal information at any time. You can also opt-out of marketing communications by following the unsubscribe instructions in our emails.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Changes to This Policy</h2>
          <p className="text-gray-600 mt-2">
            We may update this Privacy Policy from time to time to reflect changes in our practices. Any changes will be posted on this page, and the effective date will be updated accordingly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions or concerns about our Privacy Policy, please contact us at: <a href="mailto:support@digitalmarket.com" className="text-blue-600">support@digitalmarket.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
