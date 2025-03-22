import React from 'react';

function ContactUs() {
  return (
    <div className="bg-custom-ivory text-custom-maroon min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 border-b-4 border-custom-yellow pb-2">Contact Us</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-custom-yellow-dark">Our Email:</h2>
          <p className="text-lg mt-2">appointment@daiv-prashna.in</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-custom-yellow-dark">Contact Number:</h2>
          <p className="text-lg mt-2">+918169916799</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-custom-yellow-dark mb-4">Our Locations:</h2>
          <div className="flex flex-col sm:flex-row gap-4 cursor-pointer">
            <p className="bg-custom-yellow text-white px-4 py-2 rounded-lg shadow-md text-center">Varanasi</p>
            <p className="bg-custom-yellow text-white px-4 py-2 rounded-lg shadow-md text-center">Lucknow</p>
            <p className="bg-custom-yellow text-white px-4 py-2 rounded-lg shadow-md text-center">Mumbai</p>
            <p className="bg-custom-yellow text-white px-4 py-2 rounded-lg shadow-md text-center">Dubai</p>
            <p className="bg-custom-yellow text-white px-4 py-2 rounded-lg shadow-md text-center">London</p>
            <p className="bg-custom-yellow text-white px-4 py-2 rounded-lg shadow-md text-center">Paris</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;