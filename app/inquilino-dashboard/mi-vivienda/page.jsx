"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/components/ui/dialog"
import {
  ArrowLeft,
  MapPin,
  Home,
  Bed,
  Car,
  Bath,
  Calendar,
  Ruler,
  Building,
  Info,
  DollarSign,
  PenToolIcon as Tool,
  X,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  Search,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from "@auth0/auth0-react"
import { cn } from "@/lib/utils"


export default function PropertyDetails({ params }) {
  const [property, setProperty] = useState(null)
  const [images, setImages] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [dialogAction, setDialogAction] = useState("")
  const [currentImage, setCurrentImage] = useState(0)
  const { user } = useAuth0()

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const userId = getAuth0Id(user.sub)
        const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/contract/tenant/active/${userId}`)
        const data = await response.json()

        if (response.ok) {
          const propertyData = data[0].propertyId
          const propertyId = propertyData._id
          const imagesResponse = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/${propertyId}`)
          const imagesData = await imagesResponse.json()

          if (imagesResponse.ok) {
            setImages(imagesData.media.map((item) => item.mediaUrl))
          } else {
            console.error("No se pudieron cargar las imágenes")
          }

          setProperty({
            id: propertyData._id,
            direccion: propertyData.address,
            municipio: propertyData.city,
            departamento: propertyData.state,
            tipo: propertyData.type,
            habitaciones: propertyData.rooms,
            parqueadero: propertyData.parking,
            metrosCuadrados: propertyData.squareMeters,
            estrato: propertyData.tier,
            banos: propertyData.bathrooms,
            antiguedad: propertyData.age,
            descripcion: propertyData.description,
            numeroPiso: propertyData.floors,
            precio: data[0].monthlyRent,
            enArriendo: data[0].status === "1",
          })
        } else {
          console.error("No se encontró propiedad")
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error)
      }
    }

    fetchProperty()
  }, [user])

  const handleAction = () => {
    if (dialogAction === "cancel") {
      setProperty((prev) => ({ ...prev, enArriendo: false }))
    } else if (dialogAction === "pay") {
      // Aquí iría la lógica para procesar el pago
    }
    setShowDialog(false)
  }

  if (!property) {
    return (
      <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen max-w-5xl">
        <div className="mb-4">
          <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors">
            <Link href="/inquilino-dashboard/buscador-propiedades">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Buscador
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <HomeIcon className="w-12 h-12 text-blue-600" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4 text-yellow-900" />
                </div>
              </div>

              <div className="space-y-2 max-w-lg">
                <h2 className="text-2xl font-bold tracking-tight">¡Encuentra tu hogar ideal!</h2>
                <p className="text-gray-500">
                  Actualmente no tienes una vivienda registrada en nuestra plataforma, pero estamos aquí para ayudarte a
                  encontrar el lugar perfecto para ti.
                </p>
              </div>

              <div className="space-y-4 w-full max-w-md">
                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">¿Por qué buscar con nosotros?</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Proceso 100% digital y seguro
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Propiedades verificadas y de calidad
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 text-xs">✓</span>
                        </div>
                        Soporte personalizado en todo el proceso
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" asChild>
                    <Link href="/inquilino-dashboard/buscador-propiedades">
                      Buscar Propiedades
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen max-w-5xl">
      <div className="mb-4">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors">
          <Link href="/inquilino-dashboard/buscador-propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Buscador
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-lg bg-white">
        <CardHeader className="bg-primary-500 text-white py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <HomeIcon className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Mi Vivienda</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-8">
            {/* Galería de imágenes */}
            <div className="space-y-4">
              {images.length > 0 ? (
                <>
                  <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={images[currentImage] || "/placeholder.svg"}
                      alt={`Vista principal ${currentImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />

                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                      {currentImage + 1} / {images.length}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={cn(
                          "relative h-20 rounded-lg overflow-hidden transition-all duration-200 hover:opacity-90 shadow-sm hover:shadow-md",
                          currentImage === index && "ring-2 ring-blue-600 ring-offset-2",
                        )}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Vista ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-[400px] bg-blue-50 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-blue-100 rounded-full inline-block">
                      <HomeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-blue-600">No hay imágenes disponibles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Información principal */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-blue-900 font-inter">Ubicación</h2>
                  </div>
                  <p className="text-gray-700 text-lg mb-1 font-inter">{property.direccion}</p>
                  <p className="text-gray-600">
                    {property.municipio}, {property.departamento}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Home className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-blue-900">Tipo de Propiedad</h2>
                  </div>
                  <p className="text-gray-700 text-lg mb-1">{property.tipo}</p>
                  <p className="text-gray-600">Piso {property.numeroPiso}</p>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-2" />

            {/* Características */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Bed, label: "Habitaciones", value: property.habitaciones },
                { icon: Bath, label: "Baños", value: property.banos },
                { icon: Car, label: "Parqueadero", value: property.parqueadero ? "Sí" : "No" },
                { icon: Ruler, label: "Metros Cuadrados", value: `${property.metrosCuadrados} m²` },
                { icon: Building, label: "Estrato", value: property.estrato },
                { icon: Calendar, label: "Antigüedad", value: `${property.antiguedad} años` },
              ].map((item, index) => (
                <Card key={index} className="group hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-inter text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="my-2" />

            {/* Descripción */}
            <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-blue-900">Descripción</h2>
                </div>
                <p className="text-gray-700 font-inter leading-relaxed">{property.descripcion}</p>
              </CardContent>
            </Card>

            {/* Precio */}
            <Card className="bg-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">Canon Arrendamiento</h2>
                  </div>
                  <p className="text-3xl font-bold">{property.precio.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex flex-wrap justify-end gap-3">
              <Button
                variant="outline"
                className="bg-white hover:bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300"
                asChild
              >
                <Link href={`/inquilino-dashboard/mantenimiento`}>
                  <Tool className="mr-2 h-4 w-4" />
                  Solicitar Mantenimiento
                </Link>
              </Button>
              <Button
                onClick={() => {
                  setDialogAction("cancel")
                  setShowDialog(true)
                }}
                disabled={!property.enArriendo}
                className="bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <X className="mr-2 h-4 w-4" />
                {property.enArriendo ? "Cancelar arriendo" : "No disponible"}
              </Button>
              <Button
                onClick={() => {
                  setDialogAction("pay")
                  setShowDialog(true)
                }}
                disabled={!property.enArriendo}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pagar Arrendamiento
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle>{dialogAction === "cancel" ? "Cancelar Arriendo" : "Pagar Arriendo"}</DialogTitle>
            <DialogDescription>
              {dialogAction === "cancel"
                ? "¿Está seguro de que desea cancelar el arrendamiento de esta propiedad?"
                : "¿Desea proceder con el pago del arrendamiento?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleAction}>{dialogAction === "cancel" ? "Cancelar" : "Confirmar pago"}</Button>
            <Button onClick={() => setShowDialog(false)} variant="outline">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

