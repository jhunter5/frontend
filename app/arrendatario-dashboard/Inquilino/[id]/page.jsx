'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Calendar, Mail, Phone, Users, User, Heart, Wallet, Building2, Clock, CheckCircle2, Trophy, BadgeCheck } from 'lucide-react'
import Link from "next/link"

// En un caso real, esto vendría de tu API
const getTenant = (id) => {
  // Simulamos que solo existen inquilinos con IDs numéricos
  if (isNaN(parseInt(id))) return null;

  return {
    id,
    nombre: "Sebastian",
    apellido: "Ramirez",
    correo: "juan.perez@email.com",
    telefono: "+57 300 123 4567",
    fechaRegistro: "2023-01-15",
    edad: 35,
    esFamilia: true,
    genero: "Masculino",
    estadoCivil: "Casado",
    avatar: "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // Información financiera
    salario: 5000000,
    tipoContrato: "Indefinido",
    industria: "Tecnología",
    // Información de arrendamientos
    calificacionPromedio: 3.0,
    clasificacion: "A+",
    contratosPrevios: 3,
    puntualidadPagos: 20,
    duracionPromedioContratos: 24, // meses
  }
}

export default function TenantProfile({ params }) {
  const router = useRouter()
  const [tenant, setTenant] = useState(null)

  useEffect(() => {
    const fetchedTenant = getTenant(params.id)
    if (fetchedTenant) {
      setTenant(fetchedTenant)
    } else {
      router.push('/dashboard/tenants')
    }
  }, [params.id, router])

  if (!tenant) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="arrendatario-dashboard/propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a inquilinos
          </Link>
        </Button>
      </div>

      {/* Header con Avatar */}
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={tenant.avatar} alt={`${tenant.nombre} ${tenant.apellido}`} />
          <AvatarFallback>{tenant.nombre[0]}{tenant.apellido[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{tenant.nombre} {tenant.apellido}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{tenant.clasificacion}</Badge>
            {tenant.esFamilia && (
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
                <p className="font-medium">{tenant.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Apellido</p>
                <p className="font-medium">{tenant.apellido}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Correo electrónico</p>
                <p className="font-medium">{tenant.correo}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{tenant.telefono}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Registro</p>
                <p className="font-medium">{new Date(tenant.fechaRegistro).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Edad</p>
                <p className="font-medium">{tenant.edad} años</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Género</p>
                <p className="font-medium">{tenant.genero}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado Civil</p>
              <p className="font-medium">{tenant.estadoCivil}</p>
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
                  ${tenant.salario.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Tipo de Contrato</p>
              <p className="font-medium">{tenant.tipoContrato}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Industria</p>
              <p className="font-medium">{tenant.industria}</p>
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
                  <p className="text-2xl font-bold">{tenant.calificacionPromedio}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(tenant.calificacionPromedio)
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
                  <p className="text-2xl font-bold">{tenant.clasificacion}</p>
                  <Badge variant="secondary" className="text-lg">
                    {tenant.contratosPrevios} contratos previos
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Puntualidad en Pagos</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{tenant.puntualidadPagos}%</p>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${tenant.puntualidadPagos}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duración Promedio</p>
                <p className="text-2xl font-bold">
                  {tenant.duracionPromedioContratos} meses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

