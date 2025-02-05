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
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from "@/app/utils/getAuth0id"

export default function PostulateForm({ params }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    applicationData: {
      "property": "", 
      "tenantAuthID": "", 
      "status": 0, 
      "score": 0,
      "personalDescription": ""
    },
    applicationMedias: [],
    applicationReferences: []
  })
  const {user} = useAuth0()
  const tenant_id = getAuth0Id(user?.sub)
  const property_id = params.id

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      applicationData: {
        ...formData.applicationData,
        [name]: value
      }
    });
  };

  const handleFileUpload = (e, docType) => {
    const { files } = e.target;
    const media = Array.from(files).map(file => ({
      mediaType: docType, // El tipo de documento (como 'Documento de identidad', etc.)
      file: {
        data: file, // El archivo como un objeto File
        name: file.name,
        mimetype: file.type
      }
    }));

    setFormData({
      ...formData,
      applicationMedias: [...formData.applicationMedias, ...media]
    });
  };

  const handleReferenceChange = (index, e) => {
    const { name, value } = e.target;
    const newReferences = [...formData.applicationReferences];
    newReferences[index][name] = value;
    setFormData({
      ...formData,
      applicationReferences: newReferences
    });
  };

  const addReference = () => {
    setFormData({
      ...formData,
      applicationReferences: [
        ...formData.applicationReferences,
        { name: '', lastname: '', cellphone: '', relationship: '' }
      ]
    });
  };

  const removeReference = (index) => {
    const newReferences = formData.applicationReferences.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      applicationReferences: newReferences
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData(prevState => ({
      ...prevState, // Mantén el resto del estado sin cambios
      applicationData: {
        ...prevState.applicationData, // Mantén los valores anteriores de applicationData
        property: property_id, // Actualiza el valor de property
        tenantAuthID: tenant_id // Actualiza el valor de tenantAuthID
      }
    }));
    
    // Crear una instancia de FormData
    console.log(formData)
    // Enviar el formulario con FormData
    const response = await fetch('http://localhost:3001/api/application', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Postulación enviada exitosamente');
    } else {
      alert('Error al enviar la postulación');
    }

};


  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.back()} className="group transition-all duration-300 ease-in-out">
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
                  id="personalDescription"
                  name="personalDescription"
                  placeholder="Escribe una breve descripción sobre ti..."
                  value={formData.applicationData.personalDescription}
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
              {formData?.applicationReferences?.map((ref, index) => (
                <div key={index} className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ref-firstname-${index}`}>Nombre</Label>
                    <Input
                      id={`ref-firstname-${index}`}
                      type = "text"
                      name = "name"
                      placeholder="Nombre de la referencia"
                      value={ref.name}
                      onChange={(e) => handleReferenceChange(index, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-lastname-${index}`}>Apellido</Label>
                    <Input
                      type = "text"
                      name = "lastname"
                      id={`ref-lastname-${index}`}
                      placeholder="Apellido de la referencia"
                      value={ref.lastname}
                      onChange={(e) => handleReferenceChange(index, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-relationship-${index}`}>Relación</Label>
                    <Input
                      type = "text"
                      name = "relationship"
                      id={`ref-relationship-${index}`}
                      placeholder="Tipo de relación"
                      value={ref.relationship}
                      onChange={(e) => handleReferenceChange(index, e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ref-contact-${index}`}>Contacto</Label>
                    <Input
                      type = "text"
                      name = "cellphone"
                      id={`ref-contact-${index}`}
                      placeholder="Información de contacto"
                      value={ref.contact}
                      onChange={(e) => handleReferenceChange(index, e)}
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

            <Separator className="my-8" />

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold flex items-center text-gray-800">
                <Upload className="mr-3 h-6 w-6 text-blue-500" />
                Documentos Adjuntos
              </h3>
              <p className="text-sm text-gray-600">Sube los documentos requeridos:</p>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Certificación laboral",
                  "Documento de identidad",
                  "Soporte de pago de nómina (últimos 3 meses)",
                  "Extractos bancarios (últimos 3 meses)",
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Label className="block mb-2 text-sm font-medium text-gray-700">{doc}</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, doc)}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                ))}
              </div>
              {formData?.applicationMedia?.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-700">Documentos cargados:</h4>
                  <ul className="list-disc list-inside">
                    {formData.applicationMedia.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Separator className="my-8" />

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-primary-500"
              >
                <Send className="mr-2 h-5 w-5" />
                Enviar Postulación
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
