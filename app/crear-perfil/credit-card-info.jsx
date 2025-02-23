"use client"

import React, { useState } from "react"
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
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Clave pública de Stripe (reemplazar con la tuya)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

// Usamos sólo el campo del titular en el esquema, ya que los demás se gestionan con Stripe.
const formSchema = z.object({
  cardHolder: z.string().min(1, "El nombre del titular es requerido")
})

// Componente para mostrar la tarjeta visual
function CreditCardVisual({ cardHolder }) {
  return (
    <Card className="relative w-full aspect-[1.586/1] max-w-md mx-auto bg-gradient-to-br from-[#27317E] to-[#1f2666] text-white shadow-xl rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div
          className="absolute inset-0 bg-repeat opacity-10"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
      </div>
      <CardContent className="relative h-full flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <div className="w-12 h-8 rounded bg-white/10 backdrop-blur-sm" />
          {/* Aquí podrías mostrar logos según el tipo de tarjeta si lo deseas */}
        </div>
        <div className="space-y-6">
          <p className="font-mono text-2xl tracking-wider">•••• •••• •••• ••••</p>
        </div>
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-xs text-white/70">Titular de la Tarjeta</p>
            <p className="font-medium tracking-wide">{cardHolder || "NOMBRE DEL TITULAR"}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs text-white/70">Expira</p>
            <p className="font-medium">MM/AA</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente principal que integra Stripe y el formulario
function PaymentForm({ onNext, onBack, initialData = {} }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [cardHolder, setCardHolder] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const submitHandler = async (data, e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    // Crear PaymentMethod usando CardElement
    const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: cardHolder }
    })

    if (pmError) {
      setError(pmError.message || "Error desconocido")
      setVerificationResult(null)
      return
    }

    setError(null)
    setProcessing(true)

    try {
      // Aquí envías paymentMethod.id a tu backend para validar la tarjeta.
      const response = await fetch("http://localhost:3001/api/validate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id })
      })

      const result = await response.json()
      if (response.ok) {
        setVerificationResult("Tarjeta verificada correctamente.")
        // Puedes pasar junto al onNext tanto los datos del formulario como paymentMethod
        onNext({ ...data, paymentMethod })
      } else {
        setVerificationResult("Verificación fallida: " + result.error)
      }
    } catch (err) {
      setVerificationResult("Error en la comunicación con el servidor.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Form>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-8 h-8 text-[#27317E]" />
            <h2 className="text-2xl font-bold text-[#27317E]">Verificación de Tarjeta</h2>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertTitle className="text-blue-700">Proceso de Verificación</AlertTitle>
            <AlertDescription className="text-blue-600">
              Se realizará un cargo temporal de €1.00 que será reembolsado automáticamente dentro de los próximos 7 días hábiles después de la verificación exitosa.
            </AlertDescription>
          </Alert>

          {/* Tarjeta Visual */}
          <div className="relative perspective-1000">
            <CreditCardVisual cardHolder={cardHolder} />
          </div>

          <div className="mt-8 space-y-6">
            <FormField>
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Titular de la Tarjeta</FormLabel>
                <FormControl>
                  <Input
                    placeholder="NOMBRE COMO APARECE EN LA TARJETA"
                    className="h-11 border-gray-200 focus:ring-2 focus:ring-[#27317E]/20"
                    {...register("cardHolder", { required: "El nombre es requerido" })}
                    onChange={(e) => {
                      setCardHolder(e.target.value.toUpperCase())
                    }}
                  />
                </FormControl>
                <FormMessage>{errors.cardHolder && errors.cardHolder.message}</FormMessage>
              </FormItem>
            </FormField>

            {/* Aquí se integra Stripe con CardElement */}
            <div className="border border-gray-200 rounded p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#000",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" }
                  }
                }}
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
            {verificationResult && <div className="text-green-500 text-sm">{verificationResult}</div>}
          </div>

          <Alert className="bg-green-50 border-green-200 mt-6">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-700">Transacción Segura</AlertTitle>
            <AlertDescription className="text-green-600">
              Utilizamos encriptación de grado bancario para proteger tu información. Tus datos nunca son almacenados en nuestros servidores.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack} className="h-11">
            <ChevronLeft className="w-4 h-4 mr-2" /> Atrás
          </Button>
          <Button type="submit" className="bg-[#27317E] hover:bg-[#1f2666] h-11 px-6" disabled={processing}>
            {processing ? "Procesando..." : <>Continuar <ChevronRight className="w-4 h-4 ml-2" /></>}
          </Button>
        </div>
      </form>
    </Form>
  )
}

// Exportamos PaymentPage, envolviendo PaymentForm con el provider de Stripe
export default function PaymentPage({ onNext, onBack, initialData = {} }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onNext={onNext} onBack={onBack} initialData={initialData} />
    </Elements>
  )
}