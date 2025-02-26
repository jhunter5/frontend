"use client";

import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast"

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { toast } = useToast(); // Usamos el hook de toast

  // Abrir el modal para el registro
  const handleSignUpClick = () => {
    setIsTermsModalOpen(true);
  };

  // Confirmar registro con términos aceptados
  const handleConfirmSignUp = () => {
    if (termsAccepted) {
      setIsTermsModalOpen(false);
      loginWithRedirect({
        authorizationParams: {
          screen_hint: "signup", // Redirige al flujo de registro
        },
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor, acepta los términos y condiciones para registrarte.",
        variant: "destructive", // Estilo rojo para errores
      });
    }
  };

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
        <>
          <button onClick={handleSignUpClick} className="hover:text-gray-200 ml-4">
            Registrate
          </button>
          <button onClick={() => loginWithRedirect()} className="hover:text-gray-200">
            Login
          </button>
        </>
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
  );

  return (
    <nav className="bg-primary-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://i.ibb.co/tbsXY21/Logo-Blanco.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Navegación para desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItems />
          </div>

          {/* Menú hamburguesa para móvil */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-primary-600"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-primary-500 text-white border-l border-primary-600"
              >
                <div className="flex flex-col space-y-6 mt-6">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Modal de términos para registro */}
      <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Aceptar Términos y Condiciones</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4"
              />
              <span>
                Acepto los{" "}
                <Link href="/legal-datos" target="_blank" className="text-blue-600 underline">
                  Términos y Condiciones
                </Link>
              </span>
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTermsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmSignUp}
              disabled={!termsAccepted}
              className={termsAccepted ? "bg-blue-600" : "bg-gray-400"}
            >
              Registrarme
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}