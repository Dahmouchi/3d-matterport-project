/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Download,
  FileText,
  Filter,
  BarChart3,
  PiIcon as PieIcon,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Save,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  CartesianGrid,
} from "recharts"
import { toast } from "sonner"
import { StatCard } from "../../_components/stat-card"
import { ChartCard } from "../../_components/chart-card"

interface Reservation {
  id: string
  customerName: string
  email: string
  phone: string
  projectType: string
  city: string
  status: "PENDING" | "CONFIRMED" | "REJECTED" | "COMPLETED"
  reservationDate: string
  createdAt: string
  notes?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const statusColors = {
  PENDING: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  CONFIRMED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  REJECTED: "bg-red-500/20 text-red-400 border-red-500/30",
  COMPLETED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}


export default function ReportsPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_KEY;

  const {
    data: reservations = [],
    error,
    isLoading,
  } = useSWR<Reservation[]>(`${API_BASE}/api/reservations`, fetcher)

  // Filter states
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [cityFilter, setCityFilter] = useState<string>("all")
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all")

  // Save report dialog state
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [reportTitle, setReportTitle] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [reportType, setReportType] = useState<"DAILY" | "WEEKLY" | "MONTHLY" | "CUSTOM">("CUSTOM")
  const [isSaving, setIsSaving] = useState(false)

  // Get unique cities and project types for filters
  const uniqueCities = useMemo(() => {
    const cities = [...new Set(reservations.map((r) => r.city).filter(Boolean))]
    return cities.sort()
  }, [reservations])

  const uniqueProjectTypes = useMemo(() => {
    const types = [...new Set(reservations.map((r) => r.projectType).filter(Boolean))]
    return types.sort()
  }, [reservations])

  // Filter reservations based on current filters
  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      // Date range filter
      if (dateRange.from && dateRange.to) {
        const reservationDate = new Date(reservation.reservationDate)
        const fromDate = new Date(dateRange.from)
        const toDate = new Date(dateRange.to)
        if (reservationDate < fromDate || reservationDate > toDate) {
          return false
        }
      }

      // Status filter
      if (statusFilter !== "all" && reservation.status !== statusFilter) {
        return false
      }

      // City filter
      if (cityFilter !== "all" && reservation.city !== cityFilter) {
        return false
      }

      // Project type filter
      if (projectTypeFilter !== "all" && reservation.projectType !== projectTypeFilter) {
        return false
      }

