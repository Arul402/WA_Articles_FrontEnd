import React from "react";
import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-500 flex flex-col justify-center items-center text-white">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Whiture Applications Article's</h1>

      {/* Subheading */}
      <p className="text-lg mb-12 text-center max-w-2xl">
        Explore our collection of articles or manage content as an admin. Choose your path below.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Admin Button */}
        <Link
          to="/admin"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 text-xl font-semibold flex items-center justify-center"
        >
          Go to Admin
        </Link>

        {/* Article Button */}
        <Link
          to="/home"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 text-xl font-semibold flex items-center justify-center"
        >
          Explore Articles
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;