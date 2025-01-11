'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import Navbar from '@/components/ui/navbar'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

// Define the roles
const roles = [
  {
    id: 'Inquilino',
    title: 'Inquilino',
    description: 'Busco propiedades para alquilar y gestionar mi contrato de arrendamiento.',
    icon: <Home className="w-12 h-12" />
  },
  {
    id: 'Arrendatario',
    title: 'Arrendador',
    description: 'Tengo propiedades para alquilar y quiero gestionarlas eficientemente.',
    icon: <Building2 className="w-12 h-12" />
  }
]

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth0();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ userId, roleName }) => {
      try {
        const response = await fetch('https://backend-khaki-three-90.vercel.app/api/auth/assignRole', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, roleName }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al asignar el rol');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al asignar el rol:', error.message || error);
        throw error; 
      }
    },
    onSuccess: () => {
      toast({
        title: 'Rol asignado con éxito',
        description: `Has sido registrado como ${selectedRole === 'Inquilino' ? 'Inquilino' : 'Arrendatario'}.`,
      });
      document.cookie = `role=${selectedRole}; path=/;`;
      router.push('/crear-perfil');
    },
    onError: () => {
      setIsLoading(false);
      setSelectedRole(null);
      toast({
        title: 'Error al asignar el rol',
        description: 'Por favor, inténtalo de nuevo más tarde.',
        variant: 'destructive',
      });
    },
  });
  

  const handleSelectRole = (roleName) => {
    setSelectedRole(roleName);
    setIsLoading(true);
    if (user) {
      const userId = user.sub;
      mutation.mutate({ userId, roleName });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Image
          src="/hero_about_us.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div className="relative z-10 w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">Selecciona tu Rol</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role) => (
              <Card 
                key={role.id} 
                className={`transition-all duration-300 bg-white/90 backdrop-blur-sm ${selectedRole === role.id ? 'ring-4 ring-[#27317E]' : ''}`}
              >
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4 text-[#27317E]">
                    {role.icon}
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{role.title}</h2>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#27317E] hover:bg-[#1f2666]"
                    onClick={() => handleSelectRole(role.id)}
                    disabled={isLoading}
                  >
                    { selectedRole === role.id ? 'Asignando...' : `Seleccionar como ${role.title}`}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
