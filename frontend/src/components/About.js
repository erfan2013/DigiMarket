import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="max-w-screen-lg mx-auto py-12 px-6 sm:px-12">
        {/* Heading Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-blue-600 mb-4">About Us</h1>
          <p className="text-lg text-gray-600">We are dedicated to empowering businesses in the digital world.</p>
        </header>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At Digital Market, our mission is to help businesses of all sizes leverage digital marketing strategies
            to grow and succeed. Whether you're looking to improve your online presence, generate more leads, or convert
            traffic into sales, we provide tailored solutions that deliver results.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Innovation</h3>
              <p className="text-gray-600">We embrace new ideas and technologies to stay ahead of trends.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Integrity</h3>
              <p className="text-gray-600">We maintain transparency and honesty in all our interactions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Customer-Centricity</h3>
              <p className="text-gray-600">Our clients' needs are at the heart of everything we do.</p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700">
            Founded in 2015, Digital Market started with the goal of bridging the gap between businesses and the digital world. 
            With a passionate team of marketers, designers, and developers, we have helped hundreds of brands establish their 
            digital footprint and achieve measurable results.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-56 bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="w-56 bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Lead Designer</p>
            </div>
            <div className="w-56 bg-white p-6 rounded-lg shadow-lg">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">Mark Johnson</h3>
              <p className="text-gray-600">Marketing Specialist</p>
            </div>
          </div>
        </section>

        {/* Contact Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-6">
            Ready to take your business to the next level? Contact us today, and let's start a conversation!
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;