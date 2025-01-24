'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft, MapPin, Eye, FileText, CheckCircle, XCircle, Clock } from 'lucide-react'
import Link from "next/link"

// Datos simulados (en un caso real, vendrán de la API)
const getPostulaciones = () => [
  {
    id: 1,
    imagen: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titulo: "Casa en el centro histórico",
    ubicacion: "Ciudad Vieja, Zona 1",
    estado: "En revisión",
  },
  {
    id: 2,
    imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titulo: "Apartamento moderno",
    ubicacion: "Nueva Vista, Zona 3",
    estado: "Aceptada",
  },
  {
    id: 3,
    imagen: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    titulo: "Cabaña en el bosque",
    ubicacion: "Los Pinos, Zona 7",
    estado: "Rechazada",
  },
]

export default function MisPostulaciones() {
  const router = useRouter()
  const [postulaciones, setPostulaciones] = useState([])

  useEffect(() => {
    const fetchedPostulaciones = getPostulaciones()
    setPostulaciones(fetchedPostulaciones)
  }, [])

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "Aceptada":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "Rechazada":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return <Clock className="h-6 w-6 text-yellow-500" />
    }
  }

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
                      {getStatusIcon(postulacion.estado)}
                      <span className={`font-medium ${
                        postulacion.estado === "Aceptada"
                          ? "text-green-600"
                          : postulacion.estado === "Rechazada"
                          ? "text-red-600"
                          : "text-yellow-500"
                      }`}>
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
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No hay postulaciones aún</h2>
                <p className="text-gray-600 mb-6">
                  Empieza a explorar propiedades y envía tu primera postulación.
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/inquilino-dashboard/buscador-propiedades">
                    Buscar Propiedades
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
