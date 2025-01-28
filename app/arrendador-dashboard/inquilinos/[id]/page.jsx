'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Calendar, Mail, Phone, Users, User, Heart, Wallet, Building2, Clock, CheckCircle2, Trophy, BadgeCheck } from 'lucide-react'
import Link from "next/link"
import { useQuery } from '@tanstack/react-query'

export default function TenantProfile({ params }) {
  const router = useRouter()

  const fetchTenant = async () => {
    const { id } = params
    // const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/tenant/${id}`)
    const response = await fetch(`http://localhost:3001/api/tenant/${id}`)

    if (!response.ok) {
      throw new Error('Error al obtener el inquilino')
    }
    
    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['tenant'],
    queryFn: fetchTenant,
  })

  if (isPending) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  const tenant = data || {}

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors font-inter">
          <Link href="/arrendador-dashboard/inquilinos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a inquilinos
          </Link>
        </Button>
      </div>

      {/* Header con Avatar */}
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={tenant.avatar} alt={`${tenant.firstName} ${tenant.lastName}`} />
          <AvatarFallback>{tenant.firstName[0]}{tenant.lastName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{tenant.firstName} {tenant.lastName}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{tenant.rating}</Badge>
            {tenant.isFamily && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Familia
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{tenant.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Apellido</p>
                <p className="font-medium">{tenant.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Correo electrónico</p>
                <p className="font-medium">{tenant.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{tenant.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Registro</p>
                <p className="font-medium">{new Date(tenant.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Edad</p>
                <p className="font-medium">{tenant.age} años</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Género</p>
                <p className="font-medium">{tenant.gender}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado Civil</p>
              <p className="font-medium">{tenant.maritalStatus}</p>
            </div>
          </CardContent>
        </Card>

        {/* Información Financiera */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Información Financiera
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <Wallet className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Salario Mensual</p>
                <p className="text-2xl font-bold">
                  ${tenant.salary.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Tipo de Contrato</p>
              <p className="font-medium">{tenant.contractType}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Industria</p>
              <p className="font-medium">{tenant.industry}</p>
            </div>
          </CardContent>
        </Card>

        {/* Información de Arrendamientos */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Información de Arrendamientos
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calificación Promedio</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{tenant.avgRating}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(tenant.avgRating)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clasificación</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{tenant.rating}</p>
                  <Badge variant="secondary" className="text-lg">
                    {tenant.ConctractsPer} contratos previos
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                {/* <p className="text-sm text-muted-foreground">Puntualidad en Pagos</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{tenant.puntualidadPagos}%</p>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${tenant.puntualidadPagos}%` }}
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duración Promedio</p>
                <p className="text-2xl font-bold">
                  {tenant.avgContractDuration} meses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

