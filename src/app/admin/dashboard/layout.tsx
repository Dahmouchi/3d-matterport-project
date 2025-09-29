"use client"
import React, { useEffect, useState } from 'react';
import { DystopianHeader } from '../_components/dystopian-header';
import { useRouter } from 'next/navigation';

interface AdminDashboardLayoutProps {
    children: React.ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
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
    return (
        <div className="admin-dashboard-layout  bg-slate-900 font-mono text-zinc-300 min-h-screen">
              <DystopianHeader />
            <main>
                {children}
            </main>
        </div>
    );
};

export default AdminDashboardLayout;