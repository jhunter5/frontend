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
            "question": "¿Cómo funciona el sistema de gestión de propiedades?",
            "answer": "Nuestro sistema permite gestionar todas sus propiedades desde una única plataforma. Podrá controlar contratos, pagos, mantenimientos y comunicaciones con inquilinos de manera centralizada y eficiente."
          },
          {
            "question": "¿Cómo se realizan los pagos en la plataforma?",
            "answer": "Utilizamos Mercado Pago como pasarela de pagos, lo que permite a propietarios e inquilinos realizar transacciones seguras con tarjetas de crédito/débito, transferencias bancarias y otros métodos digitales. Los pagos se registran automáticamente en la plataforma para un mejor control financiero."
          },
          {
            "question": "¿Cómo se seleccionan los inquilinos?",
            "answer": "Los propietarios pueden revisar los perfiles de los postulantes a sus propiedades, verificando su historial y referencias antes de aprobar una solicitud. Nuestro sistema facilita la evaluación de cada inquilino para garantizar relaciones de arrendamiento seguras."
          },
          {
            "question": "¿Puedo gestionar varias propiedades a la vez?",
            "answer": "Sí, nuestra plataforma está diseñada para administrar múltiples propiedades desde un solo lugar, permitiendo un control centralizado de pagos, contratos y mantenimiento."
          },
          {
            "question": "¿La plataforma cobra alguna comisión por los pagos?",
            "answer": "Sí, aplicamos una comisión del 5% sobre cada transacción procesada a través de la plataforma. Esta tarifa cubre los costos operativos y el uso de nuestra infraestructura digital."
          },
          {
            "question": "¿Cómo puedo contactar soporte en caso de problemas?",
            "answer": "Si necesita ayuda, puede comunicarse con nuestro equipo de soporte a través del apartado Contact Us en la plataforma o enviando un correo a limitless.holdings0@gmail.com. Estamos disponibles para resolver cualquier inquietud lo antes posible."
          }
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

