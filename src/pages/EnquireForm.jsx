import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import image from "../assets/login1.webp"; // Adjust the path if needed
import VerifiedPage from "./VerifiedPage"; // Import your VerifiedPage component

const EnquireForm = () => {
   const location = useLocation();
  const navigate = useNavigate();
  const serviceName = location.state?.serviceName || "Service";

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <VerifiedPage />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#55848d] to-[#a94c4c] flex items-center justify-center">
      <div className="flex w-[800px] max-w-[95%] rounded-lg shadow-lg overflow-hidden bg-white">
        {/* Image Section */}
        <div className="relative w-1/2 bg-[url('/image/login1.webp')] bg-cover bg-center hidden sm:block">
          <img src={image} alt="" />
          <div className="absolute bottom-0 bg-black/50 text-white text-sm p-4">
            {`Thanks for choosing ${serviceName}. Please tell us more about your needs.`}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-8 relative">
          <div
            className="absolute top-2 right-4 text-gray-500 text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            &times;
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Enquire About {serviceName}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Fill out the form and our team will get back to you with the right
            solution.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Last Name"
                required
                className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="First Name"
                required
                className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
            <textarea
              placeholder={`Message about ${serviceName}`}
              required
              className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none h-20"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#1ebddd] to-[#ea2473] text-white font-bold text-base rounded-md"
            >
              Submit Enquiry →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnquireForm;
