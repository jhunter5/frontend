'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { OpenPropertyCard } from "./openPropertyCard"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PropertyDetails } from "./property-details"
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useQuery } from "@tanstack/react-query"

const ITEMS_PER_PAGE = 6

export default function PropertiesForRentPage() {
  const [searchAddress, setSearchAddress] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const { user } = useAuth0()

  const fetchPropertiesOnDemand = async () => {
    const userId = getAuth0Id(user.sub)
    const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/landlord/${userId}`)

    if (!response.ok) {
      throw new Error('Ocurrio un error consultando la base de datos')
    }

    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchPropertiesOnDemand
  })

  if (isPending) return <p>Cargando propiedades...</p>
  if (isError) return <p>Ocurrió un error: {error.message}</p>

  const propertiesForRent = data || []
  console.log(propertiesForRent)

  // Filtrar propiedades por dirección
  const filteredProperties = propertiesForRent.filter(property =>
    property?.direccion?.toLowerCase().includes(searchAddress.toLowerCase())
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
            key={property._id} 
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

