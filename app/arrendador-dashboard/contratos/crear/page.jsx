"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Send, User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from 'next/navigation'
import { useMutation } from "@tanstack/react-query"

const fetchCandidate = async (id) => {
  const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/tenant/${id}`)

  if (!response.ok) {
    throw new Error("Error fetching tenant")
  }

  return response.json()
}

const createContract = async (data) => {
  // const response = await fetch("https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/contract", {
  //   method: "POST",
  //   body: data,
  // })

  const response = await fetch("http://localhost:3001/api/contract", {
    method: "POST",
    body: data,
  })

  if (!response.ok) {
    throw new Error("Error creating contract")
  }

  return response.json()
}


export default function CreateContract() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    monthlyAmount: "",
    durationMonths: "",
    totalValue: 0,
    contractFile: null,
  })
  const searchParams = useSearchParams()
  const tenant_id = searchParams.get('tenant')
  const property_id = searchParams.get('property')

  const { isPending, isError, data: tenant, error } = useQuery({
    queryKey: ["tenant"],
    queryFn: () => fetchCandidate(tenant_id),
  })

  const mutation = useMutation({
    mutationFn: createContract,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value }
      if (name === "monthlyAmount" || name === "durationMonths") {
        newState.totalValue = Number(newState.monthlyAmount) * Number(newState.durationMonths)
      }
      return newState
    })
  }

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      contractFile: e.target.files[0],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const contractData = new FormData()
    contractData.append("startDate", formData.startDate)
    contractData.append("endDate", formData.endDate)
    contractData.append("monthlyAmount", formData.monthlyAmount)
    contractData.append("durationMonths", formData.durationMonths)
    contractData.append("totalValue", formData.totalValue)
    contractData.append("contractFile", formData.contractFile)
    contractData.append("tenant_id", tenant_id)
    contractData.append("property_id", property_id)

    contractData.forEach((value, key) => {
      console.log(key, value);
    });

    mutation.mutate(contractData)

    // router.push("/dashboard/contracts")
  }

  if (isPending) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/arrendador-dashboard/propiedades-busqueda">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a candidaturas
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            <User className="mr-2 h-5 w-5" />
            Información del candidato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={tenant.avatar} alt={tenant.firstName} />
              <AvatarFallback>
                {tenant.firstName[0]}{tenant.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{tenant.name}</h3>
              <p className="text-sm text-muted-foreground">{tenant.email}</p>
              <p className="text-sm text-muted-foreground">{tenant.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crear Nuevo Contrato de Arrendamiento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha de Inicio</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha de Finalización</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyAmount">Monto Mensual</Label>
                <Input
                  id="monthlyAmount"
                  name="monthlyAmount"
                  type="number"
                  value={formData.monthlyAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="durationMonths">Duración (meses)</Label>
                <Input
                  id="durationMonths"
                  name="durationMonths"
                  type="number"
                  value={formData.durationMonths}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalValue">Valor Total del Contrato</Label>
              <Input id="totalValue" name="totalValue" type="number" value={formData.totalValue} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractFile">Documento del Contrato</Label>
              <Input id="contractFile" name="contractFile" type="file" onChange={handleFileChange} required />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="submit" className="bg-primary-400 text-white">
                <Send className="mr-2 h-4 w-4" />
                Crear Contrato
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

