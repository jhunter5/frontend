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
    id: 'tenant',
    title: 'Inquilino',
    description: 'Busco propiedades para alquilar y gestionar mi contrato de arrendamiento.',
    icon: <Home className="w-12 h-12" />
  },
  {
    id: 'landlord',
    title: 'Arrendatario',
    description: 'Tengo propiedades para alquilar y quiero gestionarlas eficientemente.',
    icon: <Building2 className="w-12 h-12" />
  }
]

async function assignRoleToUser(userId, roleId) {
  console.log("Empezando a asignar el rol");
  const response = await fetch('/api/assign-role', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, roleId })
  });
  
  if (!response.ok) {
    throw new Error('Error al asignar el rol');
  }
  return response.json();
}

export default function SelectRole() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth0();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ userId, roleId }) => assignRoleToUser(userId, roleId),
    onSuccess: () => {
      toast({
        title: "Rol asignado con éxito",
        description: `Has sido registrado como ${selectedRole === 'tenant' ? 'Inquilino' : 'Arrendatario'}.`,
      });
      router.push('/dashboard');
    },
    onError: () => {
      console.log("Error al asignar el rol");
      setIsLoading(false);
      setSelectedRole(null);
      toast({
        title: "Error al asignar el rol",
        description: "Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    },
  });

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
    setIsLoading(true);
    if (user) {
      const userId = user.sub;
      mutation.mutate({ userId, roleId });
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
