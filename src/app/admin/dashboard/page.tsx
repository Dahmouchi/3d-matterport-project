/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Cpu,
  Filter,
  Search,
  Server,
  Users,
} from "lucide-react";
import { DystopianHeader } from "../_components/dystopian-header";
import { StatCard } from "../_components/stat-card";
import { ChartCard } from "../_components/chart-card";
import { ControlPanel } from "../_components/control-panel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MockData } from "@/app/types/dashboard";
import mockDataJson from "@/lib/mock.json";

import { LogFeed } from "../_components/log-feed";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import Widget from "../_components/Widget";
interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType?: string;
  message?: string;
  city?: string;
  objectives?: string;
  surface?: string;
  link?: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}



const fetcher = (url: string) => fetch(url).then((res) => res.json());

const mockData = mockDataJson as MockData;

export default function AdminPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const API_BASE = process.env.NEXT_PUBLIC_API_KEY;

  const {
    data: reservations,
    error,
    isLoading,
    mutate,
} = useSWR<Reservation[]>(`${API_BASE}/api/reservations`, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  });
  useEffect(() => {
    // Check if user is logged in (via localStorage for simplicity)
    const auth = localStorage.getItem("isAdmin");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/admin/login"); // redirect if not logged in
    }
  }, [router]);
  const statusCounts = reservations
    ? {
        PENDING: reservations.filter((r) => r.status === "PENDING").length,
        CONFIRMED: reservations.filter((r) => r.status === "CONFIRMED").length,
        REJECTED: reservations.filter((r) => r.status === "REJECTED").length,
        COMPLETED: reservations.filter((r) => r.status === "COMPLETED").length,
      }
    : { PENDING: 0, CONFIRMED: 0, REJECTED: 0, COMPLETED: 0 };

  const chartData = reservations
    ? (() => {
        const monthlyData: {
          [key: string]: {
            pending: number;
            confirmed: number;
            rejected: number;
            completed: number;
          };
        } = {};

        reservations.forEach((reservation) => {
          const date = new Date(reservation.createdAt);
          const monthKey = date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });

          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
              pending: 0,
              confirmed: 0,
              rejected: 0,
              completed: 0,
            };
          }

          monthlyData[monthKey][
            reservation.status.toLowerCase() as keyof (typeof monthlyData)[string]
          ]++;
        });

        return Object.entries(monthlyData)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .slice(-6)
          .map(([name, data]) => ({
            name,
            pending: data.pending,
            confirmed: data.confirmed,
            rejected: data.rejected,
            completed: data.completed,
          }));
      })()
    : [
        {
          name: "Jan 2024",
          pending: 0,
          confirmed: 0,
          rejected: 0,
          completed: 0,
        },
        {
          name: "Feb 2024",
          pending: 0,
          confirmed: 0,
          rejected: 0,
          completed: 0,
        },
        {
          name: "Mar 2024",
          pending: 0,
          confirmed: 0,
          rejected: 0,
          completed: 0,
        },
      ];

  const filteredReservations =
    reservations?.filter((reservation) => {
      const matchesSearch =
        reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.projectType
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || reservation.status === statusFilter;
      const matchesTab =
        selectedTab === "all" ||
        reservation.status === selectedTab.toUpperCase();

      return matchesSearch && matchesStatus && matchesTab;
    }) || [];


  if (!isAuthenticated) return null;

  return (
    <div className=" ">
      <main className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {/* Stat Cards */}
         
           <StatCard
            title="Total Reservations"
            value={(reservations?.length || 0).toString()}
            delta="+12.5%"
            deltaType="positive"
            icon={<Calendar className="h-6 w-6 text-slate-500" />}
          />
          <StatCard
            title="Pending"
            value={statusCounts.PENDING.toString()}
            delta="+2.1%"
            deltaType="positive"
            icon={<AlertCircle className="h-6 w-6 text-amber-500" />}
          />
          <StatCard
            title="Confirmed"
            value={statusCounts.CONFIRMED.toString()}
            delta="+8.3%"
            deltaType="positive"
            icon={<CheckCircle className="h-6 w-6 text-emerald-500" />}
          />
          <StatCard
            title="Completed"
            value={statusCounts.COMPLETED.toString()}
            delta="+15.2%"
            deltaType="positive"
            icon={<CheckCircle className="h-6 w-6 text-blue-500" />}
          />
            <Widget widgetData={mockData.widgetData} />
          {/* Main Content Area */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <ChartCard
              data={chartData}
              title="Reservations Status Distribution"
            />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
           <Card className="rounded-none border-2 border-zinc-800 bg-zinc-900/50 h-full">
            <CardHeader>
              <CardTitle className="text-slate-300">Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-slate-300 text-sm">Pending</span>
                  </div>
                  <span className="text-slate-400 text-sm font-medium">{statusCounts.PENDING}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-slate-300 text-sm">Confirmed</span>
                  </div>
                  <span className="text-slate-400 text-sm font-medium">{statusCounts.CONFIRMED}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-slate-300 text-sm">Rejected</span>
                  </div>
                  <span className="text-slate-400 text-sm font-medium">{statusCounts.REJECTED}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-slate-300 text-sm">Completed</span>
                  </div>
                  <span className="text-slate-400 text-sm font-medium">{statusCounts.COMPLETED}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>

       
        </div>
      </main>
    </div>
  );
}
