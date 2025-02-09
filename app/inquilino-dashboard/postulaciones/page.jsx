'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Eye, FileText, CheckCircle, XCircle, Clock } from 'lucide-react'
import Link from "next/link"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from "@auth0/auth0-react"

const STATUS_MAP = {
  0: { label: "En revisión", icon: <Clock className="h-6 w-6 text-yellow-500" /> },
  1: { label: "Aceptada", icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
  2: { label: "Rechazada", icon: <XCircle className="h-6 w-6 text-red-500" /> }
};

export default function MisPostulaciones() {
  const router = useRouter()
  const [postulaciones, setPostulaciones] = useState([])
  const { user } = useAuth0()

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const userId = getAuth0Id(user.sub)
        const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/application/tenant/${userId}?year=2025`)
        const data = await response.json()

        const postulacionesConInfo = await Promise.all(
          data.applications.map(async (app) => {
            try {
              const propertyResponse = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/${app.application.property}`)
              const propertyData = await propertyResponse.json()

              return {
                id: app.application._id,
                titulo: propertyData.property.address || "Propiedad sin nombre",
                ubicacion: `${propertyData.property.city}, ${propertyData.property.state}` || "Ubicación no disponible",
                imagen: propertyData.media.length > 0 ? propertyData.media[0].mediaUrl : "https://via.placeholder.com/300",
                estado: STATUS_MAP[app.application.status]?.label || "Desconocido",
                estadoIcon: STATUS_MAP[app.application.status]?.icon
              }
            } catch (error) {
              console.error(`Error al obtener datos de la propiedad ${app.application.property}`, error)
              return {
                id: app.application._id,
                titulo: `Propiedad ${app.application.property}`,
                ubicacion: "Ubicación no disponible",
                imagen: "https://via.placeholder.com/300",
                estado: STATUS_MAP[app.application.status]?.label || "Desconocido",
                estadoIcon: STATUS_MAP[app.application.status]?.icon
              }
            }
          })
        )

        setPostulaciones(postulacionesConInfo)
      } catch (error) {
        console.error("Error al obtener postulaciones", error)
      }
    }

    fetchPostulaciones()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors">
            <Link href="/inquilino-dashboard/buscador-propiedades">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al buscador
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <Card className="bg-white shadow-xl">
            <CardHeader className="bg-primary-400 text-white">
              <CardTitle className="text-3xl font-bold flex items-center">
                <FileText className="mr-2 h-8 w-8" />
                Mis Postulaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{postulaciones.length}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {postulaciones.filter(p => p.estado === "Aceptada").length}
                  </p>
                  <p className="text-sm text-gray-600">Aceptadas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-500">
                    {postulaciones.filter(p => p.estado === "En revisión").length}
                  </p>
                  <p className="text-sm text-gray-600">En revisión</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {postulaciones.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postulaciones.map((postulacion) => (
              <Card key={postulacion.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48">
                  <img
                    src={postulacion.imagen}
                    alt={postulacion.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{postulacion.titulo}</h3>
                    <div className="flex items-center text-sm text-white/90">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{postulacion.ubicacion}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {postulacion.estadoIcon}
                      <span className="font-medium">
                        {postulacion.estado}
                      </span>
                    </div>
                    <Button variant="outline" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <Link href={`/inquilino-dashboard/postulaciones/${postulacion.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                <div className="text-6xl mb-4">🏠</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No tienes postulaciones aún</h2>
                <p className="text-gray-600">Explora propiedades y postúlate para comenzar tu proceso de arrendamiento.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
