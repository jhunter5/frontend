'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Home, CheckCircle2, Mail, Phone, Calendar } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from "next/link"

// En un caso real, esto vendría de tu API
const getPerfil = (id) => {
  // Simulamos que solo existen inquilinos con IDs numéricos;
  return {
    id,
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan.perez@email.com",
    telefono: "+57 300 123 4567",
    edad: 35,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    numeroArrendamientos: 3,
    calificacionPromedio: 4.2,
    porcentajeCumplimiento: 95,
  }
}

export default function InquilinoProfile() {
  const router = useRouter()
  const [inquilino, setInquilino] = useState(null)
  const { user, isLoading } = useAuth0()

  useEffect(() => {
    if (!isLoading && user) {
      const fetchedInquilino = getPerfil(user.sub)
      if (fetchedInquilino) {
        setInquilino(fetchedInquilino)
      } else {
        router.push('/error')
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!inquilino) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">No se pudo cargar el perfil.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-neutral-50 transition-colors">
          <Link href="/inquilino-dashboard/buscador-propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a propiedades
          </Link>
        </Button>
      </div>

      {/* Header con Avatar */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-blue-500 p-6 text-white">
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={inquilino.avatar} alt={`${inquilino.nombre} ${inquilino.apellido}`} />
              <AvatarFallback>{inquilino.nombre[0]}{inquilino.apellido[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{inquilino.nombre} {inquilino.apellido}</h1>
              <p className="text-blue-100 text-lg">Inquilino</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información Personal */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700">Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Correo electrónico</p>
                <p className="font-medium">{inquilino.correo}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{inquilino.telefono}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Edad</p>
                <p className="font-medium">{inquilino.edad} años</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información de Arrendamientos */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="text-yellow-700">Información de Arrendamientos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Número de Arrendamientos</p>
                <p className="text-2xl font-bold text-blue-600">{inquilino.numeroArrendamientos}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Calificación Promedio</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-yellow-600">{inquilino.calificacionPromedio}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(inquilino.calificacionPromedio) ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-300 text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Porcentaje de Cumplimiento</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-green-600">{inquilino.porcentajeCumplimiento}%</p>
                  <div className="h-2 w-24 rounded-full bg-gray-200 overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-500 ease-out" 
                      style={{ width: `${inquilino.porcentajeCumplimiento}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

