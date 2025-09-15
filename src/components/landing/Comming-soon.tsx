/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Volume2, VolumeX, Facebook,
  Instagram,
  Linkedin,
  } from "lucide-react"
import axios from "axios"
import { motion } from "framer-motion";

export default function MinimalistComingSoon() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitted(true)
    e.preventDefault()
    if (!email) return
    try {
      const response = await axios.post("/api/sheets", { email })
      if (response.status === 200) {
        setIsSubmitted(false)
        setEmail("")
      } else {
        alert("Failed to submit the form.")
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred.")
    }
  }
  
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://web.facebook.com/profile.php?id=61580337640595", name: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/build360.ma/", name: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "http://linkedin.com/company/build360-ma", name: "LinkedIn" },
  ];
  return (
    <div className="h-screen overflow-y-hidden bg-gray-900">
 
      <div className="flex justify-between lg:flex-row flex-col lg:items-start items-center px-12 py-4">
        <div>
          <div className="flex items-center gap-4">
            <img src="/images/logov1white.png" alt="Build360 Logo" width={60} height={60} className="rounded-lg h-16 w-auto" />
          </div>
        </div>

        <h1 className="text-lg md:text-3xl font-medium lg:block hidden uppercase">
          Something  exciting
          <br />
          <span className="flex items-center"> is coming <div className="px-4 rounded-full bg-amber-400 py-2 mx-2"> <ArrowRight className="w-5 h-5 -rotate-45" /></div></span>
         
        </h1>
      </div>

      <div className="relative overflow-hidden py-4 border-t border-b border-gray-800 bg-gradient-to-br  from-amber-400 to-orange-500 flex justify-center w-full">
        <div className="flex justify-between items-center w-xl lg:px-0 px-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-white border-2 border-gray-500 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row  ">
        {/* Left side - Email form */}
         <div className="lg:w-1/2 flex flex-col max-w-3xl px-10  gap-8 lg:items-start mt-12 lg:mt-0 lg:text-left items-center lg:justify-center justify-between text-center">
         
            <div className="lg:border-l-4 border-amber-400 lg:pl-4 text-white space-y-3">
              <h1 className="lg:text-7xl text-3xl font-bold uppercase">Coming soon</h1>
              <h1 className="text-slate-200 text-xl">We are here, to make <span className="font-bold text-amber-400 uppercase">your space </span>look <span className="font-bold text-amber-400">ALIVE</span></h1>
            </div>
          {/*<h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            SOMETHING EXCITING 
            <br />
            IS COMING
          </h1>

          

          Left Side - Content */} <form onSubmit={handleSubmit} className="flex w-2/3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 lg:w-2/3 w-full px-4 py-4 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#f6ba13] transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-4 bg-white border border-gray-300 text-black hover:bg-black hover:text-white transition-colors flex items-center justify-center"
              disabled={isSubmitted}
            >
              {isSubmitted ? <span className="text-sm">✓</span> : <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {isSubmitted && (
            <p className="text-[#f6ba13] text-sm mt-4 font-medium">
              Thank you! We&apos;ll keep you updated.
            </p>
          )}
        </div>

        {/* Right side - Image */}
        <div className=" relative flex items-center justify-center  lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="/images/steps/test1.png"
            alt="Modern workspace showcasing Build360"
            className="w-2/3 h-auto"
            
          />
        </div>
      </div>

     
    </div>
  )
}