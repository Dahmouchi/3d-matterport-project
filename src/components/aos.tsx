"use client"

import { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
   AOS.init({
    offset: 0, // Offset (in px) from the original trigger point
    delay: 0, // Values from 0 to 3000, with step 50ms
    duration: 500, // Values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // Default easing for AOS animations
    once: false, // Whether animation should happen only once
    mirror: true, // Whether elements should animate out while scrolling past them
     startEvent: 'DOMContentLoaded',
  });
  }, [])

  return null
}