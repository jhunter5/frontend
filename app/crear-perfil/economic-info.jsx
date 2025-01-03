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
import { ChevronLeft, ChevronRight } from 'lucide-react'

const formSchema = z.object({
  salario: z.string().min(1, "El salario es requerido"),
  tipoContrato: z.enum(["indefinido", "temporal", "autonomo", "practicas"]),
  industria: z.string().min(1, "La industria es requerida"),
  frecuenciaPago: z.enum(["mensual", "quincenal", "semanal"]),
})

export default function EconomicInfoForm({ onNext, onBack, initialData = {} }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  function onSubmit(values) {
    onNext(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#27317E]">Información Económica</h2>
          <p className="text-gray-500">
            Por favor, proporciona información sobre tu situación económica.
          </p>
        </div>

        <FormField
          control={form.control}
          name="salario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salario Mensual</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoContrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Contrato</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de contrato" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="indefinido">Indefinido</SelectItem>
                  <SelectItem value="temporal">Temporal</SelectItem>
                  <SelectItem value="autonomo">Autónomo</SelectItem>
                  <SelectItem value="practicas">Prácticas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industria</FormLabel>
              <FormControl>
                <Input placeholder="Tecnología" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frecuenciaPago"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frecuencia de Pago</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la frecuencia de pago" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="quincenal">Quincenal</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Atrás
          </Button>
          <Button type="submit" className="bg-[#27317E] hover:bg-[#1f2666]">
            Continuar <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

