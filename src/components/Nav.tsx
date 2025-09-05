/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-3 rounded-full  lg:px-4 px-2 z-40 border-b-2 border-t-gray-200 border-t border-[#f6ba13] bg-white shadow w-11/12">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-4 gap-12">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          <img src="/images/logov1.png" alt="" className="lg:h-14 h-8 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex font-semibold">
          {["Home", "About", "How it works"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-gray-700 hover:text-black transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <Link href={"#contact"} className="hidden md:flex items-center gap-2">
          <div className="button12 text-white font-semibold rounded-full bg-gradient-to-r from-[#f6ba13] to-orange-400 px-4 py-2">
            Prendre RDV
          </div>
          <div className="button13 rounded-full bg-gradient-to-r from-[#f6ba13] to-orange-400 text-white text-center flex items-center justify-center p-2">
            <Phone />
          </div>
        </Link>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button
            className="text-black"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="#fff"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#f6ba13] to-orange-400  text-white space-y-8"
          >
            <div
              className="absolute w-full h-full top-0 bg-center z-40"
              style={{ backgroundImage: 'url("/images/Vector1.png")' }}
            ></div>

            <div className=" bg-white py-4 px-8 rounded-full z-50">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-white"
              >
                <img
                  src="/images/logov1.png"
                  alt=""
                  className="lg:h-20 h-8 w-auto"
                />
              </Link>
            </div>
            {["Home", "About", "How it works", "Contact"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="z-50 relative"
              >
                <Link
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold hover:text-orange-500 transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}

           
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
