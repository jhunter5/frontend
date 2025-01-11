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
    <div className="container mx-auto py-8">
    <div className="mb-6">
      <Button variant="ghost" asChild>
        <Link href="/arrendador-dashboard/propiedades">
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
          {/* Comentado hasta su reparacion */}
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    Ubicación
                  </h2>
                  <p>{data.property.address.charAt(0).toUpperCase() + data.property.address.slice(1)}</p>
                  <p>{data.property.city.charAt(0).toUpperCase() + data.property.city.slice(1)}, {data.property.state.charAt(0).toUpperCase() + data.property.state.slice(1)}</p>
                  </div>
                  <div className="space-y-2">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    Tipo de Propiedad
                  </h2>
                  <p>{data.property.type.charAt(0).toUpperCase() + data.property.type.slice(1)}</p>
                  <p>Piso {data.property.floors}</p>
                  </div>
                </div>

                <Separator />

                {/* Características */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Habitaciones</p>
                <p className="font-medium">{data.property.rooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Baños</p>
                <p className="font-medium">{data.property.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Parqueadero</p>
                <p className="font-medium">{data.property.parking !== 0 ? `Sí, ${data.property.parking}` : 'No'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Metros Cuadrados</p>
                <p className="font-medium">{data.property.squareMeters} m²</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Estrato</p>
                <p className="font-medium">{data.property.tier}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Antigüedad</p>
                <p className="font-medium">{data.property.age} años</p>
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
            <p className="text-muted-foreground">{data.property.description}</p>
          </div>

          {/* Precio */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Canon de Arrendamiento</h2>
          {data.contract !== null ? (
            <p className="text-3xl font-bold text-green-600">${data.contract.monthlyRent.toLocaleString()}</p>
          ) : (
            <p className="text-3xl font-bold text-red-600">Aún no arrendada</p>
          )}
          </div>

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
                <Link href={''} className='bg-danger-400'>
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
          <Button onClick={handleDelete} className="bg-danger-400">Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

