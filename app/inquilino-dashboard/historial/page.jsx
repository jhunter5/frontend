'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Home, Building, Star, Filter } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from "next/link"

const getHistorialPropiedades = (id) => {
  return [
    {
      id: 1,
      nombre: "Apartamento Moderno",
      direccion: "Calle 123, Ciudad, País",
      imagen: "https://media.istockphoto.com/id/1179301149/photo/parga-city-in-october-sea-and-buildings-tourist-resort-in-greece.jpg?s=2048x2048&w=is&k=20&c=rUXr01d-eBfjqY2r-ix26XUwsWwgFJ7-TdCLyJ6NUaQ=",
      fechaIngreso: "2023-06-15",
      fechaSalida: "2023-12-15",
      estado: "Arrendado",
      tipo: "Apartamento",
      calificacion: 4.5
    },
    {
      id: 2,
      nombre: "Casa en la Montaña",
      direccion: "Calle 456, Ciudad, País",
      imagen: "https://pics.nuroa.com/vivienda_exclusiva_en_venta_bogota_bogota_d_c_6420003734784958600.jpg",
      fechaIngreso: "2022-08-01",
      fechaSalida: "2023-05-30",
      estado: "Finalizado",
      tipo: "Casa",
      calificacion: 4.8
    }
  ]
}

export default function ExperienciasAlojamiento() {
  const router = useRouter()
  const [experiencias, setExperiencias] = useState(null)
  const [filtro, setFiltro] = useState('todas')
  const { user, isLoading } = useAuth0()

  useEffect(() => {
    if (!isLoading && user) {
      const fetchedExperiencias = getHistorialPropiedades(user.sub)
      if (fetchedExperiencias) {
        setExperiencias(fetchedExperiencias)
      } else {
        router.push('/error')
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!experiencias) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">No se pudieron cargar tus experiencias de alojamiento.</p>
      </div>
    )
  }

  const filteredExperiencias = filtro === 'todas' 
    ? experiencias 
    : experiencias.filter(e => e.estado.toLowerCase() === filtro)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <Button variant="outline" asChild className="mb-4 md:mb-0">
          <Link href="/inquilino-dashboard/buscador-propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Buscador
          </Link>
        </Button>
        <h1 className="text-4xl font-bold text-primary">
          Mis Experiencias de Alojamiento
        </h1>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button
            variant={filtro === 'todas' ? 'default' : 'outline'}
            onClick={() => setFiltro('todas')}
            className="rounded-l-md"
          >
            Todas
          </Button>
          <Button
            variant={filtro === 'arrendado' ? 'default' : 'outline'}
            onClick={() => setFiltro('arrendado')}
            className="-ml-px"
          >
            Arrendadas
          </Button>
          <Button
            variant={filtro === 'finalizado' ? 'default' : 'outline'}
            onClick={() => setFiltro('finalizado')}
            className="-ml-px rounded-r-md"
          >
            Finalizadas
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredExperiencias.map((propiedad) => (
          <ExperienciaCard key={propiedad.id} propiedad={propiedad} />
        ))}
      </div>
    </div>
  )
}

function ExperienciaCard({ propiedad }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={propiedad.imagen} alt={propiedad.nombre} className="w-full h-48 object-cover" />
        <Badge 
          variant={propiedad.estado === 'Arrendado' ? 'default' : 'secondary'}
          className="absolute top-2 right-2"
        >
          {propiedad.estado}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{propiedad.nombre}</span>
          <Badge variant="outline">
            {propiedad.tipo === 'Apartamento' ? <Building className="h-4 w-4" /> : <Home className="h-4 w-4" />}
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

