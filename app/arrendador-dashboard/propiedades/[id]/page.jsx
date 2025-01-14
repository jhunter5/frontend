"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Home, Bed, Car, Bath, Calendar, Ruler, Building, Info } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'


const fetchProperty = async (id) => {
  const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/${id}`)
  if (!response.ok) {
    throw new Error('No se pudo cargar la propiedad')
  }
  return response.json()
}

export default function PropertyDetails({ params }) {
  const [showRentDialog, setShowRentDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { toast } = useToast()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['property', params.id],
    queryFn: () => fetchProperty(params.id),
  })

  const handleRent = () => {
    setProperty(prev => ({ ...prev, enArriendo: true }))
    setShowRentDialog(false)
  }

  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/${params.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('No se pudo eliminar la propiedad')
      }

      return response.json()
    },
    onSuccess: () => {
      toast({
        title: 'Propiedad eliminada',
        description: 'La propiedad ha sido eliminada exitosamente.',
        status: 'success',
      })
      router.push('/arrendador-dashboard/propiedades')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al eliminar la propiedad',
        status: 'error',
        variant: 'destructive',
      })
    }
  })

  const deleteProperty = () => {
    deleteMutation.mutate()
  }

  const handleDelete = () => {
    deleteProperty()
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <p>Cargando...</p>
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors font-inter">
          <Link href="/arrendador-dashboard/propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a propiedades
          </Link>
        </Button>
      </div>

    <Card className="overflow-hidden shadow-lg">
      <CardHeader>
        <CardTitle className="text-5xl font-bold font-spaceGrotesk">Detalles de la Propiedad</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6">
          {/* Galería de imágenes */}
          <div className="grid grid-cols-3 gap-4">
            {data.media.map((image, index) => (
              <img
                key={index}
                src={image.mediaUrl}
                alt={`Vista ${index + 1} de la propiedad`}
                className="rounded-lg object-cover w-full h-48"
              />
            ))}
          </div>

          {/* Información principal */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white shadow-md">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600 font-spaceGrotesk">
                  <MapPin className="h-5 w-5" />
                  Ubicación
                </h2>
                <p className='text-gray-700 font-inter'>{data.property.address.charAt(0).toUpperCase() + data.property.address.slice(1)}</p>
                <p className='text-gray-700 font-inter'>{data.property.city.charAt(0).toUpperCase() + data.property.city.slice(1)}, {data.property.state.charAt(0).toUpperCase() + data.property.state.slice(1)}</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <CardContent className="p-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600 font-spaceGrotesk">
                <Home className="h-5 w-5" />
                Tipo de Propiedad
              </h2>
              <p className='text-gray-700 font-inter'>{data.property.type.charAt(0).toUpperCase() + data.property.type.slice(1)}</p>
              <p className='text-gray-700 font-inter'>Piso {data.property.floors}</p>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-6" />

          {/* Características */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
                { icon: Bed, label: "Habitaciones", value: data.property.rooms },
                { icon: Bath, label: "Baños", value: data.property.bathrooms },
                { icon: Car, label: "Parqueadero", value: data.property.parking !== 0 ? `Sí, ${data.property.parking}` : 'No' },
                { icon: Ruler, label: "Metros Cuadrados", value: `${data.property.squareMeters} m²` },
                { icon: Building, label: "Estrato", value: data.property.tier },
                { icon: Calendar, label: "Antigüedad", value: `${data.property.age} años` },
              ].map((item, index) => (
                <Card key={index} className="bg-white shadow-md">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-m text-gray-500 font-spaceGrotesk">{item.label}</p>
                      <p className="font-medium text-gray-800 font-inter">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <Separator className="my-6"/>

          {/* Descripción */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600 font-spaceGrotesk">
                <Info className="h-5 w-5"/>
                Descripción
              </h2>
              <p className="text-muted-foreground leading-relaxed font-inter">{data.property.description}</p>
            </CardContent>
          </Card>

          {/* Precio */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
            <h2 className="text-3xl font-bold font-spaceGrotesk">Canon de Arrendamiento</h2>
          {data.contract !== null ? (
            <p className="text-2xl font-bold text-green-600 font-inter">${data.contract.monthlyRent.toLocaleString()}</p>
          ) : (
            <p className="text-2xl font-bold text-red-600 font-inter">Aún no arrendada</p>
          )}
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link href={`/arrendador-dashboard/propiedades/${params.id}/edit`}>
                Editar propiedad
              </Link>
            </Button>
            <Button onClick={() => setShowRentDialog(true)} disabled={data.contract !== null} className="bg-[#1C2671] text-white">
              {data.contract !== null ? 'En arriendo' : 'Poner en arriendo'}
            </Button>
            {data.contract === null && (
              <Button asChild onClick={() => setShowDeleteDialog(true)}>
                <Link href={''} className='bg-danger-300'>
                  Eliminar Propiedad
                </Link>
              </Button>
            )}
            {data.contract !== null && (
              <Button asChild>
                <Link href={`/arrendador-dashboard/inquilinos/${data.contract.tenant}`}>
                  Ver perfil del inquilino
                </Link>
              </Button>
            )}
            {data.contract !== null && (
              <Button asChild>
                <Link href={`/arrendador-dashboard/contratos/${data.contract._id}`}>
                  Ver contrato
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>

    <Dialog open={showRentDialog} onOpenChange={setShowRentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar arriendo</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres poner esta propiedad en arriendo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowRentDialog(false)}>Cancelar</Button>
          <Button onClick={handleRent}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Eliminacion</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar esta propiedad?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDelete} className="bg-danger-300">Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

