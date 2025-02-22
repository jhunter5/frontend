"use client"
import { useState} from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Home, Bed, Car, Bath, Calendar, Ruler, Building, Info } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'


const fetchProperty = async (id) => {
  const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${id}`)
  

  if (!response.ok) {
    throw new Error('No se pudo cargar la propiedad')
  }
  return response.json()
}

export default function PropertyDetails({ params }) {
  const [showRentDialog, setShowRentDialog] = useState(false)
  const [showUnrentDialog, setShowUnrentDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [rentPrice, setRentPrice] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['property', params.id],
    queryFn: () => fetchProperty(params.id),
  }) 

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${params.id}`, {
      //   method: 'DELETE',
      // })

      const response = await fetch(`http://localhost:3001/api/property/${params.id}`, {
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

  const setAvailable = useMutation({
    mutationFn: async ({rentPrice}) => {
      // const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${params.id}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ isAvailable: true, rentPrice })
      // })

      const response = await fetch(`http://localhost:3001/api/property/onSearch/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAvailable: true, rentPrice })
      })

      if (!response.ok) {
        throw new Error('No se pudo poner la propiedad en busqueda de arriendo')
      }

      return response.json()
    },
    onSuccess: () => {
      toast({
        title: 'Propiedad en busqueda de arriendo',
        description: 'La propiedad ha sido puesta en busqueda de arriendo exitosamente.',
        status: 'success',
      })
      router.push('/arrendador-dashboard/propiedades-busqueda')
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al poner la propiedad en busqueda de arriendo',
        status: 'error',
        variant: 'destructive',
      })
    }
  })

  const handleRent = () => {
    if (!rentPrice || rentPrice === '') {
      toast({
        title: "Error",
        description: "Por favor ingresa el precio de arrendamiento",
        status: "error",
        variant: "destructive",
      });
      return;
    }
    setAvailable.mutate({rentPrice})
    setShowRentDialog(false)
  }

  const setUnavailable = useMutation({
    mutationFn: async () => {
      const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isAvailable: false })
      })

      if (!response.ok) {
        throw new Error('No se pudo quitar la propiedad de busqueda de arriendo')
      }

      return response.json()
    },
    onSuccess: () => {
      toast({
        title: 'Propiedad fuera de busqueda de arriendo',
        description: 'La propiedad ha sido quitada de busqueda de arriendo exitosamente.',
        status: 'success',
      })
      queryClient.invalidateQueries(['property', params.id]);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al quitar la propiedad de busqueda de arriendo',
        status: 'error',
        variant: 'destructive',
      })
    }
  })

  const handleUnrent = () => {
    setUnavailable.mutate()
    setShowUnrentDialog(false)
  }
  
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
            <h2 className="text-4xl font-bold font-spaceGrotesk">Canon de Arrendamiento</h2>
          {data.contract !== null ? (
            <p className="text-4xl font-bold text-green-600 font-inter">${data.contract.monthlyRent.toLocaleString()}</p>
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
            {data.contract === null && (
              data.property.isAvailable === true ? (
                <Button asChild className='bg-warning-400' onClick={() => setShowUnrentDialog(true)}>
                <Link href={''} >
                  Dejar busqueda de arriendo
                </Link>
                </Button>
              ) : (
                <Button asChild onClick={() => setShowRentDialog(true)} className='bg-primary-500'>
                  <Link href={''} >
                    Poner en busqueda de arriendo
                  </Link>
                </Button>
              )
            )}
            {data.contract === null && (
              <Button asChild onClick={() => setShowDeleteDialog(true)} className='bg-danger-400'>
                <Link href={''} >
                  Eliminar Propiedad
                </Link>
              </Button>
            )}
            {data.contract !== null && (
              <Button asChild className="bg-[#1C2671] text-white">
                <Link href={`/arrendador-dashboard/inquilinos/${data.contract.tenantAuthID}`}>
                  Ver perfil del inquilino
                </Link>
              </Button>
            )}
            {data.contract !== null && (
              <Button asChild className="bg-[#1C2671] text-white">
                <Link href={`/arrendador-dashboard/contratos/ver/${data.contract.id}`}>
                  Ver contrato
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>

    <Dialog open={showUnrentDialog} onOpenChange={setShowUnrentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar desistir busqueda arriendo</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres que esta propiedad deje de buscar arriendo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowUnrentDialog(false)}>Cancelar</Button>
          <Button onClick={handleUnrent} className='bg-warning-400'>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={showRentDialog} onOpenChange={setShowRentDialog}>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar busqueda de arriendo</DialogTitle>
        <DialogDescription>
        ¿Estás seguro de que quieres poner esta propiedad en busqueda de arriendo?
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4">
        <label htmlFor="rentPrice" className="block text-sm font-medium text-gray-950">
        Precio de Arrendamiento
        </label>
        <Input
        type="number"
        id="rentPrice"
        name="rentPrice"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
        placeholder="Ingrese el precio de arrendamiento"
        onChange={(e) => setRentPrice(e.target.value)}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setShowRentDialog(false)}>Cancelar</Button>
        <Button onClick={handleRent} className='bg-primary-500'>Confirmar</Button>
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

