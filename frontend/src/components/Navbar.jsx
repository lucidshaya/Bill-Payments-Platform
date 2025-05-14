import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
   

    <nav className="bg-black py-4 px-6 shadow-md relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        {/* Logo / Brand Section */}
        <a
          href="/docs/installation"
          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800"
        >
          Quick Recharge
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center gap-x-8">
            <li>
              <a
                className="text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200"
                href="/blog"
              >
                Business
              </a>
            </li>
            <li>
              <a
                className="text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200"
                href="/blog"
                >
                Refer and Earn
              </a>
            </li>
            <li>
              <a
                className="text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200"
                href="/blog"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/login"
            className="border border-white text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-white text-black font-semibold h-12 px-6 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-6 w-48 bg-black border border-gray-800 rounded-lg shadow-lg z-10">
            <ul className="flex flex-col gap-y-4 p-4">
              <li>
                <a
                  className="text-white hover:text-sky-500 transition-colors duration-200 block"
                  href="/blog"
                  onClick={toggleMobileMenu}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-sky-500 transition-colors duration-200 block"
                  href="/blog"
                  onClick={toggleMobileMenu}
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-sky-500 transition-colors duration-200 block"
                  href="/blog"
                  onClick={toggleMobileMenu}
                  >
                  Refer and Earn
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:text-sky-500 transition-colors duration-200 block"
                  href="/blog"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  className="border border-white text-white font-semibold h-10 px-4 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-200 mt-2"
                  href="/login"
                  onClick={toggleMobileMenu}
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  className="bg-white text-black font-semibold h-10 px-4 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                  href="/signup"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
                  
                
  );
};

export default Navbar;