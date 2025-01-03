'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "./property-card"
import { Search, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react'
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

// Ejemplo de datos de propiedades
const properties = [
  {
    id: 1,
    image: "https://www.360agenciainmobiliaria.com/inmuebles/20200611190646_96924e41-0e9c-4c63-9ac8-565b66ea301f.jpg",
    address: "74C Aaliyah River, Bayerhaven",
    agency: "DreamHouse Realty",
    ocuped: true,
    bedrooms: 2,
    area: 95,
    city: "Bogota"
  },
  {
    id: 2,
    image: "https://www.360agenciainmobiliaria.com/inmuebles/20200611190646_96924e41-0e9c-4c63-9ac8-565b66ea301f.jpg",
    address: "Suite 756 031 Ines Riverway",
    agency: "Trails Real Estate",
    ocuped: false,
    bedrooms: 2,
    area: 45,
    city: "Bogota"
  },
  {
    id: 3,
    image: "https://www.360agenciainmobiliaria.com/inmuebles/20200611190646_96924e41-0e9c-4c63-9ac8-565b66ea301f.jpg",
    address: "Suite 756 031 Ines Riverway",
    agency: "Trails Real Estate",
    ocuped: true,
    bedrooms: 2,
    area: 100,
    city: "Villa Leyva"
  },
  {
    id: 4,
    image: "https://www.360agenciainmobiliaria.com/inmuebles/20200611190646_96924e41-0e9c-4c63-9ac8-565b66ea301f.jpg",
    address: "Suite 756 031 Ines Riverway",
    agency: "Trails Real Estate",
    ocuped: false,
    bedrooms: 2,
    area: 75,
    city: "Bogota"
  },
  {
    id: 5,
    image: "https://www.360agenciainmobiliaria.com/inmuebles/20200611190646_96924e41-0e9c-4c63-9ac8-565b66ea301f.jpg",
    address: "Suite 756 031 Ines Riverway",
    agency: "Trails Real Estate",
    ocuped: false,
    bedrooms: 2,
    area: 50,
    city: "Chía"
  },
  {
    id: 20,
    image: "https://www.360agenciainmobiliaria.com/inmuebles/20200611190646_96924e41-0e9c-4c63-9ac8-565b66ea301f.jpg",
    address: "Suite 756 031 Ines Riverway",
    agency: "Trails Real Estate",
    ocuped: true,
    bedrooms: 2,
    area: 100,
    city: "Soacha"
  },
  {
    id: 7,
    image: "https://www.360agenciainmobiliaria.com/inmuebles/20200611190646_96924e41-0e9c-4c63-9ac8-565b66ea301f.jpg",
    address: "Suite 756 031 Ines Riverway",
    agency: "Trails Real Estate",
    ocuped: false,
    bedrooms: 2,
    area: 85,
    city: "Villavicencio"
  }
  // Añade más propiedades según sea necesario
]

const ITEMS_PER_PAGE = 6

export default function PropertiesPage() {
  const [searchCity, setSearchCity] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Filtrar propiedades por ciudad
  const filteredProperties = properties.filter(property =>
    property.city.toLowerCase().includes(searchCity.toLowerCase())
  )

  // Calcular páginas
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Mis Propiedades</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ciudad..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Agregar nueva propiedad */}
      <Link href="/arrendatario-dashboard/nueva-propiedad" className="block">
        <Card className="h-full">
          <CardContent className="flex items-center justify-center h-full">
            <Button variant="ghost" className="h-full w-full flex flex-col items-center justify-center gap-2">
              <PlusCircle className="h-12 w-12" />
              <span className="text-lg font-semibold">Agregar nueva propiedad</span>
            </Button>
          </CardContent>
        </Card>
      </Link>

      {/* Paginación */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
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
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

