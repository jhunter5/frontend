"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bed, Bath, Square, MapPin, DollarSign, Building2, Car, Home } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { CandidateList } from "./candidate-list"
import { PropertyStatistics } from "./property-statics"
import { useQueries } from "@tanstack/react-query"

const fetchPropertyById = async (id) => {
  const property = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${id}`)
  if (!property.ok) throw new Error("Error fetching property")
  return property.json()
}

const fetchApplications = async (id) => {
  const applications = await fetch(
    `https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/application/property/${id}`,
  )
  if (!applications.ok) throw new Error("Error fetching applications")
  return applications.json()
}

export default function PropertyFullDetails({ params }) {
  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState(null)

  const results = useQueries({
    queries: [
      { queryKey: ["property", params.id], queryFn: () => fetchPropertyById(params.id) },
      { queryKey: ["applications", params.id], queryFn: () => fetchApplications(params.id) },
    ],
  })

  const isLoading = results.some((result) => result.isLoading)
  const isError = results.some((result) => result.isError)

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Error</CardTitle>
            <CardDescription className="text-red-600">
              No se pudo cargar la información de la propiedad. Por favor, intente nuevamente.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const propertyData = results[0].data
  const applicationData = results[1].data

  const filteredCandidates = applicationData?.applications.filter((application) => {
    const fullName = `${application.tenant.firstName} ${application.tenant.lastName}`.toLowerCase()
    const nameMatch = fullName.includes(nameFilter.toLowerCase())
    const statusMatch = statusFilter === "all" || application.status === Number.parseInt(statusFilter)
    return nameMatch && statusMatch
  })

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    if (!(key in a) && !(key in a.tenant)) return 0
    if (!(key in b) && !(key in b.tenant)) return 0
    const aValue = a[key] ?? a.tenant?.[key] ?? ""
    const bValue = b[key] ?? b.tenant?.[key] ?? ""
    const comparison = String(aValue).localeCompare(String(bValue))
    return direction === "ascending" ? comparison : -comparison
  })

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild className="group hover:bg-slate-100 transition-colors">
          <Link href="/arrendador-dashboard/propiedades-busqueda">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver a detalles de la propiedad
          </Link>
        </Button>
      </div>

      <div className="grid gap-8">
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-slate-50">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-500" />
              <CardTitle>Resumen de la Propiedad</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">Ubicación</span>
                </div>
                <p className="text-lg font-semibold">{propertyData?.property?.address}</p>
              </div>

              <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Características</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-slate-500" />
                    <span className="font-semibold">{propertyData?.property?.rooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-slate-500" />
                    <span className="font-semibold">{propertyData?.property?.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4 text-slate-500" />
                    <span className="font-semibold">{propertyData?.property?.parking}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <Square className="h-4 w-4" />
                  <span className="text-sm font-medium">Área</span>
                </div>
                <p className="text-lg font-semibold">{propertyData?.property?.squareMeters} m²</p>
              </div>

              <div className="flex flex-col gap-2 p-4 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm font-medium">Precio mensual</span>
                </div>
                <p className="text-lg font-semibold text-blue-600">
                  ${propertyData?.property?.rentPrice?.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="candidates" className="space-y-6">
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="candidates" className="data-[state=active]:bg-white">
              Candidatos
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-white">
              Estadísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidates" className="space-y-6">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Lista de Candidatos</CardTitle>
                <CardDescription>Gestiona y revisa los candidatos interesados en tu propiedad</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                  <Input
                    placeholder="Buscar por nombre..."
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="md:w-1/2"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="md:w-1/2">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="0">Postulados</SelectItem>
                      <SelectItem value="1">Preseleccionados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CandidateList
                  candidates={sortedCandidates}
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                  property={propertyData}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <PropertyStatistics applications={applicationData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

