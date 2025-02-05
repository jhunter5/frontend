'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from "next/link"
import { useMutation } from '@tanstack/react-query'
import { useToast } from "@/hooks/use-toast"
import { getAuth0Id } from '@/app/utils/getAuth0id'
import { useAuth0 } from '@auth0/auth0-react'

export default function NewProperty() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    type: '',
    rooms: '',
    parking: '',
    squareMeters: '',
    tier: '',
    bathrooms: '',
    age: '',
    description: '',
    floors: '',
    // precio: '',
  })
  const [images, setImages] = useState([])
  const { toast } = useToast();
  const { user } = useAuth0()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prevImages => [...prevImages, ...newImages])
  }

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const propertyCreation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('https://backend-khaki-three-90.vercel.app/api/property', {
        method: 'POST',
        body: data,
      })

      if (!response.ok) {
        throw new Error('Error creating property')
      }

      return response.json()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    
    formDataToSend.append('landlordAuthID', getAuth0Id(user.sub))

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })

    images.forEach(image => {
      formDataToSend.append('files', image.file); 
    });
    
    for (let [key, value] of formDataToSend.entries()) {
      if (key === 'files') {
        console.log(`Clave: ${key}, Archivo: ${value.name}`); // Imprime el nombre del archivo
      } else {
        console.log(`Clave: ${key}, Valor: ${value}`); // Imprime los otros campos
      }
    }

    propertyCreation.mutate(formDataToSend,
      {
        onSuccess: () => {
          toast({
            title: 'Propiedad creada',
            description: 'La propiedad ha sido creada exitosamente',
            status: 'success',
          })

          router.push('/arrendador-dashboard/propiedades')
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Ha ocurrido un error al crear la propiedad',
            status: 'error',
            variant: 'destructive',
          })
        }
      }
    )
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
          <CardTitle className="text-2xl font-bold">Agregar Nueva Propiedad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="images">Imágenes de la propiedad</Label>
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image.preview} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      aria-label="Eliminar imagen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-24 h-24 flex flex-col items-center justify-center text-muted-foreground"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mb-2" />
                  Subir
                </Button>
              </div>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Municipio</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Departamento</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Propiedad</Label>
                <Select name="type" onValueChange={(value) => handleSelectChange('type', value)} required>
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
                <Label htmlFor="rooms">Habitaciones</Label>
                <Input id="rooms" name="rooms" type="number" value={formData.rooms} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Baños</Label>
                <Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parking">Parqueadero</Label>
                <Input id="parking" name="parking" type="number" value={formData.parking} onChange={handleChange} required />
                {/* <Select name="parking" onValueChange={(value) => handleSelectChange('parking', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="¿Tiene parqueadero?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="si">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
              <div className="space-y-2">
                <Label htmlFor="squareMeters">Metros Cuadrados</Label>
                <Input id="squareMeters" name="squareMeters" type="number" value={formData.squareMeters} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tier">Estrato</Label>
                <Input id="tier" name="tier" type="number" value={formData.tier} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Antigüedad (años)</Label>
                <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floors">Número de Piso</Label>
                <Input id="floors" name="floors" type="number" value={formData.floors} onChange={handleChange} required />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="precio">Precio</Label>
                <Input id="precio" name="precio" type="number" value={formData.precio} onChange={handleChange} required />
              </div> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-[#1C2671] text-neutral-50 font-inter font-bold">Guardar Propiedad</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

