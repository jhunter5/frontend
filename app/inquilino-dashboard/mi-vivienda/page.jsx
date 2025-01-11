"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ArrowLeft, MapPin, Home, Bed, Car, Bath, Calendar, Ruler, Building, Info, DollarSign, PenToolIcon as Tool, X, CreditCard } from 'lucide-react'
import Link from "next/link"

// En un caso real, esto vendría de tu base de datos
const getProperty = (id) => ({
  id,
  images: [
    "https://images.unsplash.com/photo-1504615755583-2916b52192a3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504615755583-2916b52192a3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504615755583-2916b52192a3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  precio: 450000,
  enArriendo: false,
})

export default function PropertyDetails({ params }) {
  const [property, setProperty] = useState(getProperty(params.id))
  const [showDialog, setShowDialog] = useState(false)
  const [dialogAction, setDialogAction] = useState('')

  const handleAction = () => {
    if (dialogAction === 'cancel') {
      setProperty(prev => ({ ...prev, enArriendo: false }))
    } else if (dialogAction === 'pay') {
      // Aquí iría la lógica para procesar el pago
    }
    setShowDialog(false)
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors">
          <Link href="/inquilino-dashboard/buscador-propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Buscador
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-primary-500 text-white">
          <CardTitle className="text-3xl font-bold">Mi Vivienda</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8">
            {/* Galería de imágenes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {property.images.map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={image}
                    alt={`Vista ${index + 1} de la propiedad`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Información principal */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white shadow-md">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600">
                    <MapPin className="h-5 w-5" />
                    Ubicación
                  </h2>
                  <p className="text-gray-700">{property.direccion}</p>
                  <p className="text-gray-700">{property.municipio}, {property.departamento}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600">
                    <Home className="h-5 w-5" />
                    Tipo de Propiedad
                  </h2>
                  <p className="text-gray-700">{property.tipo}</p>
                  <p className="text-gray-700">Piso {property.numeroPiso}</p>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-6" />

            {/* Características */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                { icon: Bed, label: "Habitaciones", value: property.habitaciones },
                { icon: Bath, label: "Baños", value: property.banos },
                { icon: Car, label: "Parqueadero", value: property.parqueadero ? 'Sí' : 'No' },
                { icon: Ruler, label: "Metros Cuadrados", value: `${property.metrosCuadrados} m²` },
                { icon: Building, label: "Estrato", value: property.estrato },
                { icon: Calendar, label: "Antigüedad", value: `${property.antiguedad} años` },
              ].map((item, index) => (
                <Card key={index} className="bg-white shadow-md">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium text-gray-800">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Descripción */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600">
                  <Info className="h-5 w-5" />
                  Descripción
                </h2>
                <p className="text-gray-700 leading-relaxed">{property.descripcion}</p>
              </CardContent>
            </Card>

            {/* Precio */}
            <Card className="bg-green-600 text-white shadow-md">
              <CardContent className="p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Canon Arrendamiento</h2>
                <p className="text-3xl font-bold flex items-center">
                  <DollarSign className="h-8 w-8 mr-2" />
                  {property.precio.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex flex-wrap justify-end gap-4">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-blue-600 border-blue-600" asChild>
              <Link href={`/inquilino-dashboard/mantenimiento`}>
                  <Tool className="mr-2 h-4 w-4" />
                  Solicitar Mantenimiento
                </Link>
              </Button>
              <Button
                onClick={() => {
                  setDialogAction('cancel')
                  setShowDialog(true)
                }}
                disabled={!property.enArriendo}
                className="bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <X className="mr-2 h-4 w-4" />
                {property.enArriendo ? 'Cancelar arriendo' : 'No disponible'}
              </Button>
              <Button
                onClick={() => {
                  setDialogAction('pay')
                  setShowDialog(true)
                }}
                disabled={!property.enArriendo}
                className="bg-green-600 text-white hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {property.enArriendo ? 'Pagar arriendo' : 'No disponible'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogAction === 'cancel' ? 'Cancelar arriendo' : 'Pagar arriendo'}</DialogTitle>
            <DialogDescription>
              {dialogAction === 'cancel'
                ? '¿Estás seguro de que quieres cancelar el arriendo?'
                : '¿Deseas proceder con el pago del arriendo?'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancelar</Button>
            <Button onClick={handleAction} className={dialogAction === 'cancel' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-500'}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

