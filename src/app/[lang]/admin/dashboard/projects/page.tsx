"use client";

import type React from "react";

import { useState } from "react";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  User,
  Filter,
  Download,
  Plus,
  Loader2,
  Grid3X3,
  List,
  Eye,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label";

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

interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  city: string;
  objectives: string;
  surface: string;
  link: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const statusColors = {
  PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  CONFIRMED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
  COMPLETED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
      const [viewMode, setViewMode] = useState<"card" | "table">("card")

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
    city: "",
    objectives: "",
    surface: "",
    link: "",
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          city: formData.city,
          objectives: formData.objectives,
          surface: formData.surface,
          link: formData.link,
        }),
      });

      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
          city: "",
          objectives: "",
          surface: "",
          link: "",
        });
        setIsDialogOpen(false);
        mutate();
      } else {
        console.error("Failed to create reservation");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusUpdate = async (
    reservationId: string,
    newStatus: string
  ) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/reservations/${reservationId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        mutate();
        setIsStatusDialogOpen(false);
        setSelectedReservation(null);
      } else {
        console.error("Failed to update reservation status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const statusCounts = reservations
    ? {
        PENDING: reservations.filter((r) => r.status === "PENDING").length,
        CONFIRMED: reservations.filter((r) => r.status === "CONFIRMED").length,
        REJECTED: reservations.filter((r) => r.status === "REJECTED").length,
        COMPLETED: reservations.filter((r) => r.status === "COMPLETED").length,
      }
    : { PENDING: 0, CONFIRMED: 0, REJECTED: 0, COMPLETED: 0 };

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
const handleExport = () => {
    if (!filteredReservations.length) {
      alert("No data to export")
      return
    }

    // Create CSV headers
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Project Type",
      "City",
      "Surface",
      "Status",
      "Message",
      "Objectives",
      "Link",
      "Created At",
      "Updated At",
    ]

    // Convert filtered reservations to CSV format
    const csvData = filteredReservations.map((reservation) => [
      reservation.name,
      reservation.email,
      reservation.phone,
      reservation.projectType || "",
      reservation.city || "",
      reservation.surface || "",
      reservation.status,
      reservation.message || "",
      reservation.objectives || "",
      reservation.link || "",
      formatDate(reservation.createdAt),
      formatDate(reservation.updatedAt),
    ])

    // Combine headers and data
    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field.toString().replace(/"/g, '""')}"`).join(","))
      .join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)

    // Generate filename with current date and filter info
    const now = new Date()
    const dateStr = now.toISOString().split("T")[0]
    const filterInfo = statusFilter !== "all" ? `_${statusFilter}` : ""
    const searchInfo = searchTerm ? `_search` : ""
    link.setAttribute("download", `reservations_${dateStr}${filterInfo}${searchInfo}.csv`)

    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading reservations...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="mx-auto max-w-7xl">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-red-400 mb-4">
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                Failed to load reservations
              </h3>
              <p className="text-slate-400 text-center max-w-sm mb-4">
                Unable to connect to the API. Please check if the server is
                running at http://localhost:3001
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
         <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-50">Reservations</h1>
            <p className="text-slate-400 mt-1">Manage and track all your project reservations</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-1">
              <Button
                variant={viewMode === "card" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("card")}
                className={`h-8 px-3 ${
                  viewMode === "card"
                    ? "bg-slate-700 text-slate-50"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className={`h-8 px-3 ${
                  viewMode === "table"
                    ? "bg-slate-700 text-slate-50"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                }`}
              >

                
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export ({filteredReservations.length})
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Reservation
                </Button>
              </DialogTrigger>
              <DialogContent   className="!w-[90vw] !max-w-[1200px] bg-slate-800 border-slate-700 text-slate-50 max-h-[90vh] overflow-y-auto"
>
                <DialogHeader>
                  <DialogTitle>Create New Reservation</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Fill out the form below to create a new reservation.
                  </DialogDescription>
                </DialogHeader>
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations de base */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Nom & Prénom *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Téléphone / WhatsApp *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="+212 6 12 34 56 78"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Ville *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="Ex: Casablanca, Marrakech..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Type de projet *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-[#f6ba13] focus:outline-none"
                        required
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="immobilier">
                          Immobilier (vente / location)
                        </option>
                        <option value="hotel">Hôtel / Riad</option>
                        <option value="commerce">Commerce / showroom</option>
                        <option value="architecture">Architecture / BTP</option>
                        <option value="autre">
                          Autre (précisez ci-dessous)
                        </option>
                      </select>
                    </div>

                    {/* Surface */}
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Surface approximative à scanner *
                      </label>
                      <select
                        name="surface"
                        value={formData.surface}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-[#f6ba13] focus:outline-none"
                        required
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="<100">{"< 100 m²"}</option>
                        <option value="100-300">100 – 300 m²</option>
                        <option value="300-600">300 – 600 m²</option>
                        <option value="600+">+600 m²</option>
                      </select>
                    </div>
                  </div>

                  {/* Type de projet */}

                  {/* Objectif principal */}
                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      Objectif principal *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        "Visite virtuelle 3D",
                        "Photos HDR",
                        "Plan 2D / 3D",
                        "Export BIM",
                        "Vidéo promotionnelle",
                      ].map((obj) => (
                        <label
                          key={obj}
                          className="flex items-center space-x-2 text-gray-200"
                        >
                          <input
                            type="checkbox"
                            name="objectives"
                            value={obj}
                            checked={formData.objectives?.includes(obj)}
                            onChange={handleInputChange}
                            className="rounded border-gray-600 bg-gray-700/50 text-[#f6ba13] focus:ring-[#f6ba13]"
                          />
                          <span>{obj}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Détails complémentaires */}
                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      Lien de site web (si existant)
                    </label>
                    <Input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                      placeholder="votre site web"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13] min-h-[120px]"
                      placeholder="informations supplémentaires ..."
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Reservation"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Filters and Search */}
        <Card className="rounded-none border-2 border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search reservations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 rounded-none text-slate-200 placeholder:text-slate-400"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-slate-200 rounded-none">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-200">
                      All Status
                    </SelectItem>
                    <SelectItem value="PENDING" className="text-slate-200">
                      Pending
                    </SelectItem>
                    <SelectItem value="CONFIRMED" className="text-slate-200">
                      Confirmed
                    </SelectItem>
                    <SelectItem value="REJECTED" className="text-slate-200">
                      Rejected
                    </SelectItem>
                    <SelectItem value="COMPLETED" className="text-slate-200">
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="border-zinc-800 bg-zinc-900/50 rounded-none p-1 border-2">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-slate-400 text-slate-400 data-[state=active]:text-slate-50 rounded-none"
            >
              All ({reservations?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-slate-400 text-slate-400 data-[state=active]:text-slate-50 rounded-none"
            >
              Pending ({statusCounts.PENDING})
            </TabsTrigger>
            <TabsTrigger
              value="confirmed"
              className="data-[state=active]:bg-slate-400 text-slate-400 data-[state=active]:text-slate-50 rounded-none"
            >
              Confirmed ({statusCounts.CONFIRMED})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-slate-400 text-slate-400 data-[state=active]:text-slate-50 rounded-none"
            >
              Completed ({statusCounts.COMPLETED})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            {viewMode === "card" ? (
              <div className="grid gap-4">
                {filteredReservations.map((reservation) => (
                  <Card
                    key={reservation.id}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-slate-50">{reservation.name}</CardTitle>
                            <Badge className={statusColors[reservation.status]}>{reservation.status}</Badge>
                          </div>
                          <CardDescription className="text-slate-400">
                            {reservation.projectType && (
                              <span className="font-medium text-slate-300">{reservation.projectType}</span>
                            )}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-800 border-slate-700">
                            <DropdownMenuItem
                              className="text-slate-200 hover:bg-slate-700"
                              onClick={() => {
                                setSelectedReservation(reservation)
                                setIsStatusDialogOpen(true)
                              }}
                            >
                              Edit Status
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-700">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Mail className="h-4 w-4 text-slate-400" />
                            {reservation.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Phone className="h-4 w-4 text-slate-400" />
                            {reservation.phone}
                          </div>
                          {reservation.city && (
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                              <MapPin className="h-4 w-4 text-slate-400" />
                              {reservation.city}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Clock className="h-4 w-4 text-slate-400" />
                            Created {formatDate(reservation.createdAt)}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {reservation.message && (
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-1">Message</h4>
                              <p className="text-sm text-slate-400 line-clamp-2">{reservation.message}</p>
                            </div>
                          )}
                          {reservation.objectives && (
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-1">Objectives</h4>
                              <p className="text-sm text-slate-400 line-clamp-2">{reservation.objectives}</p>
                            </div>
                          )}
                          {reservation.surface && (
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-1">Surface</h4>
                              <p className="text-sm text-slate-400">{reservation.surface}</p>
                            </div>
                          )}
                          {reservation.link && (
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-1">Link</h4>
                              <a
                                href={reservation.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-400 hover:text-blue-300 underline"
                              >
                                {reservation.link}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Phone</TableHead>
                      <TableHead className="text-slate-300">Project Type</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Created</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id} className="border-slate-700 hover:bg-slate-750">
                        <TableCell className="text-slate-200 font-medium">{reservation.name}</TableCell>
                        <TableCell className="text-slate-300">{reservation.email}</TableCell>
                        <TableCell className="text-slate-300">{reservation.phone}</TableCell>
                        <TableCell className="text-slate-300">{reservation.projectType || "-"}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[reservation.status]}>{reservation.status}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{formatDate(reservation.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedReservation(reservation)
                              
                              }}
                              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-slate-800 border-slate-700">
                                <DropdownMenuItem
                                  className="text-slate-200 hover:bg-slate-700"
                                  onClick={() => {
                                    setSelectedReservation(reservation)
                                    setIsStatusDialogOpen(true)
                                  }}
                                >
                                  Edit Status
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-slate-700">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}

            {filteredReservations.length === 0 && !isLoading && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <User className="h-12 w-12 text-slate-600 mb-4" />
                  <h3 className="text-lg font-medium text-slate-300 mb-2">No reservations found</h3>
                  <p className="text-slate-400 text-center max-w-sm">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by creating your first reservation"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Status Update Dialog */}
        <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 text-slate-50">
            <DialogHeader>
              <DialogTitle>Update Reservation Status</DialogTitle>
              <DialogDescription className="text-slate-400">
                Change the status for {selectedReservation?.name}&apos;s
                reservation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {(
                  ["PENDING", "CONFIRMED", "REJECTED", "COMPLETED"] as const
                ).map((status) => (
                  <Button
                    key={status}
                    variant={
                      selectedReservation?.status === status
                        ? "default"
                        : "outline"
                    }
                    className={`${
                      selectedReservation?.status === status
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                    }`}
                    onClick={() => {
                      if (selectedReservation) {
                        handleStatusUpdate(selectedReservation.id, status);
                      }
                    }}
                    disabled={isUpdatingStatus}
                  >
                    {isUpdatingStatus ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      status
                    )}
                  </Button>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsStatusDialogOpen(false);
                  setSelectedReservation(null);
                }}
                className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
