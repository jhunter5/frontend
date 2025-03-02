"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Home, User, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

const fetchContractById = async (id) => {
  const contract = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/contracts/${id}`)

  if (!contract.ok) {
    throw new Error("Error fetching contract")
  }

  return contract.json()
}

const fetchPropertyById = async (id) => {
  const property = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/property/${id}`)

  if (!property.ok) {
    throw new Error("Error fetching property")
  }

  return property.json()
}

const fetchTenantById = async (id) => {
  const tenant = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/tenant/${id}`)

  if (!tenant.ok) {
    throw new Error("Error fetching tenant")
  }

  return tenant.json()
}

export default function ContractDetails({ params }) {
  const router = useRouter()

  const { data: contract, isLoading: contractLoading } = useQuery({
    queryKey: ["contract", params.id],
    queryFn: () => fetchContractById(params.id),
  });

  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ["property", contract?._id],
    queryFn: () => fetchPropertyById(contract?.propertyId),
    enabled: !!contract, 
  });

  const { data: tenant, isLoading: tenantLoading } = useQuery({
    queryKey: ["tenant", contract?._id],
    queryFn: () => fetchTenantById(contract?.tenantAuthID),
    enabled: !!contract, 
  });


  if (contractLoading || propertyLoading || tenantLoading) return <p>Cargando...</p>;


  return (
    <div className="container mx-auto py-8">
      {console.log(contract)}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/arrendador-dashboard/propiedades/${property?.property.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a propiedad
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
      <Card className="flex flex-col h-full">
  <CardHeader>
    <CardTitle className="text-2xl font-bold flex items-center">
      <Calendar className="mr-2 h-6 w-6" />
      Detalles del Contrato
    </CardTitle>
  </CardHeader>
  
  {/* Asegura que el contenido ocupe todo el espacio disponible */}
  <CardContent className="flex flex-col flex-grow">
    <div className="flex-grow space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Estado:</span>
        <Badge variant={contract?.status === "active" ? "success" : "secondary"}>
          {contract?.status}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Fecha de inicio</p>
          <p className="font-medium">{contract?.startDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Fecha de finalización</p>
          <p className="font-medium">{contract?.endDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Monto mensual</p>
          <p className="font-medium">${contract?.monthlyRent}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Duración</p>
          <p className="font-medium">{contract?.duration} meses</p>
        </div>
      </div>
    </div>
  </CardContent>

  {/* Botón siempre pegado abajo */}
  {contract?.ContractDocument?.length > 0 && (
  <CardFooter className="mt-auto">
    <Button className="w-full bg-primary-400">
      <a href={contract.ContractDocument[0].documentUrl} target="_blank" rel="noopener noreferrer">
        Descargar Contrato
      </a>
    </Button>
  </CardFooter>
  )}
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
                <img
                  src={property?.media[0]?.mediaUrl || "/placeholder.svg"}
                  alt="Imagen de la propiedad"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="font-medium capitalize">{property?.property?.address}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium capitalize">{property?.property?.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Habitaciones</p>
                  <p className="font-medium capitalize">{property?.property?.rooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Baños</p>
                  <p className="font-medium capitalize">{property?.property?.bathrooms}</p>
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
                <p className="font-medium">{tenant?.firstName + ' ' + tenant?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{tenant?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{tenant?.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

