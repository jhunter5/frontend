'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Card } from "@/components/ui/card"
import { PersonalInfoForm } from './personal-info'
import EconomicInfoForm from './economic-info'
import { PreferencesForm } from './preferences'
import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/ui/navbar'
import { useAuth0 } from "@auth0/auth0-react";
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useToast } from "@/hooks/use-toast"

const Inquilinosteps = [
  {
    id: 'personal',
    name: 'Información Personal',
    description: 'Datos básicos de identificación',
  },
  {
    id: 'economic',
    name: 'Información Económica',
    description: 'Detalles financieros',
  },
  {
    id: 'preferences',
    name: 'Preferencias',
    description: 'Preferencias de vivienda o inquilinos',
  },
]

const ArrendadorSteps = [
  {
    id: 'personal',
    name: 'Información Personal',
    description: 'Datos básicos de identificación',
  },
  {
    id: 'preferences',
    name: 'Preferencias',
    description: 'Preferencias de vivienda o inquilinos',
  },
]

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personal: {},
    economic: {},
    preferences: {},
  })
  const [userRole, setUserRole] = useState('')
  const { user } = useAuth0();
  const { toast } = useToast();
  const router = useRouter()
  const steps = userRole === 'Inquilino' ? Inquilinosteps : ArrendadorSteps;

  useEffect(() => {
    const roleFromCookie = Cookies.get('role');
    if (roleFromCookie) {
      setUserRole(roleFromCookie);
    }
  }, []);

  const TenantProfile = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch('https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/tenant', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
      }
  
      return response.json();
    },
  })

  const LandlordProfile = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/landlord', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
      }
  
      return response.json();
    },
  })

  const LandlordPreferences = useMutation({
    mutationFn: async ({ landlordAuthId, preferenceType, preferenceValue }) => {
      const response = await fetch('https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/landlord-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantAuthID: landlordAuthId,
          preferenceType,
          preferenceValue,
        }),
      });
  
      if (!response.created) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error guardando la preferencia: ${preferenceType}`);
      }
  
      return response.json();
    },
  });

  const TenantPreferences = useMutation({
    mutationFn: async ({ tenantAuthId, preferenceType, preferenceValue }) => {
      const response = await fetch('https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/tenant-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantAuthID: tenantAuthId,
          preferenceType,
          preferenceValue,
        }),
      });

      if (!response.created) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error guardando la preferencia: ${preferenceType}`);
      }

      return response.json();
    },
  }); 
  
  const handleNext = (data) => {
    setFormData(prev => ({
      ...prev,
      [steps[currentStep].id]: data
    }))
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleFinish =  (data) => {

    const updatedFormData = {
      ...formData,
      [steps[currentStep].id]: data,
    };
    
    setFormData(updatedFormData);

    if (userRole === 'Arrendatario') {
      const profileData = {
        id: updatedFormData.personal.cedula,
        authID: getAuth0Id(user.sub),
        firstName: updatedFormData.personal.nombre,
        lastName: updatedFormData.personal.apellido,
        phone: updatedFormData.personal.telefono,
        email: user.email,
        gender: updatedFormData.personal.genero,
        files: updatedFormData.personal.avatar,
      }

      LandlordProfile.mutate({ ...profileData }, {
        onSuccess: async () => {
          // const arrendatarioId = response._id;
          const landlordId = getAuth0Id(user.sub);
          const preferences = formData.preferences;
          
            try {
            await Promise.all(
              Object.entries(preferences).map(([preferenceType, preferenceValue]) => {
              return LandlordPreferences.mutate({
                landlordAuthId: landlordId,
                preferenceType,
                preferenceValue,
              });
              })
            );
            toast({
              title: "Perfil creado",
              description: "Tu perfil ha sido creado exitosamente.",
              status: "success",
              duration: 2000,
            });
            router.push('/mercado-pago');
            } 
            catch (error) {
              throw new Error(error.message);
            }
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Ocurrió un error al crear el perfil. Intenta de nuevo",
            duration: 4000,
            variant: 'destructive',
          });
        }
      });
    }
    else if(userRole === 'Inquilino') {
      const tenantData = {
        id: updatedFormData.personal.cedula,
        authID: getAuth0Id(user.sub),
        idType: "C.C",
        firstName: updatedFormData.personal.nombre,
        lastName: updatedFormData.personal.apellido,
        gender: updatedFormData.personal.genero,
        phone: updatedFormData.personal.telefono,
        email: user.email,
        files: updatedFormData.personal.avatar,
        age: updatedFormData.personal.edad,
        maritalStatus: updatedFormData.personal.estadoCivil,
        salary: updatedFormData.economic.salario,
        contractType: updatedFormData.economic.tipoContrato,
        industry: updatedFormData.economic.industria,
        paymentFrequency: updatedFormData.economic.frecuenciaPago,
        isFamily: updatedFormData.preferences.tipoCliente === "familia" ? true : false,
      }

      TenantProfile.mutate({ ...tenantData }, {
        onSuccess: async () => {
          const tenantId = getAuth0Id(user.sub);
          const preferences = formData.preferences;

          try {
            await Promise.all(
              Object.entries(preferences).map(([preferenceType, preferenceValue]) => {
              return TenantPreferences.mutate({
                tenantAuthId: tenantId,
                preferenceType,
                preferenceValue,
              });
              })
            );
            toast({
              title: "Perfil creado",
              description: "Tu perfil ha sido creado exitosamente.",
              status: "success",
              duration: 2000,
            });
            router.push('/inquilino-dashboard/buscador-propiedades');
          } 
          catch (error) {
            throw new Error(error.message);
          }
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Ocurrió un error al crear el perfil. Intenta de nuevo",
            duration: 4000,
            variant: 'destructive',
          });
        }
      });
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-spaceGrotesk mb-8 text-primary-500">
            Crea tu perfil
          </h1>

          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <nav className="space-y-1">
              {
              steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg",
                    currentStep === index && "bg-white shadow-sm",
                    currentStep > index && "text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2",
                    currentStep === index && "border-[#27317E] text-[#27317E]",
                    currentStep > index && "border-green-500 bg-green-500 text-white",
                    currentStep < index && "border-gray-300"
                  )}>
                    {currentStep > index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium font-spaceGrotesk">{step.name}</span>
                    <span className="text-sm text-muted-foreground font-inter">
                      {step.description}
                    </span>
                  </div>
                </div>
              ))}
            </nav>

            <Card className="p-6">
              {currentStep === 0 && (
                <PersonalInfoForm 
                  onNext={handleNext}
                  initialData={formData.personal}
                  userRole={userRole}
                />
              )}
              {currentStep === 1 && (
                userRole === 'Inquilino' ? (
                <EconomicInfoForm
                  onNext={handleNext}
                  onBack={handleBack}
                  initialData={formData.economic}
                />
                ) : (
                  <PreferencesForm
                    onNext={handleFinish}
                    onBack={handleBack}
                    initialData={formData.preferences}
                    userRole={userRole}
                  />
                )
              )}
              {currentStep === 2 && (
                <PreferencesForm
                  onNext={handleFinish}
                  onBack={handleBack}
                  initialData={formData.preferences}
                  userRole={userRole}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

