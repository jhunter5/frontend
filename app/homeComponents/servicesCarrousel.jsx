import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Settings2, Wrench, Brain, ShieldCheck, FileChartColumnIncreasing} from 'lucide-react'

export default function ServicesCarousel() {
  const services = [
    {
      title: "Automatizacion de la gestion",
      description: "Automatiza pagos, cobros y solicitudes de mantenimiento. Simplifica la gestión de tus propiedades y maximiza los ingresos mensuales.",
      icon: <Settings2 className="w-12 h-12 text-[#27317E]" />,
    },
    {
      title: "Gestión Total de Administración y Reparaciones",
      description: "Red estratégica de los profesionales y especialistas más calificados. Mantenimientos preventivos y correctivos con seguimiento en tiempo real.",
      icon: <Wrench className="w-12 h-12 text-[#27317E]" />,
    },
    {
      title: "Selección Inteligente de Inquilinos con IA",
      description: "Análisis completo del perfil de los inquilinos utilizando inteligencia artificial para minimizar riesgos y asegurar la mejor selección.",
      icon: <Brain className="w-12 h-12 text-[#27317E]" />,
    },
    {
      title: "Inquilinos con Perfil Verificado y Calificado",
        description: "Verificación de identidad, historial crediticio y referencias laborales para asegurar inquilinos confiables y responsables.",
        icon: <ShieldCheck className="w-12 h-12 text-[#27317E]" />,
    },
    {
        title: "Datos y Análisis para Decisiones Inteligentes",
        description: "Informes y análisis de datos en tiempo real para tomar decisiones informadas y estratégicas sobre tus propiedades y contratos.",
        icon: <FileChartColumnIncreasing className="w-12 h-12 text-[#27317E]" />,
    }
  ]

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Conoce nuestros servicios
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-[#27317E] hover:bg-[#1f2666] w-full">
                    <Link href="/contact-us" className="hover:text-gray-200">Agenda tu cita</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

