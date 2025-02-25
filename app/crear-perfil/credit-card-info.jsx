"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight, CreditCard, Info, CheckCircle2 } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const formSchema = z.object({
  cardHolder: z.string().min(1, "El nombre del titular es requerido"),
})

function CreditCardForm({ onNext, onBack, initialData = {} }) {
  const stripe = useStripe()
  const elements = useElements()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [serverError, setServerError] = useState("")
  const [cardDetails, setCardDetails] = useState({
    number: "•••• •••• •••• ••••",
    expiry: "MM/AA",
    cvc: "•••",
    brand: "",
  })

  async function onSubmit(values) {
    if (!stripe || !elements) return

    setIsProcessing(true)
    setServerError("")

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setIsProcessing(false)
      return
    }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: values.cardHolder },
    })

    if (error) {
      setServerError(error.message || "Error al crear el método de pago.")
      setIsProcessing(false)
      return
    }

    try {
      const response = await fetch(
        "https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/validate-card",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        },
      )

      const result = await response.json()
      if (!response.ok || !result.verified) {
        setServerError(result.error || "La validación de la tarjeta falló.")
        setIsProcessing(false)
        return
      }
    } catch (err) {
      setServerError("Error en la comunicación con el servidor.")
      setIsProcessing(false)
      return
    }

    // Si la validación fue exitosa, se pasa la info del formulario junto con paymentMethod
    onNext({ ...values, paymentMethod })
    setIsProcessing(false)
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
              Se realizará un cargo temporal de 0.50 USD que será reembolsado automáticamente dentro de los próximos 7
              días hábiles después de la verificación exitosa.
            </AlertDescription>
          </Alert>

          {/* Tarjeta visual */}
          <div className="relative perspective-1000">
            <Card
              className={`relative w-full aspect-[1.586/1] max-w-md mx-auto text-white shadow-xl rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                cardDetails.brand === "visa"
                  ? "bg-gradient-to-br from-[#1A1F71] via-[#2B3187] to-[#1A1F71]"
                  : cardDetails.brand === "mastercard"
                    ? "bg-gradient-to-br from-[#EB001B] via-[#C79000] to-[#EB001B]"
                    : cardDetails.brand === "amex"
                      ? "bg-gradient-to-br from-[#006FCF] via-[#0099DF] to-[#006FCF]"
                      : "bg-gradient-to-br from-[#27317E] via-[#1f2666] to-[#27317E]"
              }`}
            >
              <div className="absolute inset-0">
                {/* Efecto de brillo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute transform -rotate-45 translate-x-1/2 translate-y-1/2 w-[200%] h-32 bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>
                {/* Patrón de fondo */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>
              </div>
              <CardContent className="relative h-full flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-2">
                    {/* Chip de la tarjeta */}
                    <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-200 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" viewBox="0 0 40 40">
                          <pattern id="chip" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 0 4 H 8 M 4 0 V 8" stroke="black" strokeWidth="0.5" />
                          </pattern>
                          <rect width="40" height="40" fill="url(#chip)" />
                        </svg>
                      </div>
                    </div>
                    {/* Indicador de contactless */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/70">
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                        />
                        <path fill="currentColor" d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </div>
                  </div>
                  {/* Logo del banco o entidad (opcional) */}
                  <div className="text-white/90 font-semibold tracking-wider">
                    {cardDetails.brand === "visa" && "VISA"}
                    {cardDetails.brand === "mastercard" && "MASTERCARD"}
                    {cardDetails.brand === "amex" && "AMERICAN EXPRESS"}
                    {cardDetails.brand === "discover" && "DISCOVER"}
                    {cardDetails.brand === "diners" && "DINERS CLUB"}
                    {cardDetails.brand === "jcb" && "JCB"}
                    {cardDetails.brand === "unionpay" && "UNION PAY"}
                    {!cardDetails.brand && "SECURE BANK"}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="font-mono text-2xl tracking-[0.2em] text-white/90">•••• •••• •••• ••••</p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs text-white/70">Titular de la Tarjeta</p>
                    <p className="font-medium tracking-wide uppercase">
                      {form.watch("cardHolder") || "NOMBRE DEL TITULAR"}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs text-white/70">Expira</p>
                    <p className="font-medium">MM/AA</p>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stripe CardElement: se encarga de número, expiración y CVV */}
            <div className="border border-gray-200 rounded p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#000",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
                onChange={(e) => {
                  setCardDetails({
                    number: e.empty
                      ? "•••• •••• •••• ••••"
                      : e.complete
                        ? "•••• •••• •••• " + e.value?.card?.last4
                        : "•••• •••• •••• ••••",
                    expiry: e.empty
                      ? "MM/AA"
                      : e.value?.card?.exp_month && e.value?.card?.exp_year
                        ? `${String(e.value.card.exp_month).padStart(2, "0")}/${String(e.value.card.exp_year).slice(-2)}`
                        : "MM/AA",
                    cvc: e.empty ? "•••" : "•••",
                    brand: e.brand || "",
                  })
                }}
              />
            </div>
          </div>

          {serverError && (
            <Alert className="bg-red-50 border-red-200">
              <AlertTitle className="text-red-700">Error</AlertTitle>
              <AlertDescription className="text-red-600">{serverError}</AlertDescription>
            </Alert>
          )}

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
          <Button type="submit" className="bg-[#27317E] hover:bg-[#1f2666] h-11 px-6" disabled={isProcessing}>
            {isProcessing ? (
              "Procesando..."
            ) : (
              <>
                Continuar <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default function WrappedCreditCardForm(props) {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardForm {...props} />
    </Elements>
  )
}

