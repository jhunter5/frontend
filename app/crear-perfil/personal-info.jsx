'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight } from 'lucide-react'
import { useState } from "react"

const isClient = typeof window !== "undefined";

const inquilinoSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  apellido: z.string().min(2, "El apellido es requerido"),
  cedula: z.string().min(6, "La cédula debe tener al menos 6 caracteres"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  genero: z.enum(["Masculino", "Femenino", "Otro"]),
  estadoCivil: z.enum(["soltero", "casado", "divorciado", "viudo"]),
  tipoCliente: z.enum(["soltero", "familia", "estudiante"]),
  avatar: isClient
    ? z.instanceof(File).refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "El archivo debe ser menor a 5MB"
      ).optional()
    : z.any().optional(),
})

const arrendatarioSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  apellido: z.string().min(2, "El apellido es requerido"),
  cedula: z.string().min(6, "La cédula debe tener al menos 6 caracteres"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  genero: z.enum(["Masculino", "Femenino", "Otro"]),
  avatar: isClient
    ? z.instanceof(File).refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "El archivo debe ser menor a 5MB"
      ).optional()
    : z.any().optional(),
})


export function PersonalInfoForm({ onNext, initialData = {}, userRole }) {
  const schema = userRole === 'Inquilino' ? inquilinoSchema : arrendatarioSchema
  const [preview, setPreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  function onSubmit(values) {
    onNext(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#27317E] font-spaceGrotesk">Información Personal</h2>
          <p className="text-gray-500 font-inter">
            Por favor, completa tu información personal básica.
          </p>
        </div>

        {userRole === 'Inquilino' ? (
          <>
            <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(file);
                      setPreview(URL.createObjectURL(file));
                    }}
                    className="font-inter hover:cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
                {preview && <img src={preview} alt="Previsualización" className="mt-2 h-20 w-20 rounded-full" />}
              </FormItem>
            )}
/>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inte">Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} className="font-inter" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cedula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cédula</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+34 612 345 678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Masculino" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Masculino
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Femenino" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Femenino
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Otro" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Otro
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estadoCivil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado Civil</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu estado civil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero/a</SelectItem>
                      <SelectItem value="casado">Casado/a</SelectItem>
                      <SelectItem value="divorciado">Divorciado/a</SelectItem>
                      <SelectItem value="viudo">Viudo/a</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoCliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cliente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero</SelectItem>
                      <SelectItem value="familia">Familia</SelectItem>
                      <SelectItem value="estudiante">Estudiante</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(file);
                        setPreview(URL.createObjectURL(file));
                      }}
                      className="font-inter hover:cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                  {preview && <img src={preview} alt="Previsualización" className="mt-2 h-20 w-20 rounded-full transition-transform duration-200 hover:scale-110 hover:shadow-lg" />}
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} className="font-inter" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Pérez" {...field} className="font-inter" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cedula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Cédula</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} className="font-inter" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+34 612 345 678" {...field}  className="font-inter"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-inter" >Género</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Masculino" />
                        </FormControl>
                        <FormLabel className="font-normal font-inter">
                          Masculino
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Femenino" />
                        </FormControl>
                        <FormLabel className="font-normal font-inter">
                          Femenino
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="Otro" />
                        </FormControl>
                        <FormLabel className="font-normal font-inter">
                          Otro
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) }

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#27317E] hover:bg-[#1f2666] font-inter">
            Continuar <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

