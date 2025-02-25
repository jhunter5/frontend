'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import ServicesCarousel from "./homeComponents/servicesCarrousel"
import KnowMoreVideo from "./homeComponents/knowMoreVideoHolder"
import CTASection from "./homeComponents/callToAction"
import TestimonialsSection from "./homeComponents/testimonialSection"
import FAQSection from "./homeComponents/FAQSection" 
import Footer from "@/components/ui/footer"
import Navbar from "@/components/ui/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="flex-1 container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 h-full">
          {/* Left Column */}
          <div className="p-8 md:p-16 flex flex-col justify-center max-w-xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Obten la <span className="text-[#27317E]">libertad</span>
              <br />
              con la que sueñas
            </h1>

            <p className="text-gray-600 mb-8">
              Gestiona tus propiedades y contratos con facilidad, automatiza los cobros y mantenimientos, y toma
              decisiones inteligentes con análisis de datos.
            </p>

            <div className="space-y-4 mb-8">
              <Input type="text" placeholder="Nombre" className="w-full" />
              <Input type="email" placeholder="Email" className="w-full" />
              <Button className="w-full bg-primary-500 hover:bg-primary-600">
                <Link href="/contact-us" className="hover:text-gray-200">
                  Contacta con nosotros
                </Link>
              </Button>
              <p className="text-xs text-center text-gray-500">Nunca compartiremos tu información con nadie.</p>
            </div>

            {/* Trustpilot Rating */}
            <div className="flex flex-col items-start gap-2">
              <div className="text-sm">Excellent</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                ))}
              </div>
              <div className="text-sm">Trustpilot</div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative hidden md:block h-[600px] my-auto">
            <Image
              src="/home_hero_image.jpg"
              alt="Modern buildings"
              className="object-cover rounded-lg"
              fill
              priority
            />
          </div>
        </div>
      </div>

      {/* Some Interesting stats section */}
      <div className="bg-primary-500 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-5xl font-bold">+100</h2>
            <p className="text-3xl">Propiedades gestionadas</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-5xl font-bold">+500</h2>
            <p className="text-3xl">Contratos firmados</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-5xl font-bold">+1000</h2>
            <p className="text-3xl">Clientes satisfechos</p>
          </div>
        </div>
      </div>

      {/* Services Carousel */}
      <ServicesCarousel />

      {/* Know More Video */}
      <KnowMoreVideo />

      {/* FAQ Section - Añadido aquí */}
      <FAQSection />

      {/* Call to Action */}
      <CTASection />

      {/* Testimonios*/}
      <TestimonialsSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

