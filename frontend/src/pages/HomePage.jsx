import React from 'react';
import { Link } from 'react-router-dom';

// Assuming these assets are available in your project
import phoneImage from '../assets/phone.png'; // Replace with actual path
// import wifiSymbol from '../path-to-your-wifi-symbol.png'; // Replace with actual path

const HomePage = () => {
return (
    <div className="bg-black min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Heading */}
            <h1 className="text-center text-4xl sm:text-6xl md:text-7xl font-bold mt-16 sm:mt-20 md:mt-24 animate-fade-in">
                FAST RECHARGE
            </h1>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
                <Link
                    to="/input"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Airtime
                </Link>
                <Link
                    to="/input"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Data Subscription
                </Link>
                <Link
                    to="/coming-soon"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Electricity
                </Link>
                <Link
                    to="/coming-soon"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Betting
                </Link>
            </div>

            {/* Phone Image */}
            <div className="relative mt-16 flex justify-center">
                <img src={phoneImage} alt="Phone" className="w-64 sm:w-72 md:w-80" />
            </div>
        </div>
    </div>
);
};

export default HomePage;