"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from '../utils/getAuth0id';
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function MercadoPagoConnect() {
  const [isAuthorizing, setIsAuthorizing] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter();
  const { user } = useAuth0();

  const handleAuthorize = async () => {
    setIsAuthorizing(true)
    const userId = getAuth0Id(user.sub);

    router.push(`https://auth.mercadopago.com.co/authorization?client_id=3261770885104033&response_type=code&platform_id=mp&state=${userId}&redirect_uri=https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/mercado-pago/callback`)
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Conecta tu cuenta de Mercado Pago</CardTitle>
            <CardDescription>
              Autoriza a nuestra aplicación para acceder a tu cuenta de Mercado Pago y poder recibir el pago de tus arrendamientos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isAuthorized ? (
              <>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">¿Por qué conectar tu cuenta?</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Procesa pagos de forma segura y rápida</li>
                    <li>Gestiona tus transacciones directamente desde nuestra plataforma</li>
                    <li>Facilita a tus inquilinos el proceso de pago de arrendamiento</li>
                  </ul>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Tu información está segura. Solo accederemos a los datos necesarios para procesar pagos y no
                    compartiremos tu información personal.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Pasos para conectar tu cuenta:</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Haz clic en el botón "Autorizar Mercado Pago" a continuación</li>
                    <li>Inicia sesión en tu cuenta de Mercado Pago si aún no lo has hecho</li>
                    <li>Revisa los permisos solicitados y acepta la autorización</li>
                    <li>Serás redirigido de vuelta a nuestra plataforma</li>
                  </ol>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>¿Es seguro conectar mi cuenta?</AccordionTrigger>
                    <AccordionContent>
                      Sí, utilizamos protocolos de seguridad estándar de la industria y Mercado Pago para proteger tu
                      información. No almacenamos datos sensibles de tu cuenta.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>¿Puedo desconectar mi cuenta más tarde?</AccordionTrigger>
                    <AccordionContent>
                      Sí, puedes revocar el acceso a tu cuenta de Mercado Pago en cualquier momento desde la configuración
                      de tu perfil o directamente desde tu cuenta de Mercado Pago.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>¿Qué información podrán ver de mi cuenta?</AccordionTrigger>
                    <AccordionContent>
                      Solo accederemos a la información necesaria para procesar pagos y gestionar transacciones. No
                      tendremos acceso a tu saldo, historial completo de transacciones ni información personal sensible.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ) : (
              <Alert className="bg-green-100 border-green-500">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Cuenta conectada con éxito</AlertTitle>
                <AlertDescription className="text-green-700">
                  Tu cuenta de Mercado Pago ha sido conectada exitosamente a nuestra plataforma. Ahora puedes comenzar a
                  procesar pagos y gestionar tus transacciones.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            {!isAuthorized ? (
              <Button onClick={handleAuthorize} disabled={isAuthorizing} className="bg-primary-400">
                {isAuthorizing ? "Autorizando..." : "Autorizar Mercado Pago"}
              </Button>
            ) : (
              <Button asChild>
                <Link href="/dashboard">Ir al Dashboard</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

