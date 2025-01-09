import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#27317E] text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para evolucionar tus propiedades?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Contáctenos hoy mismo para descubrir cómo nuestros servicios pueden 
          ayudarle a maximizar el valor de sus inversiones inmobiliarias.
        </p>
        <Button 
          variant="secondary" 
          size="lg"
          className="bg-white text-[#27317E] hover:bg-gray-100"
        >
          <Link href="/contact-us" className="hover:text-gray-200">Solicita una consulta</Link>
        </Button>
      </div>
    </section>
  )
}
