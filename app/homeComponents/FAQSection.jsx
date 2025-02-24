"use client"

import { ChevronDown, HelpCircle } from "lucide-react"

export default function FAQSection() {
  return (
    <section className="py-16 min-h-screen bg--white">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="mb-6 p-3 rounded-full bg-primary-100/50 text-primary-500">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Preguntas Frecuentes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full mt-6" />
        </div>

        <div className="space-y-4">
          <style jsx>{`
            .faq-content {
              grid-template-rows: 0fr;
              transition: grid-template-rows 0.3s ease-in-out;
            }
            .faq-content.open {
              grid-template-rows: 1fr;
            }
            .faq-content > div {
              overflow: hidden;
            }
          `}</style>

          {[
            {
              question: "¿Cómo funciona el sistema de gestión de propiedades?",
              answer:
                "Nuestro sistema permite gestionar todas sus propiedades desde una única plataforma. Podrá controlar contratos, pagos, mantenimientos y comunicaciones con inquilinos de manera centralizada y eficiente.",
            },
            {
              question: "¿Qué métodos de pago aceptan?",
              answer:
                "Aceptamos múltiples métodos de pago incluyendo transferencias bancarias, tarjetas de crédito/débito y pagos digitales. Todos los pagos se procesan de manera segura y se registran automáticamente en el sistema.",
            },
            {
              question: "¿Cómo manejan el mantenimiento de las propiedades?",
              answer:
                "Contamos con un sistema de tickets para solicitudes de mantenimiento que permite reportar, dar seguimiento y resolver incidencias de manera eficiente. Trabajamos con una red de profesionales verificados para garantizar un servicio de calidad.",
            },
            {
              question: "¿Qué incluye el análisis de datos e IA?",
              answer:
                "Nuestra plataforma utiliza inteligencia artificial para analizar el mercado inmobiliario, optimizar precios de alquiler, predecir mantenimientos necesarios y proporcionar insights valiosos para la toma de decisiones.",
            },
            {
              question: "¿Cómo garantizan la seguridad de la información?",
              answer:
                "Implementamos las últimas medidas de seguridad, incluyendo encriptación de datos, autenticación de dos factores y backups regulares. Cumplimos con todas las normativas de protección de datos aplicables.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              <button
                className="w-full text-left px-8 py-6 flex justify-between items-center"
                onClick={(e) => {
                  const content = e.currentTarget.nextElementSibling
                  const icon = e.currentTarget.querySelector(".chevron")
                  content?.classList.toggle("open")
                  icon?.classList.toggle("rotate-180")
                }}
              >
                <span className="text-primary-600 font-medium">{item.question}</span>
                <div className="chevron w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center transition-transform duration-300">
                  <ChevronDown className="w-5 h-5 text-primary-500" />
                </div>
              </button>
              <div className="faq-content grid">
                <div>
                  <div className="px-8 py-6 border-t border-primary-100 text-primary-500">{item.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

