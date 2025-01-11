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

  const mockCheckProfile = async (role, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (role === 'Arrendatario') {
          resolve({ hasProfile: true }); 
          if (userId === 'auth0|67705cfb16e8d188ded222c6') resolve({ hasProfile: true });
        } else if (role === 'Inquilino') {
          if (userId === 'auth0|677759d78987d373042dd4ff') resolve({ hasProfile: true });
        } else {
          resolve({ hasProfile: false });
        }
      }, 1000); 
    });
  }; // Mock function for testing purposes

  const checkProfile = async (role) => {
    try {
      const userId = user.sub;
      let response; 

      /*if (role === 'Arrendatario') {
        response = await fetch('/api/landlord-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
      } else if (role === 'Inquilino') {
        response = await fetch('/api/tenant-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
      } */ // Commented out for testing purposes

      response = await mockCheckProfile(role, userId);

      //const hasProfile = await response.json();
      const hasProfile = response.hasProfile;

      if (hasProfile) {
        if (role === 'Arrendatario') {
          router.push('/arrendatario-dashboard/propiedades');
        }
        else if (role === 'Inquilino') {
          router.push('/inquilino-dashboard/buscador-propiedades');
        }
      } else {
        router.push('/crear-perfil');
      }
    }
    catch (error) {
      console.error('Error al verificar el perfil:', error);
      router.push('/error');
    }
  }

  const checkRole = (user) => {
    const namespace = 'https://limitlessHoldings.com';
    const roles = user[`${namespace}/roles`] || [];
    const rol = roles[0];

    if (rol) {
      document.cookie = `role=${rol}; path=/; `;
      // document.cookie = `role=${roles[0]}; path=/; secure; HttpOnly; SameSite=Strict`; // Uncomment for production
      return rol;
    }
    else {
      router.push('/selecciona-rol');
    }
  };

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      console.error('Auth0 error:', error);
      router.push('/error');
      return;
    }

    if (isAuthenticated && user) {

      const rol = checkRole(user);

      if (rol) {
        if (rol === 'Arrendatario') {
          checkProfile('Arrendatario');
        } else if (rol === 'Inquilino') {
          checkProfile('Inquilino');
        } 
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

