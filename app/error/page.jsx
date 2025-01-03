'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ErrorPage({ error, reset }) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to your error tracking service
    console.error('An error occurred:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with image */}
      <div className="md:w-1/2 relative">
        <Image
          src="/error.png"
          alt="Error illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side with error content */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8 bg-[#27317E] text-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-9xl font-extrabold text-white opacity-20">Error</h1>
            <div className="relative -mt-20">
              <AlertTriangle className="w-20 h-20 text-white mx-auto" />
              <h2 className="mt-2 text-3xl font-bold">Oops! Algo salió mal</h2>
            </div>
            <p className="mt-4 text-lg">Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando para solucionarlo.</p>
          </div>

          <div className="flex flex-col space-y-4">
            <Button 
              onClick={() => reset()}
              className="bg-white text-[#27317E] hover:bg-gray-100"
            >
              Intentar de nuevo
            </Button>
            <Button 
              onClick={() => router.push('/')}
              className="border-white text-[#27317E] bg-white hover:bg-white/90"
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

