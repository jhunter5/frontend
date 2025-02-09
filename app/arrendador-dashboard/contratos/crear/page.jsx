"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Send } from "lucide-react"
import Link from "next/link"

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
    // Aquí iría la lógica para enviar los datos del contrato
    console.log(formData)
    // Redirigir a la lista de contratos o a la vista del contrato creado
    router.push("/dashboard/contracts")
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

