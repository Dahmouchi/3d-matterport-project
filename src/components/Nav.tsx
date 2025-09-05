/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-3 rounded-full lg:px-4 px-2 z-40 border-b-2 border-t-gray-200 border-t border-[#f6ba13] bg-white shadow w-11/12  ">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-4  gap-12">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          <img src="/images/logov1.png" alt="" className="lg:h-14 h-8 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex font-semibold">
          <motion.a
            href={"#hero"}
            className="text-gray-700 hover:text-black transition-colors duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-400 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
          <motion.a
            href={"#about"}
            className="text-gray-700 hover:text-black transition-colors duration-200 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-400 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
          <motion.a
            href={"#how-it-works"}
            className="text-gray-700 hover:text-black transition-colors duration-200 relative group"
          >
            How it works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-400 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <div className="button12 text-white font-semibold rounded-full bg-gradient-to-r from-[#f6ba13] to-orange-400 ">
            Prendre RDV
          </div>
          <div className="button13 rounded-full bg-gradient-to-r from-[#f6ba13] to-orange-400  text-white text-center flex items-center justify-center">
            <Phone />
          </div>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className=" text-black hover:text-black"
            onClick={() => setOpen(!open)}
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
                fill="none"
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
      {open && (
        <div className="flex flex-col space-y-3 px-6 pb-6 pt-2 md:hidden text-black">
          <Link href="#hero" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="#about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="#how-it-works" onClick={() => setOpen(false)}>
            How it works
          </Link>
          <Link href="#contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Launch Tour
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-white/70 transition hover:text-white"
    >
      {children}
    </Link>
  );
}
