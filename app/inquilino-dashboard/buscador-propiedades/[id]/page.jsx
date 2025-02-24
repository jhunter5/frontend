"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
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
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const fetchProperty = async (id) => {
  const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${id}`)

  if (!response.ok) {
    throw new Error("No se pudo cargar la propiedad")
  }
  return response.json()
}

function PropertySkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-48" />
    </div>
  )
}

export default function PropertyDetails({ params }) {
  const [showDialog, setShowDialog] = useState(false)
  const [showFullscreenImage, setShowFullscreenImage] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["property", params.id],
    queryFn: () => fetchProperty(params.id),
  })

  if (isError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="container mx-auto py-8 px-4">
        <PropertySkeleton />
      </div>
    )
  }

  const property = data?.property || {}
  const images = data?.media || []

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="outline" asChild className="group hover:bg-white/50">
            <Link href="/inquilino-dashboard/buscador-propiedades" className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Volver al Buscador
            </Link>
          </Button>
        </div>

        <Card className="overflow-hidden border-none shadow-xl">
          <CardHeader className="border-b bg-white p-6">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {property.address?.charAt(0).toUpperCase() + property.address?.slice(1)}
              </CardTitle>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {property.city}, {property.state}
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-black">
              <Carousel className="w-full" onSelect={setCurrentImageIndex}>
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-[400px]">
                        <img
                          src={image.mediaUrl || "/placeholder.svg"}
                          alt={`Vista ${index + 1} de la propiedad`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                          onClick={() => {
                            setCurrentImageIndex(index)
                            setShowFullscreenImage(true)
                          }}
                        >
                          <Expand className="h-5 w-5" />
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            <div className="bg-white pt-8">
              <div className="px-6 space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <Home className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold">Detalles de la Propiedad</h2>
                      </div>
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-muted-foreground">Tipo</span>
                          <span className="font-medium">
                            {property.type?.charAt(0).toUpperCase() + property.type?.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-muted-foreground">Estrato</span>
                          <span className="font-medium">{property.tier}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-muted-foreground">Antigüedad</span>
                          <span className="font-medium">{property.age} años</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-muted-foreground">Pisos</span>
                          <span className="font-medium">{property.floors}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-green-100">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold">Información de Arriendo</h2>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-600 mb-1">Canon de Arrendamiento</p>
                          <p className="text-3xl font-bold text-green-700">{formatPrice(property.rentPrice)}</p>
                          <p className="text-sm text-green-600 mt-1">por mes</p>
                        </div>
                        <Button onClick={() => setShowDialog(true)} className="w-full bg-green-600 hover:bg-green-700">
                          Postularse a esta propiedad
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    { icon: Bed, label: "Habitaciones", value: property.rooms },
                    { icon: Bath, label: "Baños", value: property.bathrooms },
                    { icon: Car, label: "Parqueadero", value: property.parking ? "Sí" : "No" },
                    { icon: Ruler, label: "Área", value: `${property.squareMeters} m²` },
                    { icon: Building, label: "Estrato", value: property.tier },
                    { icon: Calendar, label: "Antigüedad", value: `${property.age} años` },
                  ].map((item, index) => (
                    <Card key={index} className="bg-white">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-blue-50">
                          <item.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Info className="h-5 w-5 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-semibold">Descripción</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Postularse a la Propiedad</DialogTitle>
            <DialogDescription>¿Estás seguro de que deseas postularte a esta propiedad?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Link href={`/inquilino-dashboard/postularse/${property.id}`}>Confirmar</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showFullscreenImage} onOpenChange={setShowFullscreenImage} className="max-w-none">
        <DialogContent className="max-w-7xl w-full p-0 gap-0">
          <div className="relative bg-black h-[80vh]">
            <img
              src={images[currentImageIndex]?.mediaUrl || "/placeholder.svg"}
              alt={`Vista ${currentImageIndex + 1} de la propiedad`}
              className="w-full h-full object-contain"
            />
            <Button
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/50"
              onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/50"
              onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

