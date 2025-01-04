"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Home, Bed, Car, Bath, Calendar, Ruler, Building, Info } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

// En un caso real, esto vendría de tu base de datos
const getProperty = (id) => ({
  id,
  images: [
    "https://pics.nuroa.com/vivienda_exclusiva_en_venta_bogota_bogota_d_c_6420003734784958600.jpg",
    "https://pics.nuroa.com/vivienda_exclusiva_en_venta_bogota_bogota_d_c_6420003734784958600.jpg",
    "https://pics.nuroa.com/vivienda_exclusiva_en_venta_bogota_bogota_d_c_6420003734784958600.jpg",
  ],
  direccion: "Calle Principal 123",
  municipio: "Ciudad Ejemplo",
  departamento: "Departamento Ejemplo",
  tipo: "Apartamento",
  habitaciones: 3,
  parqueadero: true,
  metrosCuadrados: 120,
  estrato: 4,
  banos: 2,
  antiguedad: 5,
  descripcion: "Hermoso apartamento con vista panorámica a la ciudad. Ubicado en una zona tranquila y segura, cerca de parques y centros comerciales. Ideal para familias jóvenes o profesionales.",
  numeroPiso: 8,
  canon: 2500000,
  enArriendo: true,
  arrendatarioId: 123
})

export default function PropertyDetails({ params }) {
  const [property, setProperty] = useState(getProperty(params.id))
  const [showDialog, setShowDialog] = useState(false)

  const handleRent = () => {
    setProperty(prev => ({ ...prev, enArriendo: true }))
    setShowDialog(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/arrendatario-dashboard/propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a propiedades
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Detalles de la Propiedad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Galería de imágenes */}
            <div className="grid grid-cols-3 gap-4">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Vista ${index + 1} de la propiedad`}
                  className="rounded-lg object-cover w-full h-48"
                />
              ))}
            </div>

            {/* Información principal */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  Ubicación
                </h2>
                <p>{property.direccion}</p>
                <p>{property.municipio}, {property.departamento}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  Tipo de Propiedad
                </h2>
                <p>{property.tipo}</p>
                <p>Piso {property.numeroPiso}</p>
              </div>
            </div>

            <Separator />

            {/* Características */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Habitaciones</p>
                  <p className="font-medium">{property.habitaciones}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Baños</p>
                  <p className="font-medium">{property.banos}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Parqueadero</p>
                  <p className="font-medium">{property.parqueadero ? 'Sí' : 'No'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Metros Cuadrados</p>
                  <p className="font-medium">{property.metrosCuadrados} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Estrato</p>
                  <p className="font-medium">{property.estrato}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Antigüedad</p>
                  <p className="font-medium">{property.antiguedad} años</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Descripción */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                Descripción
              </h2>
              <p className="text-muted-foreground">{property.descripcion}</p>
            </div>

            {/* Precio */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold">Canon de Arrendamiento</h2>
              <p className="text-3xl font-bold text-green-600">${property.canon.toLocaleString()}</p>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline" asChild>
                <Link href={`/arrendatario-dashboard/propiedades/${params.id}/edit`}>
                  Editar propiedad
                </Link>
              </Button>
              <Button onClick={() => setShowDialog(true)} disabled={property.enArriendo}>
                {property.enArriendo ? 'En arriendo' : 'Poner en arriendo'}
              </Button>
              {property.enArriendo && (
                <Button asChild>
                  <Link href={`/arrendatario-dashboard/Inquilino/${property.arrendatarioId}`}>
                    Ver perfil del inquilino
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar arriendo</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres poner esta propiedad en arriendo?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancelar</Button>
            <Button onClick={handleRent}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

