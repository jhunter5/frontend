"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Wrench, AlertTriangle, Clock, Upload, Send } from 'lucide-react';
import Link from "next/link";

export default function MaintenanceRequestForm() {
  const [formData, setFormData] = useState({
    description: "",
    priority: "media",
    images: null,
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value) => {
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud enviada:", formData);
    setShowDialog(true);
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button variant="outline" asChild className="hover:bg-gray-200 transition-colors">
          <Link href="/inquilino-dashboard/mi-vivienda">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a mi vivienda
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl max-w-2xl mx-auto">
        <CardHeader className="bg-primary-500 text-white p-6">
          <CardTitle className="text-3xl font-bold flex items-center">
            <Wrench className="mr-2 h-6 w-6" />
            Solicitud de Mantenimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Descripción del problema
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe detalladamente el problema que necesita ser resuelto"
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                Prioridad
              </Label>
              <Select name="priority" value={formData.priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                      Alta
                    </div>
                  </SelectItem>
                  <SelectItem value="media">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                      Media
                    </div>
                  </SelectItem>
                  <SelectItem value="baja">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-green-500" />
                      Baja
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images" className="text-sm font-medium text-gray-700">
                Adjuntar imágenes (opcional)
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="images"
                  name="images"
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">Puedes subir hasta 3 imágenes (máx. 5MB cada una)</p>
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    className="w-full bg-primary-500 hover:bg-primary-400 text-white transition-colors">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600 flex items-center">
              <Wrench className="mr-2 h-6 w-6" />
              Solicitud Enviada
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              Tu solicitud de mantenimiento ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto para atender tu problema.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

