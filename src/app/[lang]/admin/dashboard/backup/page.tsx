/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
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
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"
import { toast } from "sonner"

interface Report {
  id: string
  title: string
  description?: string
  type: "DAILY" | "WEEKLY" | "MONTHLY" | "CUSTOM"
  startDate: string
  endDate: string
  data: {
    filters: any
    metrics: {
      total: number
      confirmed: number
      rejected: number
      pending: number
      completed: number
    }
    chartData: {
      lineChart: any[]
      pieChart: any[]
      cityChart: any[]
      projectTypeChart: any[]
    }
    totalRecords: number
  }
  fileUrl?: string
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const reportTypeColors = {
  DAILY: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  WEEKLY: "bg-green-500/20 text-green-400 border-green-500/30",
  MONTHLY: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  CUSTOM: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

export default function SavedReportsPage() {
      const API_BASE = process.env.NEXT_PUBLIC_API_KEY;

  const { data: reports = [], error, isLoading, mutate } = useSWR<Report[]>(`${API_BASE}/api/reports`, fetcher)

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || report.type === typeFilter
    return matchesSearch && matchesType
  })

  const deleteReport = async (reportId: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/reports/${reportId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast("Report Deleted")
        mutate() // Refresh the reports list
      } else {
        throw new Error("Failed to delete report")
      }
    } catch (error) {
      console.error("Delete failed:", error)
      toast("Delete Failed")
    }
  }

  const downloadReport = async (report: Report, format: "pdf" | "excel" | "csv") => {
    try {
      const reportData = {
        title: report.title,
        description: report.description || "",
        dateRange: `${new Date(report.startDate).toLocaleDateString()} to ${new Date(report.endDate).toLocaleDateString()}`,
        totalReservations: report.data.metrics.total,
        confirmedReservations: report.data.metrics.confirmed,
        pendingReservations: report.data.metrics.pending,
        rejectedReservations: report.data.metrics.rejected,
        completedReservations: report.data.metrics.completed,
        reservations: [], // Would need to fetch actual reservation data
      }

      const response = await fetch(`${API_BASE}/api/reports/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ format, reportData }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        const extension = format === "excel" ? "xlsx" : format
        link.download = `${report.title.replace(/[^a-zA-Z0-9]/g, "_")}.${extension}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Download failed:", error)
      toast("Download Failed")
    }
  }

  const viewReport = (report: Report) => {
    setSelectedReport(report)
    setViewDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-800 rounded w-48"></div>
          <div className="h-32 bg-slate-800 rounded"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-800 rounded"></div>
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
            <p className="text-red-400">Error loading saved reports</p>
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
          <h1 className="text-3xl font-bold text-slate-50">Saved Reports</h1>
          <p className="text-slate-400 mt-1">Manage and view your saved reservation reports</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
            {filteredReports.length} reports
          </Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Search Reports</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-300 pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Report Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="CUSTOM">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-50 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reports List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-400">Title</TableHead>
                  <TableHead className="text-slate-400">Type</TableHead>
                  <TableHead className="text-slate-400">Date Range</TableHead>
                  <TableHead className="text-slate-400">Records</TableHead>
                  <TableHead className="text-slate-400">Created</TableHead>
                  <TableHead className="text-slate-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="border-slate-700">
                    <TableCell className="text-slate-300">
                      <div>
                        <div className="font-medium">{report.title}</div>
                        {report.description && (
                          <div className="text-sm text-slate-500 truncate max-w-xs">{report.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={reportTypeColors[report.type]}>{report.type}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="text-sm">
                        {new Date(report.startDate).toLocaleDateString()} -{" "}
                        {new Date(report.endDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{report.data.totalRecords}</TableCell>
                    <TableCell className="text-slate-300">{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewReport(report)}
                          className="text-slate-400 hover:text-slate-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select onValueChange={(format: any) => downloadReport(report, format)}>
                          <SelectTrigger className="w-auto h-8 bg-slate-700 border-slate-600">
                            <Download className="h-4 w-4" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                          </SelectContent>
                        </Select>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-slate-800 border-slate-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-slate-50">Delete Report</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-400">
                                Are you sure you want to delete &ldquo;{report.title}&quot;? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteReport(report.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                {searchTerm || typeFilter !== "all" ? "No reports match your filters" : "No saved reports found"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Report Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent   className="!w-[90vw] !max-w-[1200px] bg-slate-800 border-slate-700 text-slate-50 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-slate-50">{selectedReport?.title}</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              {/* Report Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Date Range</span>
                    </div>
                    <p className="text-slate-300 mt-1">
                      {new Date(selectedReport.startDate).toLocaleDateString()} -{" "}
                      {new Date(selectedReport.endDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Type</span>
                    </div>
                    <Badge className={reportTypeColors[selectedReport.type]} variant="outline">
                      {selectedReport.type}
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Total Records</span>
                    </div>
                    <p className="text-slate-300 mt-1 text-lg font-semibold">{selectedReport.data.totalRecords}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-slate-400">Confirmed</span>
                    </div>
                    <p className="text-slate-300 text-lg font-semibold">{selectedReport.data.metrics.confirmed}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-slate-400">Pending</span>
                    </div>
                    <p className="text-slate-300 text-lg font-semibold">{selectedReport.data.metrics.pending}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-slate-400">Rejected</span>
                    </div>
                    <p className="text-slate-300 text-lg font-semibold">{selectedReport.data.metrics.rejected}</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-slate-400">Completed</span>
                    </div>
                    <p className="text-slate-300 text-lg font-semibold">{selectedReport.data.metrics.completed}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                {selectedReport.data.chartData.lineChart.length > 0 && (
                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-slate-50 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Trends Over Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={selectedReport.data.chartData.lineChart}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #475569",
                                borderRadius: "6px",
                                color: "#f1f5f9",
                              }}
                            />
                            <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                            <Line type="monotone" dataKey="confirmed" stroke="#10b981" strokeWidth={2} />
                            <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                            <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Pie Chart */}
                {selectedReport.data.chartData.pieChart.length > 0 && (
                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-slate-50 flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Status Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={selectedReport.data.chartData.pieChart}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {selectedReport.data.chartData.pieChart.map((entry: any, index: number) => (
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
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Bar Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cities Chart */}
                {selectedReport.data.chartData.cityChart.length > 0 && (
                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-slate-50 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Top Cities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={selectedReport.data.chartData.cityChart}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
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
                )}

                {/* Project Types Chart */}
                {selectedReport.data.chartData.projectTypeChart.length > 0 && (
                  <Card className="bg-slate-700 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-slate-50 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Project Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={selectedReport.data.chartData.projectTypeChart}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
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
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
