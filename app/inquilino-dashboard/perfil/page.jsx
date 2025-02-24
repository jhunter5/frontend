'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Home, CheckCircle2, Mail, Phone, Calendar } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from "next/link"
import { getAuth0Id } from '@/app/utils/getAuth0id'
import { useQuery } from '@tanstack/react-query'

export default function InquilinoProfile() {
  const router = useRouter()
  const { user, isLoading } = useAuth0()

  const fetchProfileTenant = async () => {
    const userId = getAuth0Id(user?.sub)
    const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/tenant/${userId}`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return response.json()
  }

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['tenant'],
    queryFn: fetchProfileTenant
  })

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (isPending) {
    return <div>Cargando...</div>
  }


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const inquilino = data || null
  console.log(inquilino)

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
        <div className="bg-primary-400 p-6 text-white">
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={inquilino.avatar} alt={`${inquilino.firstName} ${inquilino.lastName}`} />
              <AvatarFallback>{inquilino.firstName[0]}{inquilino.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{inquilino.firstName} {inquilino.lastName}</h1>
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
                <p className="font-medium">
                  {inquilino.email.charAt(0).toUpperCase() + inquilino.email.slice(1)}
                </p>

              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{inquilino.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Edad</p>
                <p className="font-medium">{inquilino.age} años</p>
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
                <p className="text-2xl font-bold text-blue-600">{inquilino.previousContracts}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Calificación Promedio</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-yellow-600">{inquilino.avgRating}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(inquilino.avgRating) ? 'fill-yellow-500 text-yellow-500' : 'fill-gray-300 text-gray-300'}`}
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
                  <p className="text-2xl font-bold text-green-600">{inquilino.avgContractDuration}%</p>
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

