'use client'

import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import { getAuth0Id } from '../utils/getAuth0id';

const ValidateRole = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const router = useRouter();

  const checkProfile = async (role) => {
    try {
      const userId = getAuth0Id(user.sub);
      let response; 

      response = await fetch('https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/auth/verifyProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId })
      });

      response  = await response.json();
      const hasProfile = response.hasProfile;

      if (hasProfile) {
        if (role === 'Arrendatario') {
          const mercadoPago = await checkAccesToken();
          if (mercadoPago) {
            router.push('/arrendador-dashboard/propiedades');
          }
          else {
            router.push('/mercado-pago');
          }
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

  const checkAccesToken = async () => {
    try {
      const userId = getAuth0Id(user.sub);
      const response = await fetch(`http://localhost:3001/api/landlord/mercado-pago/validate-access-token/${userId}`)
      console.log("ESTADO DE LA RESPUESTA: ", response.status);
      if (response.status === 200) {
        return true;
      } else if (response.status === 404) {
        return false;
      }
    }
    catch (error) {
      console.error('Error al verificar el token:', error);
      router.push('/error');
    }
  }

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
        src="/set_usuario_bg.jpg"
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

