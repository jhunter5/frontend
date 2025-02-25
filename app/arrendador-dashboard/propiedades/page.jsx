"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PropertyCard } from "./property-card"
import { Search, ChevronLeft, ChevronRight, PlusCircle, HomeIcon, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from "@auth0/auth0-react"

const ITEMS_PER_PAGE = 6

export default function PropertiesPage() {
  const [searchCity, setSearchCity] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useAuth0()

  const fetchProperties = async () => {
    const userId = getAuth0Id(user.sub)
    const response = await fetch(
      `https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/user/${userId}`,
    )

    if (response.status === 404) {
      return [] // Retorna un array vacío en caso de 404
    }

    if (!response.ok) {
      throw new Error("Ocurrió un error consultando la base de datos")
    }

    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  })

  const properties = data || []

  // Filtrar propiedades por ciudad
  const filteredProperties = properties.filter((property) =>
    property?.city?.toLowerCase().includes(searchCity.toLowerCase()),
  )

  // Calcular páginas
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (isPending) {
    return <div className="text-center py-10">Cargando propiedades...</div>
  }

  if (isError && error.message !== "404") {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>
  }

  if (properties.length === 0) {
    return (
      <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen max-w-5xl">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <HomeIcon className="w-12 h-12 text-blue-600" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <PlusCircle className="w-4 h-4 text-yellow-900" />
                </div>
              </div>

              <div className="space-y-2 max-w-lg">
                <h2 className="text-2xl font-bold tracking-tight">¡Comienza a publicar tus propiedades!</h2>
                <p className="text-gray-500">
                  Actualmente no tienes propiedades registradas en nuestra plataforma. Comienza a agregar tus
                  propiedades para encontrar inquilinos ideales.
                </p>
              </div>

              <div className="space-y-4 w-full max-w-md">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Beneficios de publicar con nosotros</h3>
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
                        Gestión simplificada de arrendamientos
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Herramientas para un mejor control de tus propiedades
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-spaceGrotesk font-bold">Mis Propiedades</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/arrendador-dashboard/nueva-propiedad">
            <Button
              variant="outline"
              className="h-4/5 w-full flex flex-row items-center justify-center gap-2 bg-[#1C2671] text-neutral-50 hover:bg-[#2A3A9F] transition-colors duration-300"
            >
              <PlusCircle className="h-5 w-5" />
              <span className="text-lg font-semibold font-inter">Agregar</span>
            </Button>
          </Link>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground font-inter" />
            <Input
              placeholder="Buscar por ciudad..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
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
    </div>
  )
}

