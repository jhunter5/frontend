'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent,
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { User2 } from 'lucide-react';
import Navbar from "@/components/ui/navbar";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '+57',
    accountType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      'service_o28y0qm', 
      'template_xwi0jrb', 
      {
        nombre: formData.firstName,
        apellido: formData.lastName,
        correo: formData.email,
        telefono: formData.phoneNumber,
        tipoCuenta: formData.accountType,
      },
      'uQvOfIWQ1qIjsNu2x'
    ).then((response) => {
      console.log("Correo enviado con éxito:", response);
      alert("Tu mensaje ha sido enviado. Te contactaremos pronto.");
    }).catch((error) => {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un problema al enviar el mensaje. Inténtalo nuevamente.");
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Sección del formulario */}
        <div className="p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contáctanos</h1>
            <p className="text-gray-600 mb-8">
              ¿Tienes preguntas o necesitas ayuda? Completa el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas.
            </p>

            <form className="space-y-6" onSubmit={handleSendEmail}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input className="bg-blue-100 border-blue-300 text-gray-800 placeholder-gray-500" id="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input className="bg-blue-100 border-blue-300 text-gray-800 placeholder-gray-500" id="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input className="bg-blue-100 border-blue-300 text-gray-800 placeholder-gray-500" id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <Input className="bg-blue-100 border-blue-300 text-gray-800 placeholder-gray-500" id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Cuenta</Label>
                <div className="space-y-4">
                  <div
                    onClick={() => setFormData({ ...formData, accountType: 'Propietario' })}
                    className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer ${
                      formData.accountType === 'Propietario' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <User2 className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Soy Arrendador</p>
                      <p className="text-sm text-gray-600">Quiero administrar mis propiedades.</p>
                    </div>
                  </div>
                  <div
                    onClick={() => setFormData({ ...formData, accountType: 'Arrendatario' })}
                    className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer ${
                      formData.accountType === 'Arrendatario' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <User2 className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Soy Arrendatario</p>
                      <p className="text-sm text-gray-600">Estoy buscando una vivienda en arriendo.</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                Enviar
              </Button>
            </form>
          </div>
        </div>
        {/* Sección de Testimonios */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1728737592723-9fc940125a96?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fondo"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute bottom-12 left-12 right-12 z-20">
            <blockquote className="space-y-4">
              <p className="text-2xl font-medium leading-relaxed text-white">
                &quot;Limitless me ha permitido gestionar mis propiedades de forma eficiente y ahorrar tiempo en procesos administrativos.&quot;
              </p>
              <footer className="text-white">
                <p className="font-medium">Juan Pérez</p>
                <p className="text-gray-400">Propietario de 3 propiedades</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
