"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { OpenPropertyCard } from "./openPropertyCard"
import { Search, ChevronLeft, ChevronRight, Home, PlusCircle, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PropertyDetails } from "./property-details"
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

const ITEMS_PER_PAGE = 6

export default function PropertiesForRentPage() {
  const [searchAddress, setSearchAddress] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const { user } = useAuth0()

  const fetchPropertiesOnDemand = async () => {
    const userId = getAuth0Id(user.sub)
    const response = await fetch(
      `https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/landlord/${userId}`,
    )

    if (response.status === 404) {
      return [] // Return an empty array in case of 404
    }

    if (!response.ok) {
      throw new Error("Ocurrió un error consultando la base de datos")
    }

    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchPropertiesOnDemand,
  })

  if (isPending) {
    return <div className="text-center py-10">Cargando propiedades...</div>
  }

  if (isError && error.message !== "404") {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>
  }

  const propertiesForRent = data || []

  if (propertiesForRent.length === 0) {
    return (
      <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen max-w-5xl">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <Home className="w-12 h-12 text-blue-600" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <PlusCircle className="w-4 h-4 text-yellow-900" />
                </div>
              </div>

              <div className="space-y-2 max-w-lg">
                <h2 className="text-2xl font-bold tracking-tight">¡No tienes propiedades en búsqueda de arriendo!</h2>
                <p className="text-gray-500">
                  Comienza a agregar propiedades para encontrar inquilinos ideales y maximizar tus ingresos por
                  alquiler.
                </p>
              </div>

              <div className="space-y-4 w-full max-w-md">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Beneficios de publicar tus propiedades</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Mayor visibilidad para tus propiedades
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Proceso de selección de inquilinos simplificado
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Gestión eficiente de tus propiedades en alquiler
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <Link href="/arrendador-dashboard/nueva-propiedad">
                      Agregar Propiedad
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Filtrar propiedades por dirección
  const filteredProperties = propertiesForRent.filter((property) =>
    property?.direccion?.toLowerCase().includes(searchAddress.toLowerCase()),
  )

  // Calcular páginas
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-5xl font-bold font-spaceGrotesk">Propiedades en Búsqueda de Arriendo</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por dirección..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProperties.map((property) => (
          <OpenPropertyCard key={property._id} property={property} onClick={() => setSelectedProperty(property)} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-[#1C2671] text-white hover:bg-[#2A3A9F] transition-colors duration-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-[#1C2671] text-white hover:bg-[#2A3A9F] transition-colors duration-300"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Diálogo para mostrar detalles de la propiedad y candidatos */}
      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && setSelectedProperty(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="font-spaceGrotesk">Detalles de la Propiedad</DialogTitle>
          </DialogHeader>
          {selectedProperty && <PropertyDetails property={selectedProperty} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

