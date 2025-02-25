"use client"

import Link from "next/link"
import { useAuth0 } from "@auth0/auth0-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  const NavItems = () => (
    <>
      <Link href="/" className="hover:text-gray-200">
        Home
      </Link>
      <Link href="/about-us" className="hover:text-gray-200">
        Sobre Nosotros
      </Link>
      <Link href="/contact-us" className="hover:text-gray-200">
        Contacto
      </Link>
      <Link href="/legal-datos" className="hover:text-gray-200">
        Habeas Data
      </Link>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()} className="hover:text-gray-200">
          Logueate
        </button>
      )}
      {isAuthenticated && (
        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo:
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:3000/"
                    : "https://www.limitlessholdings.site/",
              },
            })
          }
          className="hover:text-gray-200"
        >
          Logout
        </button>
      )}
    </>
  )

  return (
    <nav className="bg-primary-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - visible en todas las pantallas */}
          <div className="flex-shrink-0">
            <img src="https://i.ibb.co/tbsXY21/Logo-Blanco.png" alt="Logo" className="h-8 w-auto" />
          </div>

          {/* Navegación para desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItems />
          </div>

          {/* Menú hamburguesa para móvil */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-primary-600">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-primary-500 text-white border-l border-primary-600">
                <div className="flex flex-col space-y-6 mt-6">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

