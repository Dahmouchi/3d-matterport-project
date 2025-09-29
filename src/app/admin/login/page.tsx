/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
const ADMIN_USER  = process.env.NEXT_PUBLIC_ADMIN_USER ;
const ADMIN_PASS  = process.env.NEXT_PUBLIC_ADMIN_PASS ;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();


    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-slate-900"
      style={{
        backgroundImage: "url('/images/Vector.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background: "rgba(0, 0, 0, 0.15)",
        }}
      ></div>

      {/* Floating glass orbs for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-50 animate-pulse"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
              "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-40 animate-pulse delay-1000"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
              "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full opacity-45 animate-pulse delay-500"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow:
              "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        ></div>
      </div>

      <Card
        className="max-w-md bg-slate-950 hover-lift shadow-2xl relative z-10 opacity-100 w-[126%] mx-[0] border-transparent text-white"
        
        
      >
        <CardHeader className="text-center space-y-2">
            <Link href="/" className="text-xl font-bold w-full flex items-center justify-center">
            <img
              src="/images/logov1White.png"
              alt="logo"
              className="lg:h-14 h-8 w-auto"
            />
          </Link>
          
          <CardDescription className=" font-sans text-slate-200">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-white font-sans"
              >
                Username
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-white/10 bg-white/10 rounded-none placeholder:text-white/50 text-white py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-white font-sans"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-white/40 bg-white/10 rounded-none placeholder:text-white/50 text-white py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-200"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <Button
              type="submit"
              className="w-full ripple-effect hover-lift text-white bg-blue-800 border-2 border-blue-500 font-sans font-bold py-5 transition-all duration-300 cursor-pointer rounded-none"
            >
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-white/60 font-sans">
                Welcome back
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
