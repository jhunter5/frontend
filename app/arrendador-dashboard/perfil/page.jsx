'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Home, CheckCircle2, Mail, Phone, Calendar} from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from "next/link"
import { useQuery } from '@tanstack/react-query'
import { getAuth0Id } from "@/app/utils/getAuth0id"

export default function ArrendatarioProfile() {
  const { user } = useAuth0()

  const fecthUser = async () => {
      const userId = getAuth0Id(user.sub);
      const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/landlord/${userId}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }
  
  const { isPending, isError, data, error } = useQuery( {
    queryKey: 'user',
    queryFn: fecthUser
  } ) 

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-neutral-50 transition-colors">
          <Link href="/arrendador-dashboard/propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a propiedades
          </Link>
        </Button>
      </div>

      {/* Header con Avatar */}
      <Card className="mb-8  overflow-hidden">
        <div className="bg-primary-400 p-6 text-white">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            {isPending ? 
            (
              <AvatarFallback>{data?.firstName[0]}{data?.lastName[0]}</AvatarFallback> 
            ) : 
            (
            <AvatarImage src={data?.avatar} alt={`${data?.firstName} ${data?.lastName}`} />
            )
          }
          </Avatar>
          {isPending ? 
          (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
          ) : (
          <div>
            <h1 className="text-3xl font-bold">{data.firstName} {data.lastName}</h1>
            <p className="text-blue-100 text-lg">Arrendatario</p>
          </div>
          )
          }
        </div>
      </Card>
      

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información Personal */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700" >Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{data.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Apellido</p>
                <p className="font-medium">{data.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
              <p className="text-sm text-muted-foreground">Correo electrónico</p>
              <p className="font-medium">{data.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{data.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-blue-500"/>
              <div>
                <p className="text-sm text-muted-foreground">Edad</p>
                <p className="font-medium">{data.age} años</p>
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
                <Home className="h-6 w-6 text-primary" />
              </div>
              {/* <div>
                <p className="text-sm text-muted-foreground">Número de Propiedades</p>
                <p className="text-2xl font-bold">{arrendatario.numeroPropiedades}</p>
              </div> */}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calificación Promedio</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{data.avgRating}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(data.avgRating)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Porcentaje de Cumplimiento</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{arrendatario.porcentajeCumplimiento}%</p>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-500 ease-out"
                      style={{ width: `${arrendatario.porcentajeCumplimiento}%` }}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