      return true
    })
  }, [reservations, dateRange, statusFilter, cityFilter, projectTypeFilter])

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = filteredReservations.length
    const confirmed = filteredReservations.filter((r) => r.status === "CONFIRMED").length
    const rejected = filteredReservations.filter((r) => r.status === "REJECTED").length
    const pending = filteredReservations.filter((r) => r.status === "PENDING").length
    const completed = filteredReservations.filter((r) => r.status === "COMPLETED").length

    return { total, confirmed, rejected, pending, completed }
  }, [filteredReservations])

  // Prepare chart data for line chart (reservations over time)
  const lineChartData = reservations
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

  // Prepare bar chart data (cities)
  const cityChartData = useMemo(() => {
    const cityCount: { [key: string]: number } = {}
    filteredReservations.forEach((reservation) => {
      if (reservation.city) {
        cityCount[reservation.city] = (cityCount[reservation.city] || 0) + 1
      }
    })

    return Object.entries(cityCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([city, count]) => ({ name: city, value: count }))
  }, [filteredReservations])

  // Prepare project type bar chart data
  const projectTypeChartData = useMemo(() => {
    const typeCount: { [key: string]: number } = {}
    filteredReservations.forEach((reservation) => {
      if (reservation.projectType) {
        typeCount[reservation.projectType] = (typeCount[reservation.projectType] || 0) + 1
      }
    })

    return Object.entries(typeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([type, count]) => ({ name: type, value: count }))
  }, [filteredReservations])

  // Prepare pie chart data (status distribution)
  const pieChartData = useMemo(() => {
    return [
      { name: "Pending", value: metrics.pending, color: "#f59e0b" },
      { name: "Confirmed", value: metrics.confirmed, color: "#10b981" },
      { name: "Rejected", value: metrics.rejected, color: "#ef4444" },
      { name: "Completed", value: metrics.completed, color: "#3b82f6" },
    ].filter((item) => item.value > 0)
  }, [metrics])

  // Export functions
  const exportToCSV = async () => {
    try {
      const reportData = {
        title: `Reservations Report - ${new Date().toLocaleDateString()}`,
        description: "CSV export of filtered reservations",
        dateRange: dateRange.from && dateRange.to ? `${dateRange.from} to ${dateRange.to}` : "All dates",
        totalReservations: metrics.total,
        confirmedReservations: metrics.confirmed,
        pendingReservations: metrics.pending,
        rejectedReservations: metrics.rejected,
        completedReservations: metrics.completed,
        reservations: filteredReservations.map((r) => ({
          id: r.id,
          customerName: r.customerName,
          email: r.email,
          phone: r.phone,
          projectType: r.projectType,
          city: r.city,
          status: r.status,
          reservationDate: r.reservationDate,
          createdAt: r.createdAt,
        })),
      }

      const response = await fetch(`${API_BASE}/api/reports/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format: "csv", reportData }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `reservations-report-${new Date().toISOString().split("T")[0]}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Export failed:", error)
      toast("Export Failed")
    }
  }

  const exportToPDF = async () => {
    try {
      const reportData = {
        title: `Reservations Report - ${new Date().toLocaleDateString()}`,
        description: "PDF export of filtered reservations",
        dateRange: dateRange.from && dateRange.to ? `${dateRange.from} to ${dateRange.to}` : "All dates",
        totalReservations: metrics.total,
        confirmedReservations: metrics.confirmed,
        pendingReservations: metrics.pending,
        rejectedReservations: metrics.rejected,
        completedReservations: metrics.completed,
        reservations: filteredReservations.map((r) => ({
          id: r.id,
          customerName: r.customerName,
          email: r.email,
          phone: r.phone,
          projectType: r.projectType,
          city: r.city,
          status: r.status,
          reservationDate: r.reservationDate,
          createdAt: r.createdAt,
        })),
      }

      const response = await fetch(`${API_BASE}/api/reports/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format: "pdf", reportData }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `reservations-report-${new Date().toISOString().split("T")[0]}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Export failed:", error)
      toast("Export Failed")
    }
  }

  const exportToExcel = async () => {
    try {
      const reportData = {
        title: `Reservations Report - ${new Date().toLocaleDateString()}`,
        description: "Excel export of filtered reservations",
        dateRange: dateRange.from && dateRange.to ? `${dateRange.from} to ${dateRange.to}` : "All dates",
        totalReservations: metrics.total,
        confirmedReservations: metrics.confirmed,
        pendingReservations: metrics.pending,
        rejectedReservations: metrics.rejected,
        completedReservations: metrics.completed,
        reservations: filteredReservations.map((r) => ({
          id: r.id,
          customerName: r.customerName,
          email: r.email,
          phone: r.phone,
          projectType: r.projectType,
          city: r.city,
          status: r.status,
          reservationDate: r.reservationDate,
          createdAt: r.createdAt,
        })),
      }

      const response = await fetch(`${API_BASE}/api/reports/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format: "excel", reportData }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `reservations-report-${new Date().toISOString().split("T")[0]}.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Export failed:", error)
      toast("Export Failed")
    }
  }

  // Save report functionality
  const saveReport = async () => {
    if (!reportTitle.trim()) {
      toast("Validation Error")
      return
    }

    setIsSaving(true)
    try {
      const reportData = {
        title: reportTitle,
        description: reportDescription,
        type: reportType,
        startDate: dateRange.from || new Date().toISOString().split("T")[0],
        endDate: dateRange.to || new Date().toISOString().split("T")[0],
        data: {
          filters: {
            dateRange,
            statusFilter,
            cityFilter,
            projectTypeFilter,
          },
          metrics,
          chartData: {
            lineChart: lineChartData,
            pieChart: pieChartData,
            cityChart: cityChartData,
            projectTypeChart: projectTypeChartData,
          },
          totalRecords: filteredReservations.length,
        },
      }

      const response = await fetch(`${API_BASE}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      })

      if (response.ok) {
        toast("Report Saved")
        setSaveDialogOpen(false)
        setReportTitle("")
        setReportDescription("")
        setReportType("CUSTOM")
      } else {
        throw new Error("Failed to save report")
      }
    } catch (error) {
      console.error("Save failed:", error)
      toast("Save Failed")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-800 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <p className="text-red-400">Error loading reservations data</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Reports Dashboard</h1>
          <p className="text-slate-400 mt-1">Comprehensive reservation analytics and insights</p>
        </div>
        <div className="flex gap-2">
          {/* Save Report button */}
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Report
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-50">Save Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-300">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Enter report title"
                    className="bg-slate-700 border-slate-600 text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Enter report description"
                    className="bg-slate-700 border-slate-600 text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-slate-300">
                    Report Type
                  </Label>
                  <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                      <SelectItem value="CUSTOM">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSaveDialogOpen(false)}
                    className="bg-slate-700 border-slate-600 text-slate-300"
                  >
                    Cancel
                  </Button>
                  <Button onClick={saveReport} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                    {isSaving ? "Saving..." : "Save Report"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={exportToCSV}
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button
            onClick={exportToPDF}
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button
            onClick={exportToExcel}
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-50 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">From Date</label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-slate-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">To Date</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-slate-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">City</label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all">All Cities</SelectItem>
                  {uniqueCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Project Type</label>
              <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueProjectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Reservations"
          value={metrics.total.toString()}
          delta={`${filteredReservations.length} filtered`}
          deltaType="neutral"
          icon={<Users className="h-6 w-6 text-slate-500" />}
        />
        <StatCard
          title="Confirmed"
          value={metrics.confirmed.toString()}
          delta={`${((metrics.confirmed / metrics.total) * 100 || 0).toFixed(1)}%`}
          deltaType="positive"
          icon={<CheckCircle className="h-6 w-6 text-emerald-500" />}
        />
        <StatCard
          title="Pending"
          value={metrics.pending.toString()}
          delta={`${((metrics.pending / metrics.total) * 100 || 0).toFixed(1)}%`}
          deltaType="neutral"
          icon={<Clock className="h-6 w-6 text-amber-500" />}
        />
        <StatCard
          title="Rejected"
          value={metrics.rejected.toString()}
          delta={`${((metrics.rejected / metrics.total) * 100 || 0).toFixed(1)}%`}
          deltaType="negative"
          icon={<XCircle className="h-6 w-6 text-red-500" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Reservations Over Time */}
        <ChartCard data={lineChartData} title="Reservations Trends (Last 6 Months)" />

        {/* Pie Chart - Status Distribution */}
    <Card className="h-full rounded-none border-2 border-zinc-800 bg-zinc-900/50 ">
          <CardHeader>
            <CardTitle className="text-slate-50 flex items-center gap-2">
              <PieIcon className="h-5 w-5" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "6px",
                      color: "#f1f5f9",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-400">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cities Bar Chart */}
    <Card className="h-full rounded-none border-2 border-zinc-800 bg-zinc-900/50 ">
          <CardHeader>
            <CardTitle className="text-slate-50 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Top Cities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "6px",
                      color: "#f1f5f9",
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Types Bar Chart */}
    <Card className="h-full rounded-none border-2 border-zinc-800 bg-zinc-900/50 ">
          <CardHeader>
            <CardTitle className="text-slate-50 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Project Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectTypeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "6px",
                      color: "#f1f5f9",
                    }}
                  />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
    <Card className="h-full rounded-none border-2 border-zinc-800 bg-zinc-900/50 ">
        <CardHeader>
          <CardTitle className="text-slate-50 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detailed Reservations ({filteredReservations.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">Customer</TableHead>
                  <TableHead className="text-slate-400">Project Type</TableHead>
                  <TableHead className="text-slate-400">City</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Reservation Date</TableHead>
                  <TableHead className="text-slate-400">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.slice(0, 50).map((reservation) => (
                  <TableRow key={reservation.id} className="border-slate-700">
                    <TableCell className="text-slate-300">
                      <div>
                        <div className="font-medium">{reservation.customerName}</div>
                        <div className="text-sm text-slate-500">{reservation.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{reservation.projectType}</TableCell>
                    <TableCell className="text-slate-300">{reservation.city}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[reservation.status]}>{reservation.status}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {new Date(reservation.reservationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {new Date(reservation.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredReservations.length > 50 && (
              <div className="text-center py-4 text-slate-400">
                Showing first 50 of {filteredReservations.length} reservations
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
