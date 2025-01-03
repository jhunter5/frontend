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

// En un caso real, esto vendría de tu API
const getProperty = (id) => ({
  id,
  direccion: "Calle Principal 123",
  municipio: "Ciudad Ejemplo",
  departamento: "Departamento Ejemplo",
  tipo: "apartamento",
  habitaciones: 3,
  parqueadero: "si",
  metrosCuadrados: 120,
  estrato: 4,
  banos: 2,
  antiguedad: 5,
  descripcion: "Hermoso apartamento con vista panorámica a la ciudad. Ubicado en una zona tranquila y segura, cerca de parques y centros comerciales. Ideal para familias jóvenes o profesionales.",
  numeroPiso: 8,
  precio: 450000,
})

export default function EditProperty({ params }) {
  const router = useRouter()
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    // En un caso real, aquí harías una llamada a tu API
    const propertyData = getProperty(params.id)
    setFormData(propertyData)
  }, [params.id])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos actualizados a tu API
    console.log(formData)
    // Redirigir a la vista detallada de la propiedad después de guardar
    router.push(`/arrendatario-dashboard/propiedades/${params.id}`)
  }

  if (!formData) return <div>Cargando...</div>

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/arrendatario-dashboard/propiedades/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a detalles de la propiedad
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Editar Propiedad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <Select name="tipo" value={formData.tipo} onValueChange={(value) => handleSelectChange('tipo', value)} required>
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
                <Select name="parqueadero" value={formData.parqueadero} onValueChange={(value) => handleSelectChange('parqueadero', value)} required>
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
              <div className="space-y-2">
                <Label htmlFor="precio">Precio</Label>
                <Input id="precio" name="precio" type="number" value={formData.precio} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

