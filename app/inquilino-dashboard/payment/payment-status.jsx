"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, ArrowRight, Download, RefreshCcw, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function PaymentStatus({ status, amount, paymentId, date, paymentMethod, onRetry }) {
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      title: "¡Pago Exitoso!",
      description: "Tu pago ha sido procesado correctamente.",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    pending: {
      icon: Clock,
      title: "Pago Pendiente",
      description: "Tu pago está siendo procesado.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    failed: {
      icon: XCircle,
      title: "Pago Fallido",
      description: "Lo sentimos, hubo un problema con tu pago.",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <div className={cn("mx-auto rounded-full p-3 w-16 h-16 mb-4", config.bgColor)}>
          <Icon className={cn("w-10 h-10", config.color)} />
        </div>
        <CardTitle className="text-2xl font-bold text-center">{config.title}</CardTitle>
        <p className="text-center text-muted-foreground">{config.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-muted-foreground">Monto</span>
          <span className="font-semibold">${amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-muted-foreground">ID de Pago</span>
          <span className="font-mono text-sm">{paymentId}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-muted-foreground">Fecha</span>
          <span>{date}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {status === "success" && (
          <>
            <Button className="w-full" asChild>
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Ir al Dashboard
              </Link>
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Descargar Recibo
            </Button>
          </>
        )}
        {status === "pending" && (
          <>
            <Button className="w-full" asChild>
              <Link href="/dashboard">
                <ArrowRight className="mr-2 h-4 w-4" />
                Ver Estado del Pago
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Te notificaremos cuando el pago sea procesado
            </p>
          </>
        )}
        {status === "failed" && (
          <>
            <Button className="w-full" onClick={onRetry}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reintentar Pago
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/support">Contactar Soporte</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

