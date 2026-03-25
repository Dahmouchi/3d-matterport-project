"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default  function Admin() {
    const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in (via localStorage for simplicity)
    const auth = localStorage.getItem("isAdmin")
    if (auth === "true") {
         router.push("/admin/dashboard")
      setIsAuthenticated(true)
    } else {
      router.push("/admin/login") // redirect if not logged in
    }
  }, [router])

  if (!isAuthenticated) return null
}