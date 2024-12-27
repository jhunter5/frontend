import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "El servicio proporcionado por LIMITLESS ha sido excepcional. Han simplificado enormemente la gestión de mis propiedades y han aumentado mis ingresos por aquiler.",
      propertyType: "Propietario de múltiples propiedades",
    },
    {
      quote: "El servicio proporcionado por LIMITLESS ha sido excepcional. Han simplificado enormemente la gestión de mis propiedades y han aumentado mis ingresos por aquiler.",
      propertyType: "Propietario de múltiples propiedades",
    },
    {
      quote: "El servicio proporcionado por LIMITLESS ha sido excepcional. Han simplificado enormemente la gestión de mis propiedades y han aumentado mis ingresos por aquiler.",
      propertyType: "Propietario de múltiples propiedades",
    },
    {
      quote: "El servicio proporcionado por LIMITLESS ha sido excepcional. Han simplificado enormemente la gestión de mis propiedades y han aumentado mis ingresos por aquiler.",
      propertyType: "Propietario de múltiples propiedades",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#27317E]">
          Lo que dicen nuestros clientes
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-[#27317E] mb-4" />
                    <blockquote className="mb-4 text-gray-600">
                      {testimonial.quote}
                    </blockquote>
                    <div className="mt-4">
                      <p className="font-semibold">Cliente Satisfecho</p>
                      <p className="text-sm text-gray-500">{testimonial.propertyType}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

