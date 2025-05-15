import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaInternetExplorer, FaBolt, FaDice, FaSignal } from 'react-icons/fa';

// Assuming this asset is available in your project
import phoneImage from '../assets/phone.png'; // Replace with actual path

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Heading */}
        <h1 className="text-center text-4xl sm:text-6xl md:text-7xl font-bold mt-16 sm:mt-20 md:mt-24 animate-fade-in">
          FAST RECHARGE
        </h1>

        {/* Buttons with Icons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link
            to="/input"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaPhone className="mr-2" aria-hidden="true" />
            Airtime
          </Link>
          <Link
            to="/input"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaInternetExplorer className="mr-2" aria-hidden="true" />
            Data Subscription
          </Link>
          <Link
            to="/coming-soon"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaBolt className="mr-2" aria-hidden="true" />
            Electricity
          </Link>
          <Link
            to="/coming-soon"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaDice className="mr-2" aria-hidden="true" />
            Betting
          </Link>
        </div>

        {/* Phone and Signal Icon */}
        <div className="relative mt-16 flex justify-center">
          <img src={phoneImage} alt="Phone" className="w-64 sm:w-72 md:w-80" />
          <FaSignal
            className="absolute -top-4 -left-4 text-blue-500 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;