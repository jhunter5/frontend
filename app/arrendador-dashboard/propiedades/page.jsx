'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "./property-card"
import { Search, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react'
import Link from 'next/link';
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
    const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/user/${userId}`)
    // const response = await fetch(`http://localhost:3001/api/property/user/${userId}`)

    if (!response.ok) {
      throw new Error('Ocurrio un error consultando la base de datos')
    }

    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties
  })

  const properties = data || []

  // Filtrar propiedades por ciudad
  const filteredProperties = properties.filter(property =>
    property?.city?.toLowerCase().includes(searchCity.toLowerCase())
  )

  // Calcular páginas
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
        <div className="">
          <h1 className="text-5xl font-spaceGrotesk font-bold ">Mis Propiedades</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
           {/* Agregar nueva propiedad */}
          <Link href="/arrendador-dashboard/nueva-propiedad">
            <Button variant="outline" className="h-4/5 w-full flex flex-row items-center justify-center gap-2 bg-[#1C2671] text-neutral-50">
              <PlusCircle className="h-12 w-12" />
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
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>


      {/* Paginación */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className = "bg-[#1C2671] text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className = "bg-[#1C2671] text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

