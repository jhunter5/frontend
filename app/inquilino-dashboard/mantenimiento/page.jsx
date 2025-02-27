"use client"

import { useState } from "react"
import emailjs from "emailjs-com"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Wrench, AlertTriangle, Clock, Upload, Send, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function MaintenanceForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "", // Nuevo campo
    issue: "",
    priority: "media",
    image: null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handlePriorityChange = (value) => {
    setFormData((prev) => ({ ...prev, priority: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 5 * 1024 * 1024) {
      setError("La imagen no debe superar los 5MB")
      return
    }
    setFormData({ ...formData, image: file })
    setError("")
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await emailjs.send(
        "service_o28y0qm",
        "template_l1uumcd",
        {
          nombre: formData.name,
          correo: formData.email,
          telefono: formData.phoneNumber,
          direccion: formData.address, 
          descripcion: formData.issue,
          categoria: formData.priority,
        },
        "uQvOfIWQ1qIjsNu2x",
      )
      setShowDialog(true)
    } catch (error) {
      setError("Hubo un problema al enviar la solicitud. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button variant="outline" asChild className="mb-6 hover:bg-gray-200 transition-colors">
          <Link href="/inquilino-dashboard/mi-vivienda">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a mi vivienda
          </Link>
        </Button>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary-500 text-white space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center">
              <Wrench className="mr-3 h-6 w-6" />
              Solicitud de Mantenimiento
            </CardTitle>
            <p className="text-primary-foreground/90 text-sm md:text-base">
              Describe el problema y proporciona los detalles necesarios para ayudarte mejor.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSendEmail} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Teléfono de contacto</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+57"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nivel de prioridad</Label>
                  <Select value={formData.priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">
                        <div className="flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                          Alta - Urgente
                        </div>
                      </SelectItem>
                      <SelectItem value="media">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                          Media - Normal
                        </div>
                      </SelectItem>
                      <SelectItem value="baja">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-green-500" />
                          Baja - Puede esperar
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección completa</Label>
                <Textarea
                  id="address"
                  placeholder="Calle, número, piso..."
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="min-h-[80px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Por favor, proporciona la dirección completa donde se requiere el mantenimiento
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue">Descripción del problema</Label>
                <Textarea
                  id="issue"
                  placeholder="Describe detalladamente el problema que necesita ser resuelto..."
                  value={formData.issue}
                  onChange={handleChange}
                  required
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Evidencia fotográfica (Opcional)</Label>
                <div className="flex items-center gap-4">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Máximo 5MB por imagen. Formatos aceptados: JPG, PNG</p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className={cn("w-full transition-all", isLoading && "opacity-80")}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-green-600 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                ¡Solicitud Enviada!
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-600">
                Tu solicitud de mantenimiento ha sido enviada exitosamente. Nos pondremos en contacto contigo lo antes
                posible para atender tu problema.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Entendido</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

