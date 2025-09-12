/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Vortex } from "../ui/vortex";

export default function ComingSoonSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
  };

  return (
    <section className="min-h-screen  flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#f6ba13]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f6ba13]/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Header Section */}
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 "
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#f6ba13]/20 rounded-full blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm py-4 px-16 rounded-full shadow-xl border-4 border-[#f6ba13]">
                  <img
                    src="/images/logov1white.png"
                    alt="logo"
                    className="lg:h-14 h-8 w-auto"
                  />
                </div>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance"
            >
              Coming Soon
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-00 max-w-3xl mx-auto leading-relaxed text-pretty">
                Transforming the way you build. Revolutionary solutions for
                modern construction and development. Stay tuned for innovative
                tools that will reshape your building experience.
              </p>
            </motion.div>
          </motion.div>
        
        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="max-w-md mx-auto mb-12 bg-white/10 backdrop-blur-sm border-4 border-[#f6ba13] shadow-2xl">
            <CardContent className="p-8">
              {!isSubscribed ? (
                <div>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#f6ba13]/10 to-orange-400/10 rounded-full">
                      <Mail className="w-8 h-8 text-[#f6ba13]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    Get Early Access
                  </h3>
                  <p className="text-gray-300 mb-6 text-pretty">
                    Sign up for updates and be the first to know when build360
                    launches!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-center bg-white/90 border-[#f6ba13]/30 focus:ring-[#f6ba13] focus:border-[#f6ba13] rounded-xl"
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#f6ba13] to-orange-500 hover:from-[#f6ba13]/90 hover:to-orange-500/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? "Subscribing..." : "Subscribe for Updates"}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    You&apos;re All Set!
                  </h3>
                  <p className="text-gray-600 text-pretty">
                    Thanks for subscribing! We&apos;ll keep you updated on
                    build360&apos;s progress.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
</Vortex>
        {/* Footer Section */}
      </div>
    </section>
  );
}
