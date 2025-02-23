"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight, CreditCard, Info, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  cardHolder: z.string().min(1, "El nombre del titular es requerido"),
  cardNumber: z.string().min(16, "El número de tarjeta debe tener 16 dígitos").max(16),
  expiryMonth: z.string().min(1, "El mes es requerido"),
  expiryYear: z.string().min(1, "El año es requerido"),
  cvv: z.string().min(3, "El CVV debe tener 3 dígitos").max(3),
})

// SVG logos como componentes
const VisaLogo = () => (
  <svg className="h-8" viewBox="0 0 1000 324" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M651.185 318.083H530.577L604.528 6.71533H725.143L651.185 318.083Z" fill="white" />
    <path
      d="M444.271 6.71533L329.51 219.283L314.492 154.674L314.499 154.697L289.415 36.1483C289.415 36.1483 286.155 6.71533 247.66 6.71533H76.5458L75 12.1453C75 12.1453 121.256 21.8663 172.262 46.0163L278.325 318.076H403.601L589.199 6.71533H444.271Z"
      fill="white"
    />
    <path d="M367.359 6.71533L268.464 318.083H147.849L246.751 6.71533H367.359Z" fill="white" />
    <path
      d="M820.494 6.71533C794.108 6.71533 775.606 11.8473 775.606 11.8473L764.714 73.4083C764.714 73.4083 784.886 65.9923 813.942 65.9923C831.141 65.9923 847.04 71.1243 847.04 87.8373C847.04 96.2583 845.741 100.084 845.741 100.084C845.741 100.084 825.569 99.4333 814.677 100.735C769.12 104.561 755.868 127.414 755.868 151.574C755.868 193.819 791.51 198.951 808.709 198.951C849.638 198.951 864.19 176.098 864.19 176.098L862.891 196.432H973.5C973.5 196.432 925.574 6.71533 820.494 6.71533ZM812.643 142.502C812.643 153.417 804.111 162.489 786.912 162.489C774.721 162.489 767.488 156.056 767.488 145.141C767.488 127.777 782.04 121.345 809.935 121.345C815.868 121.345 812.643 142.502 812.643 142.502Z"
      fill="white"
    />
  </svg>
)

const MastercardLogo = () => (
  <svg className="h-8" viewBox="0 0 1000 618" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M382.496 49.0195H617.504V568.98H382.496V49.0195Z" fill="#FF5F00" />
    <path
      d="M401.465 309C401.465 210.347 446.382 121.781 515.006 58.4634C458.195 22.1175 390.812 0 319.145 0C142.852 0 0 142.852 0 319.145C0 495.438 142.852 638.29 319.145 638.29C390.812 638.29 458.195 616.173 515.006 579.827C446.382 516.509 401.465 427.943 401.465 329.29V309Z"
      fill="#EB001B"
    />
    <path
      d="M1000 319.145C1000 495.438 857.148 638.29 680.855 638.29C609.188 638.29 541.805 616.173 484.994 579.827C553.618 516.509 598.535 427.943 598.535 329.29V309C598.535 210.347 553.618 121.781 484.994 58.4634C541.805 22.1175 609.188 0 680.855 0C857.148 0 1000 142.852 1000 319.145Z"
      fill="#F79E1B"
    />
  </svg>
)

export default function CreditCardForm({ onNext, onBack, initialData = {} }) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cardType, setCardType] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  function onSubmit(values) {
    onNext(values)
  }

  function formatCardNumber(value) {
    const cleaned = value.replace(/\D/g, "")
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ")
    return formatted
  }

  function detectCardType(number) {
    const cleaned = number.replace(/\D/g, "")
    // Visa
    if (cleaned.startsWith("4")) {
      return "visa"
    }
    // Mastercard
    if (/^5[1-5]/.test(cleaned)) {
      return "mastercard"
    }
    return null
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-8 h-8 text-[#27317E]" />
            <h2 className="text-2xl font-bold text-[#27317E]">Verificación de Tarjeta</h2>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertTitle className="text-blue-700">Proceso de Verificación</AlertTitle>
            <AlertDescription className="text-blue-600">
              Se realizará un cargo temporal de €1.00 que será reembolsado automáticamente dentro de los próximos 7 días
              hábiles después de la verificación exitosa.
            </AlertDescription>
          </Alert>

          {/* Tarjeta Visual */}
          <div className="relative perspective-1000">
            <Card className="relative w-full aspect-[1.586/1] max-w-md mx-auto bg-gradient-to-br from-[#27317E] to-[#1f2666] text-white shadow-xl rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                <div
                  className="absolute inset-0 bg-repeat opacity-10"
                  style={{
                    backgroundImage:
                      "url('data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E')",
                  }}
                />
              </div>
              <CardContent className="relative h-full flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-8 rounded bg-white/10 backdrop-blur-sm" />
                  <div className="transition-opacity duration-300">
                    {cardType === "visa" && <VisaLogo />}
                    {cardType === "mastercard" && <MastercardLogo />}
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="font-mono text-2xl tracking-wider">{cardNumber || "•••• •••• •••• ••••"}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs text-white/70">Titular de la Tarjeta</p>
                    <p className="font-medium tracking-wide">{cardHolder || "NOMBRE DEL TITULAR"}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs text-white/70">Expira</p>
                    <p className="font-medium">
                      {expiryMonth || "MM"}/{expiryYear?.slice(-2) || "AA"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Titular de la Tarjeta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NOMBRE COMO APARECE EN LA TARJETA"
                      className="h-11 border-gray-200 focus:ring-2 focus:ring-[#27317E]/20"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setCardHolder(e.target.value.toUpperCase())
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Número de Tarjeta
                    {cardType && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {cardType === "visa" ? "Visa" : "Mastercard"}
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="h-11 border-gray-200 focus:ring-2 focus:ring-[#27317E]/20 font-mono"
                      maxLength={19}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "")
                        field.onChange(value)
                        setCardNumber(formatCardNumber(value))
                        setCardType(detectCardType(value))
                      }}
                      value={cardNumber}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Mes</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            setExpiryMonth(value)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 border-gray-200 focus:ring-2 focus:ring-[#27317E]/20">
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, "0")
                              return (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Año</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            setExpiryYear(value)
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 border-gray-200 focus:ring-2 focus:ring-[#27317E]/20">
                              <SelectValue placeholder="AAAA" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = (new Date().getFullYear() + i).toString()
                              return (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">CVV</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="123"
                        className="h-11 border-gray-200 focus:ring-2 focus:ring-[#27317E]/20"
                        maxLength={3}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Alert className="bg-green-50 border-green-200 mt-6">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-700">Transacción Segura</AlertTitle>
            <AlertDescription className="text-green-600">
              Utilizamos encriptación de grado bancario para proteger tu información. Tus datos nunca son almacenados en
              nuestros servidores.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack} className="h-11">
            <ChevronLeft className="w-4 h-4 mr-2" /> Atrás
          </Button>
          <Button type="submit" className="bg-[#27317E] hover:bg-[#1f2666] h-11 px-6">
            Continuar <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

