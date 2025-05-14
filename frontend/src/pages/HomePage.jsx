import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    
  return (
      <>
   

      <h1 className="text-center mt-60 lg:text-7xl sm:text-7xl">FAST RECHARGE</h1>
      <div className="flex justify-center">
        <ul className="flex items-center gap-x-8 mt-10 ml-6">
         <a
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800"
                href="/input"
            >
          Airtime
            </a>
          <a
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800"
                href="/input"
            >
              Data Subcription
            </a>
     <a
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800"
                href="/Comingsoon"
            >
                Electricity
            </a>
     <a
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800"
                href="/Comingsoon"
            >
                Betting
            </a>

        </ul>
      </div>
    </>
  );
};

export default HomePage;