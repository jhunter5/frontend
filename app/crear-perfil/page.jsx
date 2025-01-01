'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PersonalInfoForm } from './personal-info'
import EconomicInfoForm from './economic-info'
import { PreferencesForm } from './preferences'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'

const steps = [
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
    description: 'Preferencias de vivienda',
  },
]

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personal: {},
    economic: {},
    preferences: {},
  })

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

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-6"
          >
            ← Volver al dashboard
          </Button>

          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            {/* Steps sidebar */}
            <nav className="space-y-1">
              {steps.map((step, index) => (
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
                    <span className="font-medium">{step.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {step.description}
                    </span>
                  </div>
                </div>
              ))}
            </nav>

            {/* Form content */}
            <Card className="p-6">
              {currentStep === 0 && (
                <PersonalInfoForm 
                  onNext={handleNext}
                  initialData={formData.personal}
                />
              )}
              {currentStep === 1 && (
                <EconomicInfoForm
                  onNext={handleNext}
                  onBack={handleBack}
                  initialData={formData.economic}
                />
              )}
              {currentStep === 2 && (
                <PreferencesForm
                  onNext={handleNext}
                  onBack={handleBack}
                  initialData={formData.preferences}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>  
  )
}

