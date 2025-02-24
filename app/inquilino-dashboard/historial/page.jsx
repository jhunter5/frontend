"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Home,
  Building,
  Star,
  History,
  Search,
  ArrowRight,
  Clock,
  BookOpen,
  Building2,
} from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import Link from "next/link"

export default function ExperienciasAlojamiento() {
  const router = useRouter()
  const [experiencias, setExperiencias] = useState(null)
  const [filtro, setFiltro] = useState("todas")
  const { user, isLoading } = useAuth0()

  useEffect(() => {
    const fetchHistorial = async () => {
      if (!user) return
      try {
        const userId = getAuth0Id(user.sub)
        const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/contract/tenant/${userId}`)
        const data = await response.json()
      
        if (Array.isArray(data)) {
          const experienciasConImagenes = await Promise.all(
            data.map(async (contract) => {
              const propertyId = contract.propertyId

              const propertyResponse = await fetch(
                `https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${propertyId}`,
              )
              // const propertyResponse = await fetch(
              //   `https://backend-khaki-three-90.vercel.app/api/property/${propertyId}`,
              // )
              if (!propertyResponse.ok) throw new Error("Error fetching property data")

              const propertyData = await propertyResponse.json()

              const imagen = propertyData.media?.[0]?.mediaUrl || "https://via.placeholder.com/400"

              return {
                id: propertyData.property.id,
                nombre: propertyData.property.address,
                direccion: `${propertyData.property.city}, ${propertyData.property.state}`,
                imagen,
                fechaIngreso: new Date(contract.startDate).toLocaleDateString(),
                fechaSalida: new Date(contract.endDate).toLocaleDateString(),
                estado: contract.status === "1" ? "Arrendado" : "Finalizado",
                tipo: contract.propertyId.type,
                calificacion: contract.tenant.avgRating,
              }
            }),
          )
          setExperiencias(experienciasConImagenes)
        } else {
          setExperiencias([])
        }
      } catch (error) {
        console.error("Error al obtener historial de arrendamientos", error)
        setExperiencias([])
      }
    }
    if (!isLoading) fetchHistorial()
  }, [user, isLoading])

  if (isLoading || experiencias === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const filteredExperiencias =
    filtro === "todas" ? experiencias : experiencias.filter((e) => e.estado.toLowerCase() === filtro)

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" asChild className="hover:bg-blue-50 transition-colors group">
          <Link href="/inquilino-dashboard/buscador-propiedades" className="text-gray-600">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver al Buscador
          </Link>
        </Button>
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-inner transform -rotate-6">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-inner transform rotate-6">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-black bg-clip-text text-transparent font-spaceGrotesk">
            Mis Experiencias de Alojamiento
          </h1>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-xl shadow-sm p-1.5 bg-white border border-blue-100" role="group">
          <Button
            variant={filtro === "todas" ? "default" : "ghost"}
            onClick={() => setFiltro("todas")}
            className={`rounded-lg px-6 ${
              filtro === "todas"
                ? "bg-gradient-to-r from-blue-800 to-blue-800 text-white shadow-md"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            }`}
          >
            Todas
          </Button>
          <Button
            variant={filtro === "arrendado" ? "default" : "ghost"}
            onClick={() => setFiltro("arrendado")}
            className={`rounded-lg px-6 ${
              filtro === "arrendado"
                ? "bg-gradient-to-r from-blue-800 to-blue-800 text-white shadow-md"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            }`}
          >
            Arrendadas
          </Button>
          <Button
            variant={filtro === "finalizado" ? "default" : "ghost"}
            onClick={() => setFiltro("finalizado")}
            className={`rounded-lg px-6 ${
              filtro === "finalizado"
                ? "bg-gradient-to-r from-blue-800 to-blue-800 text-white shadow-md"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            }`}
          >
            Finalizadas
          </Button>
        </div>
      </div>

      {/* Content */}
      {experiencias.length === 0 ? (
        <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen max-w-5xl">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-blue-100 rounded-full flex items-center justify-center">
                    <History className="w-12 h-12 text-blue-600" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-yellow-900" />
                  </div>
                </div>

                <div className="space-y-2 max-w-lg">
                  <h2 className="text-2xl font-bold tracking-tight">¡Comienza tu Historia con Nosotros!</h2>
                  <p className="text-gray-500">
                    Aún no tienes experiencias de alojamiento registradas. ¡Es el momento perfecto para comenzar tu
                    viaje con nosotros!
                  </p>
                </div>

                <div className="space-y-4 w-full max-w-md">
                  <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">¿Por qué elegir nuestras propiedades?</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-100/50">
                            <Search className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-blue-900">Búsqueda Personalizada</p>
                            <p className="text-sm text-blue-700">Encuentra el lugar perfecto según tus necesidades</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-100/50">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-blue-900">Proceso Rápido</p>
                            <p className="text-sm text-blue-700">Gestión de arrendamiento sin complicaciones</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-100/50">
                            <Star className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-blue-900">Experiencias Memorables</p>
                            <p className="text-sm text-blue-700">Propiedades verificadas y de calidad</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      asChild
                    >
                      <Link href="/inquilino-dashboard/buscador-propiedades">
                        Explorar Propiedades
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredExperiencias.map((propiedad) => (
            <ExperienciaCard key={propiedad.id} propiedad={propiedad} />
          ))}
        </div>
      )}
    </div>
  )
}

function ExperienciaCard({ propiedad }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={propiedad.imagen || "/placeholder.svg"} alt={propiedad.nombre} className="w-full h-48 object-cover" />
        <Badge variant={propiedad.estado === "Arrendado" ? "default" : "secondary"} className="absolute top-2 right-2">
          {propiedad.estado}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{propiedad.nombre}</span>
          <Badge variant="outline">
            {propiedad.tipo === "Apartamento" ? <Building className="h-4 w-4" /> : <Home className="h-4 w-4" />}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          {propiedad.direccion}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Ingreso
            </span>
            <span className="font-medium">{propiedad.fechaIngreso}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Salida
            </span>
            <span className="font-medium">{propiedad.fechaSalida}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-bold">{propiedad.calificacion}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

