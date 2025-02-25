"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  User,
  Briefcase,
  Home,
  FileText,
  Download,
  Calendar,
  Mail,
  Phone,
  CreditCard,
  Building2,
  BadgeCheck,
  Clock,
  UserCheck,
  Building,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/navigation"

const getApplication = async (id) => {
  const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/application/${id}`)
  if (!response.ok) {
    throw new Error("No se pudo obtener la cita")
  }
  return response.json()
}

const getStatusLabel = (status) => {
  const statusMap = {
    0: { label: "Postulado", className: "bg-blue-500" },
    1: { label: "Preseleccionado", className: "bg-green-500" },
    2: { label: "Descartado", className: "bg-red-500" },
  }
  return statusMap[status] || { label: "Desconocido", className: "bg-gray-500" }
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function CandidateProfile({ params }) {
  const [showAddEvent, setShowAddEvent] = useState(false)
  const searchParams = useSearchParams()
  const application_id = params.id
  const tenant_id = searchParams.get("tenant")
  const property_id = searchParams.get("property")
  const router = useRouter()

  const changeApplicationStatus = useMutation({
    mutationFn: async (status) => {
      const response = await fetch(
        `https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/application/status/${application_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        },
      )

      if (!response.ok) {
        throw new Error("No se pudo cambiar el estado de la aplicación")
      }

      return response.json()
    },
  })

  const handlePreselect = () => {
    changeApplicationStatus.mutate(1, {
      onSuccess: () => {
        toast({
          title: "Éxito",
          description: "El candidato ha sido preseleccionado exitosamente.",
        })
        router.push(`/arrendador-dashboard/propiedades-busqueda/${property_id}`)
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Hubo un error al preseleccionar al candidato.",
          variant: "destructive",
        })
      },
    })
  }

  const handleDiscard = () => {
    changeApplicationStatus.mutate(2, {
      onSuccess: () => {
        toast({
          title: "Éxito",
          description: "El candidato ha sido descartado exitosamente.",
        })
        router.push(`/arrendador-dashboard/propiedades-busqueda/${property_id}`)
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Hubo un error al descartar al candidato.",
          variant: "destructive",
        })
      },
    })
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointment", application_id],
    queryFn: () => getApplication(application_id),
  })

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>No se pudo cargar la información del candidato</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/arrendador-dashboard/propiedades-busqueda">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { application } = data
  const { tenant } = application
  const ApplicationMedia = application.ApplicationMedia
  const ApplicationReference = application.ApplicationReference

  function AddEventDialog({ isOpen, onClose, tenantAuthID, propertyID, onSuccess, onError }) {
    const [formData, setFormData] = useState({
      title: "",
      date: "",
      time: "",
      description: "",
    })
    const { user } = useAuth0()
    const landLordAuthID = getAuth0Id(user?.sub)

    const saveAppointment = useMutation({
      mutationFn: async (data) => {
        const response = await fetch(
          "https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/appointment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        )

        if (!response.ok) {
          throw new Error("No se pudo guardar la cita")
        }

        return response.json()
      },
    })

    const handleAppointmentSave = () => {
      const newAppointment = {
        ...formData,
        landLordAuthID,
        tenantAuthID,
        propertyID,
      }

      saveAppointment.mutate(newAppointment, {
        onSuccess: () => {
          onClose()
          onSuccess()
        },
        onError: () => {
          onClose()
          onError()
        },
      })
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agendar cita
            </DialogTitle>
            <DialogDescription>Complete los detalles para agendar una cita con el candidato</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título de la cita</Label>
              <Input
                id="title"
                placeholder="Ej: Visita al inmueble"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Detalles adicionales de la cita..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleAppointmentSave} className="bg-primary">
              Agendar cita
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const status = getStatusLabel(application.status)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" asChild className="hover:bg-transparent">
          <Link
            href="/arrendador-dashboard/propiedades-busqueda"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Candidaturas
          </Link>
        </Button>
        <Badge className={status.className}>{status.label}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información Personal */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center text-2xl">
              <User className="mr-2 h-6 w-6 text-blue-600" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4 mb-6 text-center">
              <Avatar className="h-32 w-32 border-4 border-primary/10">
                <AvatarImage src={tenant.avatar} alt={`${tenant.firstName} ${tenant.lastName}`} />
                <AvatarFallback className="text-2xl">
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
            <div className="grid gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{tenant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>
                  {tenant.idType}: {tenant.id}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Edad</p>
                  <p className="font-medium">{tenant.age} años</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Estado civil</p>
                  <p className="font-medium">{tenant.maritalStatus}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información Laboral */}
        <Card>
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center text-2xl">
              <Briefcase className="mr-2 h-6 w-6 text-blue-600" />
              Información Laboral
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Tipo de contrato</p>
                </div>
                <p className="font-medium">{tenant.contractType}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Industria</p>
                </div>
                <p className="font-medium">{tenant.industry}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Salario mensual</p>
              <p className="text-2xl font-bold">${tenant.salary.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Calificación promedio</p>
                <span className="font-bold">{tenant.avgRating.toFixed(1)}/5</span>
              </div>
              <Progress value={tenant.avgRating * 20} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Contratos previos</p>
                </div>
                <p className="font-medium">{tenant.previousContracts}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Duración promedio</p>
                </div>
                <p className="font-medium">{tenant.avgContractDuration} meses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referencias */}
        <Card>
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center text-2xl">
              <UserCheck className="mr-2 h-6 w-6 text-blue-600 " />
              Referencias
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {ApplicationReference?.map((reference, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm">
                      {reference.name[0]}
                      {reference.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {reference.name} {reference.lastname}
                    </p>
                    <p className="text-xs text-muted-foreground">{reference.relationship}</p>
                    <p className="text-xs text-primary">{reference.cellphone}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documentos */}
        <Card>
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center text-2xl">
              <FileText className="mr-2 h-6 w-6 text-blue-600" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              {ApplicationMedia?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between py-2 hover:bg-accent rounded-lg px-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm truncate">{doc.mediaType}</span>
                  </div>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <a href={doc.mediaUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 text-blue-600" />
                      <span className="sr-only">Descargar {doc.mediaType}</span>
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones */}
      <div className="mt-8 flex flex-wrap gap-4 justify-end">
        <Button
          variant="destructive"
          onClick={handleDiscard}
          className="w-full sm:w-auto"
          disabled={application.status === 2}
        >
          Descartar candidato
        </Button>
        <Button variant="default" onClick={() => setShowAddEvent(true)} className="w-full sm:w-auto bg-primary-500">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar cita
        </Button>
        <Button
          variant="default"
          onClick={handlePreselect}
          className="w-full sm:w-auto bg-primary-500"
          disabled={application.status === 1}
        >
          <UserCheck className="mr-2 h-4 w-4" />
          Preseleccionar
        </Button>
        <Button
          variant="default"
          onClick={() =>
            router.push(`/arrendador-dashboard/contratos/crear?tenant=${tenant_id}&property=${property_id}`)
          }
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
        >
          <Home className="mr-2 h-4 w-4" />
          Arrendar
        </Button>
      </div>

      <AddEventDialog
        isOpen={showAddEvent}
        onClose={() => setShowAddEvent(false)}
        tenantAuthID={tenant_id}
        propertyID={property_id}
        onSuccess={() => {
          toast({
            title: "Cita agendada",
            description: "La cita ha sido agendada exitosamente",
          })
        }}
        onError={() => {
          toast({
            title: "Error",
            description: "Ha ocurrido un error al agendar la cita",
            variant: "destructive",
          })
        }}
      />
    </div>
  )
}

