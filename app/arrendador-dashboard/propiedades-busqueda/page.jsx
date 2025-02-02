'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { OpenPropertyCard } from "./openPropertyCard"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PropertyDetails } from "./property-details"

// Ejemplo de datos de propiedades en búsqueda de arriendo
const propertiesForRent = [
  {
    id: '6782b357e02d45b448eb06a8',
    media: [
      {
        "mediaUrl": "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }
    ],
    address: "123 Main St, Cityville",
    price: 1500,
    bedrooms: 2,
    bathrooms: 2,
    area: 80,
    candidates: [
      { id: '677f4017846ec182dd884119', name: "Camilo Cuello", rating: 4.5 },
      { id: 2, name: "Jane Smith", rating: 4.2 },
      { id: 3, name: "Alice Johnson", rating: 4.8 },
      { id: 4, name: "Bob Williams", rating: 4.0 },
    ]
  },
  {
    id: 2,
    media: [
      {
        "mediaUrl": "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }
    ],
    address: "456 Oak Ave, Townsburg",
    price: 2000,
    bedrooms: 3,
    bathrooms: 2,
    area: 100,
    candidates: [
      { id: 5, name: "Charlie Brown", rating: 4.3 },
      { id: 6, name: "Diana Prince", rating: 4.7 },
    ]
  },
  // Añade más propiedades según sea necesario
]

const ITEMS_PER_PAGE = 6

export default function PropertiesForRentPage() {
  const [searchAddress, setSearchAddress] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Filtrar propiedades por dirección
  const filteredProperties = propertiesForRent.filter(property =>
    property.address.toLowerCase().includes(searchAddress.toLowerCase())
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
          <OpenPropertyCard 
            key={property.id} 
            property={property} 
            onClick={() => setSelectedProperty(property)}
          />
        ))}
      </div>

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

      {/* Diálogo para mostrar detalles de la propiedad y candidatos */}
      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && setSelectedProperty(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className='font-spaceGrotesk'>Detalles de la Propiedad</DialogTitle>
          </DialogHeader>
          {selectedProperty && <PropertyDetails property={selectedProperty} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

