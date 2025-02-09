'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bed, Bath, Square, MapPin, DollarSign } from 'lucide-react'
import Link from "next/link"
import { CandidateList } from './candidate-list'
import { PropertyStatistics } from '@/app/arrendador-dashboard/propiedades-busqueda/[id]/property-statics'
import { useQueries } from '@tanstack/react-query'

// Datos de ejemplo actualizados para la propiedad
const getProperty = (id) => ({
  id: "6782b357e02d45b448eb06a8",
  address: "123 Main St, Cityville",
  price: 1500,
  bedrooms: 2,
  bathrooms: 2,
  area: 80,
  image: "/placeholder.svg?height=400&width=600",
  totalApplications: 50,
  candidates: [
    { application_id: "1", tenant_id: "677f3353f9e2265929c7489a", name: "John Doe", age: 28, industry: "Tecnología", status: "Postulado", rating: 4.5 },
    { id: 2, name: "Jane Smith", age: 35, industry: "Educación", status: "Preseleccionado", rating: 4.2 },
    { id: 3, name: "Alice Johnson", age: 42, industry: "Finanzas", status: "Postulado", rating: 4.8 },
    { id: 4, name: "Bob Williams", age: 31, industry: "Salud", status: "Preseleccionado", rating: 4.0 },
    // ... más candidatos
  ],
  demographics: {
    ageGroups: [
      { group: "18-25", count: 10 },
      { group: "26-35", count: 20 },
      { group: "36-45", count: 15 },
      { group: "46+", count: 5 },
    ],
    industries: [
      { industry: "Tecnología", count: 15 },
      { industry: "Educación", count: 10 },
      { industry: "Finanzas", count: 8 },
      { industry: "Salud", count: 7 },
      { industry: "Otros", count: 10 },
    ],
  },
})

const fetchPropertyById = async (id) => {
  const property = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/${id}`) 

  if (!property.ok) {
    throw new Error('Error fetching property')
  }

  return property.json()
}

const fetchApplications = async (id) => {
  const applications = await fetch(`https://backend-khaki-three-90.vercel.app/api/application/property/${id}`)

  if (!applications.ok) {
    throw new Error('Error fetching applications')
  }

  return applications.json()
}

export default function PropertyFullDetails({ params }) {
  // const [property, setProperty] = useState(null)
  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState(null)

  const results = useQueries({
    queries: [
      {
        queryKey: ['property', params.id],
        queryFn: () => fetchPropertyById(params.id),
      },
      {
        queryKey: ['applications', params.id],
        queryFn: () => fetchApplications(params.id),
      }
    ]
  })
  
  
  const isLoading = results.some(result => result.isLoading)
  const isError = results.some(result => result.isError)
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  const propertyData = results[0].data
  const applicationData = results[1].data

  const filteredCandidates = applicationData?.applications.filter((application) => {
    const fullName = `${application.tenant.firstName} ${application.tenant.lastName}`.toLowerCase()
    const nameMatch = fullName.includes(nameFilter.toLowerCase())
    const statusMatch = statusFilter === "all" || application.status === parseInt(statusFilter)
    
    return nameMatch && statusMatch
  })
 
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (!sortConfig) return 0
  
    const { key, direction } = sortConfig
  
    // Verifica si la clave existe en el objeto
    if (!(key in a) && !(key in a.tenant)) return 0
    if (!(key in b) && !(key in b.tenant)) return 0
  
    const aValue = a[key] ?? a.tenant?.[key] ?? "" // Usa el valor en `a` o `a.tenant`
    const bValue = b[key] ?? b.tenant?.[key] ?? ""
  
    const comparison = String(aValue).localeCompare(String(bValue)) // Comparación segura
  
    return direction === "ascending" ? comparison : -comparison
  })
  

const requestSort = (key) => {
  let direction = "ascending"

  if (sortConfig?.key === key && sortConfig.direction === "ascending") {
    direction = "descending"
  }

  setSortConfig({ key, direction })
}

  console.log(propertyData)
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors font-inter">
          <Link href={`/arrendador-dashboard/propiedades-busqueda`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a detalles de la propiedad
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{propertyData?.property?.address}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>{propertyData?.property?.rooms} Habitaciones</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>{propertyData?.property?.bathrooms} Baños</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span>{propertyData?.property?.squareMeters} m²</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-semibold">${propertyData?.property?.rentPrice}/mes</span>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="candidates">
          <TabsList>
            <TabsTrigger value="candidates">Candidatos</TabsTrigger>
            <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
          </TabsList>
          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle>Candidatos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-col gap-4 md:flex-row">
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

