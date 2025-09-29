/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from "@/components/ui/button"
import { Power, Settings, UserCircle } from "lucide-react"
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function DystopianHeader() {
  const pathname = usePathname()
  const router = useRouter();
  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/dashboard/projects", label: "Projects" },
    { href: "/admin/dashboard/reports", label: "Reports" },
    { href: "/admin/dashboard/backup", label: "Backup" },
  ]
  return (
    <header className="flex items-center justify-between border-b-2 border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        
         <Link href="/" className="text-xl font-bold w-full flex items-center justify-center">
            <img
              src="/images/logov1White.png"
              alt="logo"
              className="lg:h-14 h-8 w-auto"
            />
          </Link>
      </div>
      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <Button key={item.href} asChild variant="ghost" className="rounded-none uppercase">
            <Link
              href={item.href}
              className={cn(
                "transition-colors",
                pathname === item.href ? "text-zinc-100 hover:text-zinc-900" : "text-zinc-500 hover:text-zinc-900",
              )}
            >
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-none">
          <UserCircle className="h-5 w-5" />
          <span className="sr-only">User Profile</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-none">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button variant="destructive" size="icon" className="rounded-none"
        onClick={() => {
    localStorage.removeItem("isAdmin")
    router.push("/admin/login")
  }}>
          <Power className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  )
}
