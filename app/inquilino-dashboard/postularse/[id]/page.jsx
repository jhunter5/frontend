"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, UserPlus, FileText, Send } from 'lucide-react'

export default function PostulateForm({ params }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    references: [{ name: "", relationship: "", contact: "" }],
    documents: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReferenceChange = (index, field, value) => {
    const updatedReferences = [...formData.references]
    updatedReferences[index][field] = value
    setFormData((prev) => ({ ...prev, references: updatedReferences }))
  }

  const addReference = () => {
    setFormData((prev) => ({
      ...prev,
      references: [...prev.references, { name: "", relationship: "", contact: "" }],
    }))
  }

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    setFormData((prev) => ({ ...prev, documents: [...prev.documents, ...uploadedFiles] }))
  }

  const handleSubmit = () => {
    alert("Tu postulación ha sido enviada con éxito.")
    console.log("Formulario enviado:", formData)
    router.push(`/inquilino-dashboard/mi-vivienda`)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="group transition-all duration-300 ease-in-out">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver
        </Button>
      </div>

      <Card className="w-full shadow-lg overflow-hidden">
        <CardHeader className="bg-primary-500 text-white">
          <CardTitle className="text-3xl font-bold">Formulario de Postulación</CardTitle>
          <CardDescription className="text-blue-100">
            Completa el formulario para postularte a la propiedad
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-8">
            {/* Datos personales */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-blue-500" />
                Datos Personales
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Ingresa tu número de teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Biografía */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Descripción Personal
              </h3>
              <div className="space-y-2">
                <Label htmlFor="bio">Cuéntanos sobre ti</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Escribe una breve descripción sobre ti..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <Separator />

            {/* Referencias */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-blue-500" />
                Referencias
              </h3>
              {formData.references.map((ref, index) => (
                <div key={index} className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-name-${index}`}>Nombre</Label>
                    <Input
                      id={`ref-name-${index}`}
                      placeholder="Nombre de la referencia"
                      value={ref.name}
                      onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-relationship-${index}`}>Relación</Label>
                    <Input
                      id={`ref-relationship-${index}`}
                      placeholder="Tipo de relación"
                      value={ref.relationship}
                      onChange={(e) => handleReferenceChange(index, "relationship", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-contact-${index}`}>Contacto</Label>
                    <Input
                      id={`ref-contact-${index}`}
                      placeholder="Información de contacto"
                      value={ref.contact}
                      onChange={(e) => handleReferenceChange(index, "contact", e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="mt-2 transition-all duration-300 ease-in-out hover:bg-blue-50"
                onClick={addReference}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Añadir Referencia
              </Button>
            </div>

            <Separator />

            {/* Documentos */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center">
                <Upload className="mr-2 h-5 w-5 text-blue-500" />
                Documentos Adjuntos
              </h3>
              <div className="space-y-2">
                <Label htmlFor="documents">Sube tus documentos</Label>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Por favor, sube los siguientes documentos:</p>
                  <ul className="list-disc pl-6 text-sm text-gray-600">
                    <li>Cerfificacion laboral</li>
                    <li>Documentos de identidad</li>
                    <li>Soporte de Pago de Nomina de los Últimos 3 Meses</li>
                    <li>Extractos Bancarios de los Últimos 3 Meses</li>
                  </ul>
                  <p className="text-xs text-gray-500">Formatos aceptados: PDF, DOC, DOCX (máx. 10MB)</p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="documents"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                      </p>
                    </div>
                    <input
                      id="documents"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
              {formData.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Documentos cargados:</h4>
                  <ul className="list-disc list-inside">
                    {formData.documents.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Separator />

            {/* Botón de envío */}
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-primary-500 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out"
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar Postulación
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
