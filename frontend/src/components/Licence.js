// src/components/Licensing.jsx
import React from 'react';

const Licensing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">License Agreement</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          <p className="text-gray-600 mt-2">
            Welcome to Digital Market! By purchasing or using our products and services, you agree to comply with the terms of this licensing agreement.
            Please read this agreement carefully before using our digital products. This agreement governs your use of the licensed products and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">License Grant</h2>
          <p className="text-gray-600 mt-2">
            Upon purchasing a digital product from Digital Market, you are granted a non-exclusive, non-transferable, and revocable license to use the product under the following terms:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>You may use the product for personal or commercial purposes, depending on the type of license you have purchased.</li>
            <li>You may not sell, distribute, or sublicense the product to third parties without our express permission.</li>
            <li>You may not reverse-engineer, decompile, or otherwise alter the product in any way.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">License Types</h2>
          <p className="text-gray-600 mt-2">
            Digital Market offers several types of licenses for our products:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li><strong>Personal Use License:</strong> This license allows you to use the product for personal, non-commercial purposes only.</li>
            <li><strong>Commercial Use License:</strong> This license grants you the right to use the product for commercial purposes, including for profit-making activities.</li>
            <li><strong>Extended License:</strong> This license allows you to use the product in a wide range of applications, including sublicensing to clients and reselling.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Prohibited Uses</h2>
          <p className="text-gray-600 mt-2">
            The following uses of our digital products are strictly prohibited:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Reselling or redistributing the product in any form.</li>
            <li>Using the product in any way that infringes on the intellectual property rights of others.</li>
            <li>Using the product for unlawful purposes or in violation of applicable laws.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Intellectual Property</h2>
          <p className="text-gray-600 mt-2">
            All digital products and content available for purchase on Digital Market are the intellectual property of their respective creators or Digital Market. You are granted a license to use the product as specified in this agreement, but you do not own the product.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Term and Termination</h2>
          <p className="text-gray-600 mt-2">
            The term of this license begins on the date of your purchase and continues indefinitely unless terminated by either party. We reserve the right to terminate your license if you violate any terms of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Limitation of Liability</h2>
          <p className="text-gray-600 mt-2">
            Digital Market will not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the product. Our liability is limited to the amount you paid for the product.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Governing Law</h2>
          <p className="text-gray-600 mt-2">
            This agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which Digital Market operates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions or concerns regarding the terms of this licensing agreement, please contact us at: <a href="mailto:support@digitalmarket.com" className="text-blue-600">support@digitalmarket.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Licensing;
