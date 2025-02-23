"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, User, Briefcase, Star, Home, FileText, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { toast, useToast } from "@/hooks/use-toast"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from '@auth0/auth0-react'
import { ro } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

const getApplication = async (id) => {
  const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/application/${id}`)
  if (!response.ok) {
    throw new Error("No se pudo obtener la cita")
  }

  return response.json()
}

const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return "Postulado"
    case 1:
      return "Preseleccionado"
    case 2:
      return "Descartado"
    default:
      return "Desconocido"
  }
}

export default function CandidateProfile({ params }) {
  const [showAddEvent, setShowAddEvent] = useState(false)
  const searchParams = useSearchParams()
  const application_id = params.id
  const tenant_id = searchParams.get('tenant')
  const property_id = searchParams.get('property')
  const router = useRouter()
  

  const changeApplicationStatus = useMutation({
    mutationFn: async (status) => {
      const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/application/status/${application_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      })

      if (!response.ok) {
        throw new Error("No se pudo cambiar el estado de la aplicación")
      }

      return response.json()
    }
  })

  const handlePreselect = () => {
    changeApplicationStatus.mutate(1,
    {
      onSuccess: () => {
        toast ({
          title: "Éxito",
          description: "El candidato ha sido preseleccionado exitosamente.",
          status: "success",
        })
        router.push(`/arrendador-dashboard/propiedades-busqueda/${property_id}`);

      },
      onError: () => {
        toast({
          title: "Error",
          description: "Hubo un error al preseleccionar al candidato.",
          status: "error",
          variant: "destructive",
        })
      }
    })
  }

  const handleDiscard = () => {
    changeApplicationStatus.mutate(2,
    {
      onSuccess: () => {
      toast({
        title: "Éxito",
        description: "El candidato ha sido descartado exitosamente.",
        status: "success",
      })
      router.push(`/arrendador-dashboard/propiedades-busqueda/${property_id}`);

      },
      onError: () => {
      toast({
        title: "Error",
        description: "Hubo un error al descartar al candidato.",
        status: "error",
        variant: "destructive",
      })
      }
    })
  }

  const handleScheduleAppointment = () => {
    setShowAddEvent(true) 
  }

  const handleRent = () => {
    router.push(`/arrendador-dashboard/contratos/crear?tenant=${tenant_id}&property=${property_id}`)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointment", application_id],
    queryFn: () => getApplication(application_id),
  })

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <div>Ha ocurrido un error</div>
  }
  

  const { application } = data
  const { tenant } = application
  const ApplicationMedia = application.ApplicationMedia
  const ApplicationReference = application.ApplicationReference
  const documents = application.documents

  function AddEventDialog({ isOpen, onClose, tenantAuthID, propertyID, onSuccess, onError }) {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [description, setDescription] = useState("")
    const toast = useToast()
    const { user } = useAuth0()
    const landLordAuthID = getAuth0Id(user.sub)
    
    
    const saveAppointment = useMutation({
      mutationFn : async (data) => {
        const response = await fetch("https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/appointment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error("No se pudo guardar la cita")
        }

        return response.json()
      }
    });

    const handleAppointmentSave = () => {
      const newAppointment = {
        landLordAuthID,
        tenantAuthID: tenantAuthID,
        propertyID: propertyID,
        title,
        date,
        time,
        description,
      }

      saveAppointment.mutate(newAppointment, 
      {
        onSuccess: () => {
          onClose();
          onSuccess();
        },
        onError: () => {
          onClose();
          onError();
          
        }
      })
    }


    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>Agregar cita</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Input
           placeholder="Titulo de la cita" 
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
          <Input type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          />
          </div>
          <div className="flex-1">
          <Input type="time" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          />
          </div>
        </div>
        <Input placeholder="Agregar descripción" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleAppointmentSave} className="bg-primary-400">Guardar</Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/arrendador-dashboard/propiedades-busqueda">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Candidaturas
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <User className="mr-2 h-6 w-6" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={tenant.avatar} alt={`${tenant.firstName} ${tenant.lastName}`} />
                <AvatarFallback>
                  {tenant.firstName[0]}
                  {tenant.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
              <h2 className="text-2xl font-bold">
                  {tenant.firstName} {tenant.lastName}
                </h2>
                <p className="text-muted-foreground">{tenant.industry}</p>
              </div>
            </div>
            <div className="space-y-2">
            <p>
                <strong>Edad:</strong> {tenant.age} años
              </p>
              <p>
                <strong>Género:</strong> {tenant.gender}
              </p>
              <p>
                <strong>Estado civil:</strong> {tenant.maritalStatus}
              </p>
              <p>
                <strong>Email:</strong> {tenant.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {tenant.phone}
              </p>
              <p>
                <strong>Tipo de ID:</strong> {tenant.idType}
              </p>
              <p>
                <strong>Número de ID:</strong> {tenant.id}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Información Laboral y Financiera
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Tipo de contrato</p>
              <p>{tenant.contractType}</p>
            </div>
            <div>
              <p className="font-semibold">Industria</p>
              <p>{tenant.industry}</p>
            </div>
            <div>
              <p className="font-semibold">Salario</p>
              <p>${tenant.salary.toLocaleString()}/mes</p>
            </div>
            <div>
              <p className="font-semibold">Calificación promedio</p>
                <div className="flex items-center">
                  <Progress value={tenant.avgRating * 20} className="mr-2" />
                  <span>{tenant.avgRating.toFixed(1)}</span>
                </div>
            </div>
            <div>
              <p className="font-semibold">Contratos previos</p>
              <p>{tenant.previousContracts}</p>
            </div>  
            <div>
              <p className="font-semibold">Duración promedio de contratos</p>
              <p>{tenant.avgContractDuration} Meses</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Detalles de la Postulacion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Estado:</span>
                  <Badge>{getStatusLabel(application.status)}</Badge>
                </div>
                <p>
                  <strong>Puntuación:</strong> {application.score}
                </p>
                <p>
                  <strong>Descripción personal:</strong> {application.personalDescription}
                </p>
                <p>
                  <strong>Fecha de aplicación:</strong> {new Date(application.createdAt).toLocaleDateString()}
                </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Referencias
            </CardTitle>
          </CardHeader>
          <CardContent>
          {ApplicationReference?.map((reference, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <p className="font-semibold">
                  {reference.name} {reference.lastname}
                </p>
                <p className="text-sm text-muted-foreground">{reference.relationship}</p>
                <p className="text-sm">{reference.cellphone}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {ApplicationMedia?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <span>{doc.mediaType}</span>
                  <Button variant="outline" size="icon" asChild>
                    <a href={doc.mediaUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Ver {doc.mediaType}</span>
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="" onClick={handleDiscard} className="bg-danger-300">
          Descartar
        </Button>
        <Button variant="" onClick={handlePreselect} className="bg-primary-400">
          Preseleccionar
        </Button>
        <Button  onClick={handleScheduleAppointment} className="bg-primary-400">
          Agendar cita
        </Button>
        <Button onClick={handleRent} className="bg-success-400">
          Arrendar
          </Button>
      </div>
      <AddEventDialog isOpen={showAddEvent} onClose={() => setShowAddEvent(false)}  tenantAuthID={tenant_id} propertyID={property_id}
       onSuccess = {
        () =>
          setTimeout(() => {
            toast({
              title: 'Cita Creada',
              description: 'La Cita ha sido creada exitosamente',
              status: 'success',
            })
          }, 500)

        }
        
        onError = {
        () =>
          setTimeout(() => {
            toast({
              title: 'Error',
              description: 'Ha ocurrido un error al crear la cita',
              status: 'error',
              variant: 'destructive',
            })
        }, 500)
      }
      />
    </div>
  )
}

