import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-[#27317E] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">LIMITLESS</h3>
            <p className="text-gray-200 text-sm">
              Simplificando la gestión de propiedades y maximizando el valor de tus inversiones inmobiliarias.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/_limitless_holdings_/?igsh=YzBqN21ic3o0MnZx#" className="hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-gray-300">Inicio</Link>
              <Link href="/about-us" className="hover:text-gray-300">Sobre Nosotros</Link>
              <Link href="/contact-us" className="hover:text-gray-300">Contacto</Link>
              <Link href="/legal-datos" className="hover:text-gray-300">Habes data</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">limitless.holdings0@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+57 318 8387926</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Bogotá, Colombia</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-gray-200">
              Suscríbete para recibir las últimas novedades y actualizaciones.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-3 py-2 text-gray-900 rounded-md"
              />
              <Button 
                type="submit" 
                className="w-full bg-white text-[#27317E] hover:bg-gray-100"
              >
                Suscribirse
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200/20" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-200">
          <p>© 2025 Limitless. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <Link href="/legal-datos" className="hover:text-gray-300">
              Política de Privacidad
            </Link>
            <Link href="/legal-datos" className="hover:text-gray-300">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

