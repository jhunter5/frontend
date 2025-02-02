"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, User, Briefcase, Calendar, Star, Home, CheckCircle, XCircle, Download } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from '@auth0/auth0-react'
import { ro } from "date-fns/locale"

// Simulación de datos del candidato
const getCandidate = (id) => ({
  id,
  name: "Ana Martínez",
  age: 32,
  occupation: "Ingeniera de Software",
  avatar: "/placeholder.svg?height=128&width=128",
  email: "ana.martinez@example.com",
  phone: "+34 612 345 678",
  currentSalary: 45000,
  desiredRent: 1200,
  creditScore: 720,
  employmentStatus: "Empleado tiempo completo",
  yearsOfEmployment: 5,
  rentalHistory: [
    { address: "Calle Mayor 123, Madrid", duration: "3 años", endDate: "2023-01-31", onTimePayments: "95%" },
    { address: "Avenida Central 45, Barcelona", duration: "2 años", endDate: "2020-01-31", onTimePayments: "100%" },
  ],
  references: [
    { name: "Carlos Gómez", relationship: "Anterior arrendador", contact: "carlos@example.com" },
    { name: "Laura Sánchez", relationship: "Jefe actual", contact: "laura@example.com" },
  ],
  documents: [
    { name: "Contrato de trabajo", status: "Verificado", fileUrl: "/dummy-files/contrato-trabajo.pdf" },
    { name: "Declaración de impuestos", status: "Pendiente", fileUrl: "/dummy-files/declaracion-impuestos.pdf" },
    { name: "Historial crediticio", status: "Verificado", fileUrl: "/dummy-files/historial-crediticio.pdf" },
  ],
})

export default function CandidateProfile({ params }) {
  const [candidate, setCandidate] = useState(null)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const id = params.id
  const searchParams = useSearchParams()
  const property = searchParams.get('property')
  
  useEffect(() => {
    const fetchedCandidate = getCandidate(params.id)
    setCandidate(fetchedCandidate)
  }, [params.id])

  if (!candidate) {
    return <div>Cargando...</div>
  }

  const handlePreselect = () => {
    console.log("Candidato preseleccionado")
    // Aquí iría la lógica para preseleccionar al candidato
  }

  const handleDiscard = () => {
    console.log("Candidato descartado")
    // Aquí iría la lógica para descartar al candidato
  }

  function AddEventDialog({ isOpen, onClose, tenantAuthID, propertyID }) {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [description, setDescription] = useState("")
    const toast = useToast()
    const { user } = useAuth0()
    const landLordAuthID = getAuth0Id(user.sub)
    
    
    const saveAppointment = useMutation({
      mutationFn : async (data) => {
        const response = await fetch("http://localhost:3001/api/appointment", {
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
          toast({
            title: 'Cita Creada',
            description: 'La propiedad ha sido creada exitosamente',
            status: 'success',
          }); 
          onClose();
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Ha ocurrido un error al crear la cita',
            status: 'error',
            variant: 'destructive',
          });
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
              <div className="flex gap-2">
                <Input type="time" 
                className="w-24" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <Input placeholder="Add description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleAppointmentSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const handleScheduleAppointment = () => {
    setShowAddEvent(true) 
  }

  const handleRent = () => {
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
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{candidate.name}</h2>
                <p className="text-muted-foreground">{candidate.occupation}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Edad:</strong> {candidate.age} años
              </p>
              <p>
                <strong>Email:</strong> {candidate.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {candidate.phone}
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
              <p className="font-semibold">Estado laboral</p>
              <p>{candidate.employmentStatus}</p>
            </div>
            <div>
              <p className="font-semibold">Años en empleo actual</p>
              <p>{candidate.yearsOfEmployment} años</p>
            </div>
            <div>
              <p className="font-semibold">Salario actual</p>
              <p>${candidate.currentSalary.toLocaleString()}/año</p>
            </div>
            <div>
              <p className="font-semibold">Renta deseada</p>
              <p>${candidate.desiredRent.toLocaleString()}/mes</p>
            </div>
            <div>
              <p className="font-semibold">Puntuación crediticia</p>
              <div className="flex items-center">
                <Progress value={candidate.creditScore / 8.5} className="mr-2" />
                <span>{candidate.creditScore}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Historial de Alquiler
            </CardTitle>
          </CardHeader>
          <CardContent>
            {candidate.rentalHistory.map((rental, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <p className="font-semibold">{rental.address}</p>
                <p className="text-sm text-muted-foreground">Duración: {rental.duration}</p>
                <p className="text-sm text-muted-foreground">Finalización: {rental.endDate}</p>
                <p className="text-sm">Pagos a tiempo: {rental.onTimePayments}</p>
              </div>
            ))}
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
            {candidate.references.map((reference, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <p className="font-semibold">{reference.name}</p>
                <p className="text-sm text-muted-foreground">{reference.relationship}</p>
                <p className="text-sm">{reference.contact}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {candidate.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <span>{doc.name}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={doc.status === "Verificado" ? "success" : "warning"}>
                      {doc.status === "Verificado" ? (
                        <CheckCircle className="mr-1 h-4 w-4" />
                      ) : (
                        <XCircle className="mr-1 h-4 w-4" />
                      )}
                      {doc.status}
                    </Badge>
                    <Button variant="outline" size="icon" asChild>
                      <a href={doc.fileUrl} download>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descargar {doc.name}</span>
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={handleDiscard}>
          Descartar
        </Button>
        <Button variant="outline" onClick={handlePreselect}>
          Preseleccionar
        </Button>
        <Button variant="outline" onClick={handleScheduleAppointment}>
          Agendar cita
        </Button>
        <Button onClick={handleRent}>Arrendar</Button>
      </div>
      <AddEventDialog isOpen={showAddEvent} onClose={() => setShowAddEvent(false)}  tenantAuthID={id} propertyID={property}/>
    </div>
  )
}

