'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useQuery, useMutation } from '@tanstack/react-query'
import { useToast } from "@/hooks/use-toast"

const fetchProperty = async (id) => {
  const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${id}`)
  if (!response.ok) {
    throw new Error('No se pudo cargar la propiedad')
  }
  return response.json()
}

export default function EditProperty({ params }) {
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const { toast } = useToast();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['property', params.id],
    queryFn: () => fetchProperty(params.id),
  })

  useEffect(() => {
    if (!isPending){
      setFormData(data)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      property: {
        ...prevState.property,
        [name]: value
      }
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      property: {
        ...prevState.property,
        [name]: value
      }
    }))
  }

  const propertyEdition = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Error editing property')
      }

      return response.json()
  }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedFormData = {
      ...formData
    };

    const dataUpdate = {
      address: updatedFormData.property.address,
      city: updatedFormData.property.city,
      state: updatedFormData.property.state,
      type: updatedFormData.property.type,
      rooms: updatedFormData.property.rooms,
      bathrooms: updatedFormData.property.bathrooms,
      parking: updatedFormData.property.parking,
      squareMeters: updatedFormData.property.squareMeters,
      tier: updatedFormData.property.tier,
      age: updatedFormData.property.age,
      description: updatedFormData.property.description,
      floors: updatedFormData.property.floors,
    }

    console.log(dataUpdate)

    propertyEdition.mutate(dataUpdate,
      {
        onSuccess: () => {
          toast({
            title: 'Propiedad actualizada',
            description: 'La propiedad ha sido actualizada correctamente',
            status: 'success',
          })
          router.push(`/arrendador-dashboard/propiedades/${params.id}`)
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: 'Ha ocurrido un error al actualizar la propiedad, Intente nuevamente',
            status: 'error',
            variant: 'destructive',
          })
        }
      }
    )
  }

  if (isPending) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar la propiedad: {error.message}</div>
  if (!formData) return null

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors font-inter">
          <Link href={`/arrendador-dashboard/propiedades/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a detalles de la propiedad
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold font-spaceGrotesk">Editar Propiedad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="direccion" className="font-spaceGrotesk">Dirección</Label>
                <Input id="address" name="address" value={formData.property.address} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipio" className="font-spaceGrotesk">Municipio</Label>
                <Input id="city" name="city" value={formData.property.city} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="departamento" className="font-spaceGrotesk" >Departamento</Label>
                <Input id="state" name="state" value={formData.property.state} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo" className="font-spaceGrotesk" >Tipo de Propiedad</Label>
                <Select name="type" value={formData.property.type} onValueChange={(value) => handleSelectChange('tipo', value)} required className="font-inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="oficina">Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="habitaciones" className="font-spaceGrotesk">Habitaciones</Label>
                <Input id="rooms" name="rooms" type="number" value={formData.property.rooms} onChange={handleChange} required className="font-inter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="banos" className="font-spaceGrotesk">Baños</Label>
                <Input id="bathrooms" name="bathrooms" type="number" value={formData.property.bathrooms} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parqueadero" className="font-spaceGrotesk">Parqueadero</Label>
                <Input id="parking" name="parking" type="number" value={formData.property.parking} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrosCuadrados" className="font-spaceGrotesk">Metros Cuadrados</Label>
                <Input id="squareMeters" name="squareMeters" type="number" value={formData.property.squareMeters} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estrato" className="font-spaceGrotesk">Estrato</Label>
                <Input id="tier" name="tier" type="number" value={formData.property.tier} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="antiguedad" className="font-spaceGrotesk">Antigüedad (años)</Label>
                <Input id="age" name="age" type="number" value={formData.property.age} onChange={handleChange} required className="font-inter"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroPiso" className="font-spaceGrotesk" >Número de Piso</Label>
                <Input id="floors" name="floors" type="number" value={formData.property.floors} onChange={handleChange} required className="font-inter"/>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion" className="font-spaceGrotesk">Descripción</Label>
              <Textarea id="description" name="description" value={formData.property.description} onChange={handleChange} required  className="font-inter"/>
            </div>
            <div className="flex justify-end">
              <Button type="submit " className="bg-[#1C2671] text-neutral-50 font-inter font-bold">Guardar Cambios</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

