"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-lg">
      <header className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-12">
            <a
              href="https://mehdihasansherwani.com/"
              title=""
              className="flex items-center"
            >
              <img
                className="w-auto h-16 transition duration-300 ease-in-out transform hover:scale-110 rounded-full mr-2"
                src="/Logo.jpeg"
                alt="Mehdi Hasan Tailors Logo"
              />

              <h2
                className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "Your Cool Font, sans-serif" }}
              >
                مہدی حسن
              </h2>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            <a
              href="/dashboard"
              title=""
              className="text-xl font-semibold text-gray-700 transition duration-300 ease-in-out hover:text-indigo-600 focus:text-indigo-600 focus:outline-none"
            >
              Client Measurement
            </a>
            <a
              href="/dashboard/records"
              title=""
              className="text-xl font-semibold text-gray-700 transition duration-300 ease-in-out hover:text-indigo-600 focus:text-indigo-600 focus:outline-none"
            >
              Client Records
            </a>
            <UserButton afterSignOutUrl="/"></UserButton>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                Client Measurement
              </a>
              <a
                href="/dashboard/records"
                className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                Client Records
              </a>
              <UserButton afterSignOutUrl="/"></UserButton>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;
