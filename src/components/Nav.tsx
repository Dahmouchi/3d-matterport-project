/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          <img src="/logo.png" alt="" className="h-14 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <NavItem href="#hero">Home</NavItem>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#how-it-works">How it works</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <div
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/20 text-gray-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20 transition"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </div>

          <Button
className="bg-gradient-to-r py-4 px-8 from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white  rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"          >
            Launch Tour
          </Button>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center gap-4">
          <div
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/20 text-gray-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black/20 transition"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </div>
        <button
          className=" text-white/80 hover:text-white"
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
        <div className="flex flex-col space-y-3 px-6 pb-6 pt-2 md:hidden">
          <NavItem href="#hero" onClick={() => setOpen(false)}>
            Home
          </NavItem>
          <NavItem href="#about" onClick={() => setOpen(false)}>
            About
          </NavItem>
          <NavItem href="#how-it-works" onClick={() => setOpen(false)}>
            How it works
          </NavItem>
          <NavItem href="#contact" onClick={() => setOpen(false)}>
            Contact
          </NavItem>
          <div>
            <Button
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Launch Tour
            </Button>
          </div>
        </div>
      )}
    </motion.nav>
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
