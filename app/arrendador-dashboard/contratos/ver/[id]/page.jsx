"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Home, User, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Simulación de datos del contrato
const getContract = (id) => ({
  id,
  startDate: "2025-03-01",
  endDate: "2026-02-28",
  monthlyAmount: 1200,
  durationMonths: 12,
  totalValue: 14400,
  status: "Activo",
  property: {
    id: "prop123",
    address: "Calle Principal 123, Ciudad Ejemplo",
    image: "/placeholder.svg?height=200&width=300",
    type: "Apartamento",
    bedrooms: 2,
    bathrooms: 1,
  },
  tenant: {
    id: "tenant456",
    name: "Ana García",
    email: "ana.garcia@example.com",
    phone: "+34 612 345 678",
  },
  documentUrl: "/dummy-files/contrato-ejemplo.pdf",
})

export default function ContractDetails({ params }) {
  const router = useRouter()
  const [contract, setContract] = useState<any>(null)

  useEffect(() => {
    const fetchedContract = getContract(params.id)
    setContract(fetchedContract)
  }, [params.id])

  if (!contract) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/contracts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a contratos
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Calendar className="mr-2 h-6 w-6" />
              Detalles del Contrato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Estado:</span>
                <Badge variant={contract.status === "Activo" ? "success" : "secondary"}>{contract.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de inicio</p>
                  <p className="font-medium">{contract.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de finalización</p>
                  <p className="font-medium">{contract.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monto mensual</p>
                  <p className="font-medium">${contract.monthlyAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duración</p>
                  <p className="font-medium">{contract.durationMonths} meses</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor total del contrato</p>
                <p className="text-xl font-bold">${contract.totalValue}</p>
              </div>
              <Button className="w-full" onClick={() => window.open(contract.documentUrl, "_blank")}>
                <Download className="mr-2 h-4 w-4" />
                Descargar Contrato
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Home className="mr-2 h-6 w-6" />
              Detalles de la Propiedad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={contract.property.image || "/placeholder.svg"}
                  alt="Imagen de la propiedad"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="font-medium">{contract.property.address}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">{contract.property.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Habitaciones</p>
                  <p className="font-medium">{contract.property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Baños</p>
                  <p className="font-medium">{contract.property.bathrooms}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <User className="mr-2 h-6 w-6" />
              Información del Inquilino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-medium">{contract.tenant.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{contract.tenant.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{contract.tenant.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

