import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mantine/core";
import Logo from "../../../public/Logo.jpeg";

function Login() {
  return (
    <section className="py-10 bg-gray-200 sm:py-16 lg:py-24 h-screen flex items-center justify-center">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl mx-auto text-center"></div>
        <div className="relative max-w-md mx-auto mt-8 md:mt-16">
          <div
            className="overflow-hidden rounded-lg shadow-xl"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: "0.5rem",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form action="#" method="POST">
                <div className="space-y-5 text-center">
                  <h2
                    className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl"
                    style={{ fontFamily: "Your Cool Font, sans-serif" }}
                  >
                    مہدی حسن
                  </h2>
                  <div className="flex items-center justify-center">
                    <a
                      href="https://mehdihasansherwani.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="w-24 h-24 lg:w-60 lg:h-60 py-1 rounded-full"
                        src={Logo.src}
                        alt="Logo"
                      />
                    </a>
                  </div>
                  <h2 className="text-xl font-bold leading-tight text-gray-500 sm:text-1xl">
                    Sign In To continue to Dashboard
                  </h2>
                  <Link href="/sign-in" legacyBehavior>
                    <a className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                      Sign In
                    </a>
                  </Link>
                  ;
                  <div className="text-center">
                    <p className="text-base text-gray-600"></p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
