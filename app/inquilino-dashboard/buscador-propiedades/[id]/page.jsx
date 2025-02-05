"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, MapPin, Home, Bed, Car, Bath, Calendar, Ruler, Building, Info, DollarSign } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const fetchProperty = async (id) => {
  const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/property/${id}`)

  if (!response.ok) {
    throw new Error('No se pudo cargar la propiedad')
  }
  return response.json()
}

export default function PropertyDetails({ params }) {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['property', params.id],
    queryFn: () => fetchProperty(params.id),
  }) 

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return <p>Cargando...</p>
  }

  const property = data || {};
  console.log(property);
  

  const imageUrl = property.media?.length > 0 ? property.media[0].mediaUrl : "https://via.placeholder.com/300";

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors">
          <Link href="/inquilino-dashboard/buscador-propiedades">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Buscador
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-primary-500 text-white">
          <CardTitle className="text-3xl font-bold">Detalles de la Propiedad</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
              <img src={imageUrl} alt="Vista de la propiedad" className="w-full h-full object-cover" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white shadow-md">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600">
                    <MapPin className="h-5 w-5" />
                    Ubicación
                  </h2>
                  <p className="text-gray-700">
                    {property.property.address.charAt(0).toUpperCase() + property.property.address.slice(1)}
                  </p>
                  <p className="text-gray-700">{property.property.city}, {property.property.state}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600">
                    <Home className="h-5 w-5" />
                    Tipo de Propiedad
                  </h2>
                  <p className="text-gray-700">
                    {property.property.type.charAt(0).toUpperCase() + property.property.type.slice(1)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[ 
                { icon: Bed, label: "Habitaciones", value: property.property.rooms },
                { icon: Bath, label: "Baños", value: property.property.bathrooms },
                { icon: Car, label: "Parqueadero", value: property.property.parking ? 'Sí' : 'No' },
                { icon: Ruler, label: "Metros Cuadrados", value: `${property.property.squareMeters} m²` },
                { icon: Building, label: "Estrato", value: property.property.tier },
                { icon: Calendar, label: "Antigüedad", value: `${property.property.age} años` },
              ].map((item, index) => (
                <Card key={index} className="bg-white shadow-md">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium text-gray-800">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="my-6" />

            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-600">
                  <Info className="h-5 w-5" />
                  Descripción
                </h2>
                <p className="text-gray-700 leading-relaxed">{property.property.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-green-600 text-white shadow-md">
              <CardContent className="p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Canon Arrendamiento</h2>
                <p className="text-3xl font-bold flex items-center">
                  <DollarSign className="h-8 w-8 mr-2" />
                  {property.property.rentPrice || "No disponible"}
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button onClick={() => setShowDialog(true)} className="bg-blue-600 text-white hover:bg-blue-700">
                Postularse a la Propiedad
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Postularse a la Propiedad</DialogTitle>
            <DialogDescription>¿Estás seguro de que deseas postularte a esta propiedad?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancelar</Button>
            <Button>
              <Link href={`/inquilino-dashboard/postularse/${property.property._id}`}>Confirmar</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}