import React from 'react';

export default function SupportSection() {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#41B4E7]">
              Support Our Mission
            </h2>
            <p className="text-lg text-gray-700 max-w-lg">
              Your contribution helps provide mental health resources and
              substance abuse recovery programs to underserved communities.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdYEeHhXnoh_XTipw4A-BrZ3W2imrBtk_UdKTOeDaYI97SPiw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#41B4E7] font-medium underline hover:text-[#2f9bd2] transition"
            >
              Here is the link to make your Donation
            </a>
          </div>

          {/* Right Side (QR Code) */}
          <div className="flex justify-center">
            <img
              src="/mpesa-qr.png"
              alt="MPESA Donation QR Code"
              className="w-64 h-64 object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
