import { useState } from 'react';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Manages the mobile menu's open/closed state.
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
    {/* Potential Improvements

    Accessibility: Add ARIA attributes (e.g., aria-label="Toggle menu" on the hamburger button).
    Enhanced UX: Allow closing the mobile menu by clicking outside or pressing Esc.
    Active State: Style the current page's link differently.
    Animation: Ensure animate-slide-down is defined in the CSS.
     */}
      <header className="w-full bg-gradient-to-r from-sky-500 to-sky-700 text-white text-center py-2 animate-pulse">
        🚀 Exciting Features Coming Soon! | Need Help? Contact us: +234 432 234 34232
      </header>
      <nav className="bg-black py-4 px-6 shadow-md relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="/"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Quick Recharge
          </a>
          
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
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center gap-x-8">
              <li><a className="text-white hover:text-sky-400 transition-colors duration-200" href="/">Home</a></li>
              <li><a className="text-white hover:text-sky-400 transition-colors duration-200" href="/business">Business</a></li>
              <li><a className="text-white hover:text-sky-400 transition-colors duration-200" href="/refer">Refer & Earn</a></li>
              <li><a className="text-white hover:text-sky-400 transition-colors duration-200" href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* Conditionally renders based on isLoggedIn */}
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <button
                onClick={onLogout}
                className="bg-red-600 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
          {/* Appears only when isMobileMenuOpen is true. */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 right-6 w-48 bg-black border border-gray-800 rounded-lg shadow-lg z-10 animate-slide-down">
              <ul className="flex flex-col gap-y-4 p-4">
                <li><a className="text-white hover:text-sky-400 transition-colors duration-200 block" href="/" onClick={toggleMobileMenu}>Home</a></li>
                <li><a className="text-white hover:text-sky-400 transition-colors duration-200 block" href="/business" onClick={toggleMobileMenu}>Business</a></li>
                <li><a className="text-white hover:text-sky-400 transition-colors duration-200 block" href="/refer" onClick={toggleMobileMenu}>Refer & Earn</a></li>
                <li><a className="text-white hover:text-sky-400 transition-colors duration-200 block" href="/contact" onClick={toggleMobileMenu}>Contact Us</a></li>
                {!isLoggedIn ? (
                  <>
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
                  </>
                ) : (
                  <li>
                    <button
                      onClick={() => { onLogout(); toggleMobileMenu(); }}
                      className="bg-red-600 text-white font-semibold h-10 px-4 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;