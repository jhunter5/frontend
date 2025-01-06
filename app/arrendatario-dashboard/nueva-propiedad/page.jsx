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

export default function NewProperty() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    direccion: '',
    municipio: '',
    departamento: '',
    tipo: '',
    habitaciones: '',
    parqueadero: '',
    metrosCuadrados: '',
    estrato: '',
    banos: '',
    antiguedad: '',
    descripcion: '',
    numeroPiso: '',
    precio: '',
  })
  const [images, setImages] = useState([])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos y las imágenes a tu API
    console.log(formData)
    console.log(images)
    // Redirigir a la lista de propiedades después de guardar
    router.push('/arrendatario-dashboard/propiedades')
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
                <Input id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipio">Municipio</Label>
                <Input id="municipio" name="municipio" value={formData.municipio} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input id="departamento" name="departamento" value={formData.departamento} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Propiedad</Label>
                <Select name="tipo" onValueChange={(value) => handleSelectChange('tipo', value)} required>
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
                <Label htmlFor="habitaciones">Habitaciones</Label>
                <Input id="habitaciones" name="habitaciones" type="number" value={formData.habitaciones} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="banos">Baños</Label>
                <Input id="banos" name="banos" type="number" value={formData.banos} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parqueadero">Parqueadero</Label>
                <Select name="parqueadero" onValueChange={(value) => handleSelectChange('parqueadero', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="¿Tiene parqueadero?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="si">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrosCuadrados">Metros Cuadrados</Label>
                <Input id="metrosCuadrados" name="metrosCuadrados" type="number" value={formData.metrosCuadrados} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estrato">Estrato</Label>
                <Input id="estrato" name="estrato" type="number" value={formData.estrato} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="antiguedad">Antigüedad (años)</Label>
                <Input id="antiguedad" name="antiguedad" type="number" value={formData.antiguedad} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroPiso">Número de Piso</Label>
                <Input id="numeroPiso" name="numeroPiso" type="number" value={formData.numeroPiso} onChange={handleChange} required />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="precio">Precio</Label>
                <Input id="precio" name="precio" type="number" value={formData.precio} onChange={handleChange} required />
              </div> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
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

