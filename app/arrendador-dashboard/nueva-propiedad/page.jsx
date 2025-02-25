"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Upload,
  X,
  Home,
  MapPin,
  Building2,
  Bed,
  Bath,
  Car,
  Square,
  Building,
  Clock,
  StepBackIcon as Stairs,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from "@auth0/auth0-react"

export default function NewProperty() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    type: "",
    rooms: "",
    parking: "",
    squareMeters: "",
    tier: "",
    bathrooms: "",
    age: "",
    description: "",
    floors: "",
  })
  const [images, setImages] = useState([])
  const { toast } = useToast()
  const { user } = useAuth0()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prevImages) => [...prevImages, ...newImages])
  }

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const propertyCreation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property", {
        method: "POST",
        body: data,
      })

      if (!response.ok) {
        throw new Error("Error creating property")
      }

      return response.json()
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const formDataToSend = new FormData()

    formDataToSend.append("landlordAuthID", getAuth0Id(user.sub))

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })

    images.forEach((image) => {
      formDataToSend.append("files", image.file)
    })

    propertyCreation.mutate(formDataToSend, {
      onSuccess: () => {
        toast({
          title: "Propiedad creada",
          description: "La propiedad ha sido creada exitosamente",
          status: "success",
        })
        router.push("/arrendador-dashboard/propiedades")
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Ha ocurrido un error al crear la propiedad",
          status: "error",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <Button variant="outline" asChild className="group hover:bg-slate-100 transition-colors">
          <Link href="/arrendador-dashboard/propiedades">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver a propiedades
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Agregar Nueva Propiedad</h1>
          <p className="text-slate-500">Complete los detalles de la propiedad que desea publicar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sección de Imágenes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-500" />
                Imágenes de la Propiedad
              </CardTitle>
              <CardDescription>
                Sube fotos claras y de buena calidad de tu propiedad. Recomendamos incluir fotos de todas las
                habitaciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-sm transition-transform group-hover:scale-[1.02]"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Eliminar imagen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="aspect-square flex flex-col items-center justify-center text-muted-foreground border-dashed hover:border-blue-500 hover:text-blue-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Subir foto</span>
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
            </CardContent>
          </Card>

          {/* Sección de Ubicación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
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
              </div>
            </CardContent>
          </Card>

          {/* Sección de Características */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-500" />
                Características de la Propiedad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    Tipo de Propiedad
                  </Label>
                  <Select name="type" onValueChange={(value) => handleSelectChange("type", value)} required>
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
                  <Label htmlFor="rooms" className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-slate-500" />
                    Habitaciones
                  </Label>
                  <Input
                    id="rooms"
                    name="rooms"
                    type="number"
                    value={formData.rooms}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms" className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-slate-500" />
                    Baños
                  </Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parking" className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-slate-500" />
                    Parqueaderos
                  </Label>
                  <Input
                    id="parking"
                    name="parking"
                    type="number"
                    value={formData.parking}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="squareMeters" className="flex items-center gap-2">
                    <Square className="h-4 w-4 text-slate-500" />
                    Metros Cuadrados
                  </Label>
                  <Input
                    id="squareMeters"
                    name="squareMeters"
                    type="number"
                    value={formData.squareMeters}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier" className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-slate-500" />
                    Estrato
                  </Label>
                  <Input id="tier" name="tier" type="number" value={formData.tier} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    Antigüedad (años)
                  </Label>
                  <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floors" className="flex items-center gap-2">
                    <Stairs className="h-4 w-4 text-slate-500" />
                    Número de Piso
                  </Label>
                  <Input
                    id="floors"
                    name="floors"
                    type="number"
                    value={formData.floors}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sección de Descripción */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Descripción
              </CardTitle>
              <CardDescription>
                Describe detalladamente tu propiedad. Incluye características especiales, acabados, reformas recientes,
                etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-[150px]"
                placeholder="Describe tu propiedad..."
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg transition-colors"
            >
              Publicar Propiedad
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

