'use client'

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"

const ValidateRole = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      console.error('Auth0 error:', error);
      router.push('/error');
      return;
    }

    if (isAuthenticated && user) {
      const namespace = 'https://limitlessHoldings.com';
      const roles = user[`${namespace}/roles`] || [];
      console.log('User roles:', roles);

      if (roles.includes('Arrendatario')) {
        router.push('/Arrendatario-dashboard');
      } else if (roles.includes('Inquilino')) {
        router.push('/Inquilino-dashboard');
      } else {
        router.push('/selecciona-rol');
      }
    } else {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, user, router, error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <Card className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#27317E] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-[#27317E]">Validando roles</h2>
          <p className="text-gray-600">
            {isLoading
              ? "Estamos verificando tu información..."
              : error
              ? "Ha ocurrido un error. Redirigiendo..."
              : "Preparando tu experiencia personalizada..."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidateRole;

