"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TenantCard } from "@/app/arrendador-dashboard/inquilinos/components/inquilino-card"
import { Search, ChevronLeft, ChevronRight, UserPlus, Users, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import Link from "next/link"

const ITEMS_PER_PAGE = 6

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("name")
  const { user } = useAuth0()

  const fetchTenants = async () => {
    const userId = getAuth0Id(user.sub)
    const response = await fetch(
      `https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/landlord/${userId}/tenants/active`,
    )

    if (response.status === 404) {
      return { tenants: [] } // Retorna un objeto con un array vacío en caso de 404
    }

    if (!response.ok) {
      throw new Error("Ocurrió un error consultando la base de datos")
    }

    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenants,
  })

  if (isPending) {
    return <div className="text-center py-10">Cargando inquilinos...</div>
  }

  if (isError && error.message !== "404") {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>
  }

  const tenants = data?.tenants || []

  if (tenants.length === 0) {
    return (
      <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen max-w-5xl">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-blue-600" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-yellow-900" />
                </div>
              </div>

              <div className="space-y-2 max-w-lg">
                <h2 className="text-2xl font-bold tracking-tight">¡Aún no tienes inquilinos!</h2>
                <p className="text-gray-500">
                  Comienza a agregar propiedades y a encontrar inquilinos ideales para tus espacios.
                </p>
              </div>

              <div className="space-y-4 w-full max-w-md">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Beneficios de usar nuestra plataforma</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Gestión simplificada de inquilinos
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Proceso de selección de inquilinos optimizado
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Seguimiento de pagos y contratos en un solo lugar
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

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedTenants = [...filteredTenants].sort((a, b) => {
    if (sortBy === "name") {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    } else if (sortBy === "rating") {
      return b.avgRating - a.avgRating
    } else if (sortBy === "rent") {
      return b.monthlyRent - a.monthlyRent
    }
    return 0
  })

  // Calcular páginas
  const totalPages = Math.ceil(sortedTenants.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTenants = sortedTenants.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-5xl font-spaceGrotesk font-bold">Inquilinos</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar inquilino..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nombre</SelectItem>
            <SelectItem value="rating">Calificación</SelectItem>
            <SelectItem value="rent">Renta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20 ">
        {paginatedTenants.map((tenant) => (
          <TenantCard key={tenant.id} tenant={tenant} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedTenants.length)} de{" "}
          {sortedTenants.length} inquilinos
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-[#1C2671] text-neutral-50 hover:bg-[#2A3A9F] transition-colors duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <div className="text-sm font-medium">
            Página {currentPage} de {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-[#1C2671] text-neutral-50 hover:bg-[#2A3A9F] transition-colors duration-300"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página siguiente</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

