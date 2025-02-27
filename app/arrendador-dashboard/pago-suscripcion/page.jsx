"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Shield,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building2,
  BarChart,
  MessageSquare,
} from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "@tanstack/react-query"
import { getAuth0Id } from "@/app/utils/getAuth0id"

export default function SubscriptionPayment() {
    const [isProcessing, setIsProcessing] = useState(false)
    const { user } = useAuth0()

    const fetchAmountSubscription = async () => {
        const auth0Id = getAuth0Id(user?.sub)

        const amount = await fetch("https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/landlord/amount-payment-subscription",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ landlordAuthID: auth0Id }),
            }
        )
        if (!amount.ok) {
            throw new Error("Error fetching amount")
        }

        return amount.json()
    }

    const handlePayment = async () => {
        try {
            setIsProcessing(true)
            const auth0Id = getAuth0Id(user?.sub)
            const response = await fetch("https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/mercado-pago/create-landlord-preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ landlordId: auth0Id }),
            })

            const paymentData = await response.json()

            if (response.ok) {
                window.location.href = paymentData.init_point
            } else {
                console.error("No se pudo realizar el pago")
            }
        } catch (error) {
            console.error("Error al procesar el pago", error)
        }
        finally {
            setIsProcessing(false)
        }
    }
    
    const { data: amountData, isLoading } = useQuery({
        queryKey: ["subscription-amount"],
        queryFn: fetchAmountSubscription,
    })

    console.log(amountData)

    if (isLoading) {
        return <p>Cargando...</p>
    }

    return (
        <div className="container max-w-5xl mx-auto py-8 px-4">
        <div className="space-y-8">
            {/* Encabezado */}
            <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Pago de Membresía Mensual</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Continúa disfrutando de todos los beneficios de nuestra plataforma y mantén tu perfil activo para seguir
                conectando con los mejores inquilinos y administrar tus propiedades facilmente.
            </p>
            </div>

            {/* Monto a pagar */}
            <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 bg-primary-400 rounded-md">
                <div className="text-center space-y-2 ">
                <p className="text-muted-foreground text-neutral-50">Monto a pagar</p>
                <p className="text-4xl font-bold text-neutral-50">{amountData.amount} COP</p>
                <p className="text-sm text-muted-foreground text-neutral-50">Membresía mensual</p>
                </div>
            </CardContent>
            </Card>

            {/* Beneficios principales */}
            <div className="grid gap-6 md:grid-cols-3">
            <Card>
                <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Protección Garantizada</CardTitle>
                <CardDescription>Seguridad en cada transacción y verificación completa de inquilinos</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Inquilinos Verificados</CardTitle>
                <CardDescription>
                    Acceso a una base de inquilinos pre-evaluados y con historial verificado
                </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                <FileText className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Respaldo en reparaciones</CardTitle>
                <CardDescription>Asistencia en reparaciones y mantenimiento de propiedades</CardDescription>
                </CardHeader>
            </Card>
            </div>

            {/* Servicios incluidos */}
            <Card>
            <CardHeader>
                <CardTitle>Servicios Incluidos en tu Membresía</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                    <p className="font-medium">Publicaciones Ilimitadas</p>
                    <p className="text-sm text-muted-foreground">Publica todas tus propiedades sin restricciones</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Building2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                    <p className="font-medium">Gestión de Propiedades</p>
                    <p className="text-sm text-muted-foreground">Dashboard completo para administrar tus inmuebles</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <BarChart className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                    <p className="font-medium">Análisis de Mercado</p>
                    <p className="text-sm text-muted-foreground">Estadísticas y reportes detallados</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <MessageSquare className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                    <p className="font-medium">Soporte Premium</p>
                    <p className="text-sm text-muted-foreground">Atención personalizada 24/7</p>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>

            {/* Alerta de información */}
            <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Información importante</AlertTitle>
            <AlertDescription>
                El pago se procesará a través de Mercado Pago. Una vez completado, tu membresía se renovará automáticamente
                por 30 días.
            </AlertDescription>
            </Alert>

            {/* FAQ */}
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>¿Cómo se renueva mi suscripción?</AccordionTrigger>
                <AccordionContent>
                Tu suscripción se renueva automáticamente cada mes. Recibirás una notificación por email antes de cada
                renovación.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>¿Puedo cancelar en cualquier momento?</AccordionTrigger>
                <AccordionContent>
                Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. No hay
                períodos de permanencia obligatorios.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>¿Qué métodos de pago aceptan?</AccordionTrigger>
                <AccordionContent>
                Aceptamos todas las tarjetas de crédito y débito principales a través de Mercado Pago, así como
                transferencias bancarias y otros métodos disponibles en tu región.
                </AccordionContent>
            </AccordionItem>
            </Accordion>

            {/* Botón de pago */}
            <div className="flex flex-col items-center gap-4">
            <Button size="lg" className="w-full max-w-md text-lg bg-primary-400" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                </>
                ) : (
                <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pagar ahora
                </>
                )}
            </Button>
            <p className="text-sm text-muted-foreground">
                Al hacer clic en "Pagar ahora" serás redirigido a Mercado Pago para completar tu pago de forma segura.
            </p>
            </div>
        </div>
        </div>
    )
}

