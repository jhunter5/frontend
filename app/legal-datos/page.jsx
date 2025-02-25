"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronUp, Download, Printer } from "lucide-react"
import { useState, useEffect } from "react"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function PrivacyPolicy() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const definiciones = [
    {
      title: "Autorización",
      description:
        "Consentimiento previo, expreso e informado del Titular para llevar a cabo el tratamiento de datos personales.",
    },
    {
      title: "Aviso de privacidad",
      description:
        "Comunicación verbal o escrita dirigida a los Titulares de los datos personales que están siendo tratados por la empresa, en la cual se le informa acerca de la existencia de las políticas de tratamiento de datos personales que le serán aplicadas, la forma de acceder a las mismas, y las finalidades para las cuales serán usados sus datos personales.",
    },
    {
      title: "Base de datos personales",
      description:
        "Conjunto organizado de datos personales que son objeto de tratamiento por una persona natural o jurídica.",
    },
    {
      title: "Custodio de las bases de datos",
      description:
        "Persona natural, dentro de la empresa, que custodia las bases de datos personales.",
    },
    {
      title: "Dato personal",
      description:
        "Cualquier información concerniente o vinculada a personas naturales determinadas o determinables.",
    },
    {
      title: "Dato sensible",
      description:
        "Es aquel dato personal que afecta la intimidad del Titular y cuyo uso incorrecto podría generar discriminación. Son considerados datos sensibles, entre otros, los datos de salud, los datos de orientación sexual, origen racial y étnico, opiniones políticas, convicciones religiosas, filosóficas o morales.",
    },
    {
      title: "Dato privado",
      description:
        "Es aquel dato personal que por su carácter íntimo o reservado es relevante para el Titular.",
    },
    {
      title: "Dato semiprivado",
      description:
        "Es aquel dato personal conocido y de interés tanto para el titular como para un determinado sector de personas o para la sociedad en general, por lo que no es de carácter íntimo, reservado o público.",
    },
    {
      title: "Dato público",
      description:
        "Es aquel dato personal calificado como tal según la Constitución y la ley, y que no se ha clasificado como dato personal privado o semiprivado.",
    },
    {
      title: "Encargado del tratamiento",
      description:
        "Persona natural o jurídica, de carácter público o privado, que por sí misma o en asocio con otros, realiza el tratamiento de datos personales por cuenta del responsable.",
    },
    {
      title: "Formas de recabar los datos personales",
      description:
        "LIMITLESS HOLDINGS podrá conocer, recolectar, almacenar y administrar la información del titular de conformidad con la política de uso de datos contenida en el presente documento, a través de los siguientes medios:",
      list: [
        "Registro y uso de la plataforma web o móvil de LIMITLESS HOLDINGS.",
        "Registro para la gestión de propiedades o búsqueda de propiedades en LIMITLESS HOLDINGS.",
        "Suscripción de cualquier tipo de contrato, alianza y/o convenio con LIMITLESS HOLDINGS.",
        "Registro como proveedor de LIMITLESS HOLDINGS.",
      ],
    },
    {
      title: "Habeas data",
      description:
        "Es el derecho que tiene el Titular de los datos personales de exigir de las administradoras de los mismos el acceso, inclusión, exclusión, corrección, adición, actualización y rectificación de los datos, así como la limitación en su divulgación, publicación o cesión.",
    },
    {
      title: "Responsable del tratamiento",
      description:
        "Persona natural o jurídica de carácter público o privado que por sí misma o en asocio con otro u otros decide sobre el tratamiento de datos personales.",
    },
  ];

  const principles = [
    {
      title: "Principio de legalidad en el tratamiento de datos personales",
      description:
        "El tratamiento de datos personales a que se refiere la Ley Estatutaria 1581 de 2012 es una actividad reglada que debe sujetarse a lo establecido en ella y en las demás disposiciones que la desarrollen.",
    },
    {
      title: "Principio de finalidad",
      description:
        "El tratamiento de los datos personales debe obedecer a una finalidad legítima de acuerdo con la Constitución y la ley, la cual debe ser informada al Titular.",
    },
    {
      title: "Principio de libertad",
      description:
        "El tratamiento de los datos personales sólo puede ejercerse con el consentimiento previo, expreso e informado del Titular. Los datos personales no podrán ser obtenidos o divulgados sin previa autorización, o en ausencia de mandato legal o judicial que releve el consentimiento.",
    },
    {
      title: "Principio de veracidad o calidad",
      description:
        "La información sujeta a tratamiento debe ser veraz, completa, exacta, actualizada, comprobable y comprensible. Se prohíbe el tratamiento de datos parciales, incompletos, fraccionados o que induzcan a error.",
    },
    {
      title: "Principio de transparencia",
      description:
        "En el tratamiento de los datos personales debe garantizarse el derecho del Titular a obtener del Responsable del tratamiento o del Encargado del tratamiento, en cualquier momento y sin restricciones, información acerca de la existencia de datos que le conciernan.",
    },
    {
      title: "Principio de seguridad",
      description:
        "La información sujeta a tratamiento por el Responsable del Tratamiento o Encargado del tratamiento a que se refiere la Ley Estatutaria 1581 de 2012, se deberá manejar con las medidas técnicas, humanas y administrativas que sean necesarias para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.",
    },
    {
      title: "Principio de confidencialidad",
      description:
        "Todas las personas que intervengan en el tratamiento de datos personales que no tengan la naturaleza de públicos están obligadas a garantizar la reserva de la información, inclusive después de finalizada su relación con alguna de las labores que comprende el tratamiento, pudiendo sólo realizar suministro o comunicación de datos personales cuando ello corresponda al desarrollo de las actividades autorizadas en la Ley Estatutaria 1581 de 2012 y en los términos de la misma.",
    },
    {
      title: "Principio de acceso y circulación restringida",
      description:
        "El tratamiento se sujeta a los límites que se derivan de la naturaleza de los datos personales, de las disposiciones de la Ley Estatutaria 1581 de 2012 y la Constitución. En este sentido, el tratamiento sólo podrá hacerse por personas autorizadas por el Titular y/o por las personas previstas en la mencionada ley.",
    },
  ];

  const rights = [
    {
      title: "Derecho de acceso",
      description:
        "Derecho al acceso a su información personal objeto de tratamiento.",
    },
    {
      title: "Derecho de actualización",
      description:
        "Derecho a la actualización de los datos personales objeto de tratamiento.",
    },
    {
      title: "Derecho de rectificación",
      description:
        "Derecho a la rectificación de los datos personales objeto de tratamiento.",
    },
    {
      title: "Derecho de oposición",
      description:
        "Derecho de oposición a que los datos personales sean objeto de tratamiento.",
    },
    {
      title: "Derecho de supresión",
      description:
        "Derecho a solicitar la supresión de los datos personales cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.",
    },
    {
      title: "Derecho a solicitar prueba de autorización",
      description:
        "Derecho a solicitar prueba de la autorización otorgada para el tratamiento.",
    },
    {
      title: "Derecho a revocar el consentimiento",
      description:
        "Derecho a revocar el consentimiento para el tratamiento de los datos personales.",
    },
    {
      title: "Derecho a presentar quejas y reclamos",
      description:
        "Derecho a presentar quejas y reclamos ante la Superintendencia de Industria y Comercio por infracciones a lo dispuesto en la Ley Estatutaria 1581 de 2012 y las demás normas que la modifiquen, adicionen o complementen.",
    },
    {
      title: "Derecho a ser informado",
      description:
        "Derecho a ser informado por parte del Responsable y/o Encargado del uso y tratamiento que se les dará a los datos personales, así como de las modificaciones y actualizaciones de las políticas de protección, medidas de seguridad y finalidades.",
    },
  ];

  const methods = [
    {
      title: "Registro y uso de la plataforma",
      description:
        "Los datos personales podrán ser recolectados cuando los titulares se registren en la plataforma web o móvil, completando los formularios de inscripción, ingresando información para la creación de perfiles, y utilizando las funcionalidades habilitadas en la aplicación o página web.",
    },
    {
      title: "Gestión de propiedades o búsqueda de propiedades",
      description:
        "Al registrar propiedades para su gestión o al buscar propiedades disponibles, los titulares deberán proporcionar datos relevantes relacionados con su identidad y las características de los inmuebles, los cuales serán utilizados para facilitar las operaciones y el correcto funcionamiento de la plataforma.",
    },
    {
      title: "Suscripción de contratos, alianzas o convenios",
      description:
        "Cuando los titulares celebren cualquier tipo de contrato, alianza o convenio con LIMITLESS HOLDINGS, ya sea de naturaleza comercial, de prestación de servicios o cualquier otra, se recopilarán los datos personales necesarios para formalizar dichas relaciones y darles cumplimiento.",
    },
    {
      title: "Registro como proveedor",
      description:
        "En caso de que una persona natural desee registrarse como proveedor de servicios o productos para LIMITLESS HOLDINGS, se recopilará información relacionada con su identidad, experiencia y capacidades, entre otros datos pertinentes para la vinculación y evaluación.",
    },
    {
      title: "Interacciones en canales de atención",
      description:
        "Los datos también podrán ser recolectados a través de solicitudes, consultas o reclamaciones realizadas mediante los canales de atención habilitados por LIMITLESS HOLDINGS, como líneas telefónicas, correos electrónicos, formularios de contacto, y chats en la plataforma.",
    },
  ];

  const purposes = [
    {
      title: "Finalidades del Tratamiento para Arrendatarios",
      details: [
        {
          subtitle: "Creación de Perfil del Arrendatario",
          description:
            "Recolectar datos como información de contacto, historial financiero, ingresos y referencias para construir un perfil confiable. Evaluar la idoneidad del arrendatario mediante algoritmos que analicen estabilidad financiera, comportamiento en pagos anteriores y referencias de otros arrendadores. Proveer al propietario una puntuación o clasificación basada en criterios objetivos."
        },
        {
          subtitle: "Gestión de Relaciones Contractuales",
          description:
            "Registrar y administrar contratos de arrendamiento, incluyendo renovaciones, términos y condiciones. Mantener un historial de interacciones relacionadas con el inmueble, como solicitudes de mantenimiento o reportes de incidencias."
        },
        {
          subtitle: "Optimización del Proceso de Postulación",
          description:
            "Permitir al arrendatario postularse a propiedades disponibles según sus preferencias y capacidades. Proporcionar actualizaciones sobre el estado de la postulación, incluyendo notificaciones sobre aceptación o rechazo."
        },
        {
          subtitle: "Notificaciones y Comunicaciones",
          description:
            "Enviar recordatorios sobre fechas clave, como pagos, vencimientos contractuales o renovaciones. Facilitar la comunicación directa y segura entre el arrendatario y el propietario."
        },
        {
          subtitle: "Análisis y Reportes",
          description:
            "Producir reportes financieros personalizados que detallen pagos realizados y saldos pendientes. Utilizar datos agregados para ofrecer recomendaciones de propiedades y servicios adicionales."
        }
      ]
    },
    {
      title: "Finalidades del Tratamiento para Propietarios",
      details: [
        {
          subtitle: "Creación de Perfiles de Inquilinos",
          description:
            "Generar perfiles detallados de los candidatos con base en datos verificados, como antecedentes de arrendamiento, referencias y solvencia económica. Facilitar un sistema de selección automatizado que destaque a los mejores candidatos según métricas personalizables."
        },
        {
          subtitle: "Gestión de Propiedades",
          description:
            "Administrar el estado de los inmuebles, incluyendo disponibilidad, contratos activos y renovaciones. Almacenar documentación relevante, como contratos firmados, documentos de identificación y facturas."
        },
        {
          subtitle: "Optimización de la Gestión Financiera",
          description:
            "Automatizar el cobro de arrendamientos y emitir comprobantes de pago. Generar reportes periódicos sobre ingresos, gastos asociados y estados financieros del portafolio de propiedades."
        },
        {
          subtitle: "Notificaciones Personalizadas",
          description:
            "Informar sobre solicitudes pendientes, vencimientos de pagos de inquilinos y estado de reparaciones en las propiedades. Enviar alertas sobre nuevas postulaciones y permitir la revisión rápida de candidatos."
        },
        {
          subtitle: "Análisis Predictivo",
          description:
            "Ofrecer proyecciones basadas en patrones históricos para maximizar el rendimiento de las propiedades. Recomendar ajustes de precios de arriendo basados en tendencias del mercado y la demanda local."
        }
      ]
    }
  ];

  return (
    <div>
        <Navbar />
    
    <div className="container mx-auto py-8 px-4">
      {/* Encabezado */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Protección de datos Limitless Holdings</h1>
          <div className="flex justify-center gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2 bg-primary-400 text-slate-50">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </div>

        {/* Índice */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Índice</h2>
          <nav className="space-y-2">
            <a href="#introduccion" className="block text-primary hover:underline">
              I. Introducción
            </a>
            <a href="#definiciones" className="block text-primary hover:underline">
              II. Definiciones
            </a>
            <a href="#principios" className="block text-primary hover:underline">
              III. Principios Rectores
            </a>
            <a href="#derechos" className="block text-primary hover:underline">
              IV. Derechos de los Titulares
            </a>
            <a href="#forma-recoleccion" className="block text-primary hover:underline">
              V. Forma de Recolectar los Datos
            </a>
            <a href="#finalidades" className="block text-primary hover:underline">
              VI. Finalidades del Tratamiento
            </a>
            <a href="#autorizacion" className="block text-primary hover:underline">
              VII. Autorización y Consentimiento
            </a>
            <a href="#canales" className="block text-primary hover:underline">
              VIII. Canales de Acceso
            </a>
            <a href="#procedimiento" className="block text-primary hover:underline">
              IX. Procedimiento Legal
            </a>
            <a href="#menores" className="block text-primary hover:underline">
              X. Tratamiento de Datos de Menores
            </a>
            <a href="#vigencia" className="block text-primary hover:underline">
              XI. Vigencia
            </a>
          </nav>
        </Card>

        {/* Contenido */}
        <div className="prose max-w-none">
          <section id="introduccion">
            <h2 className="text-2xl font-bold mb-4">I. INTRODUCCIÓN</h2>
            <p className="mb-4">
              LIMITLESS HOLDINGS, con el objetivo de dar cumplimiento estricto a la normatividad vigente de protección
              de Datos Personales, de acuerdo a lo establecido en la Ley 1581 de 2012, Decreto 1074 de 2015 y demás
              disposiciones que las modifiquen, adicionen o complementen, presenta la siguiente POLÍTICA DE PROTECCIÓN Y
              TRATAMIENTO DE DATOS PERSONALES (en adelante "Política de Tratamiento") con el propósito de proteger la
              información personal brindada por los Titulares que tengan relación con LIMITLESS HOLDINGS.
            </p>
            <p className="mb-4">
                La Política de Tratamiento tiene como objeto proteger el derecho constitucional del 
                Habeas Data, que garantiza a todas las personas la facultad de conocer, actualizar y 
                rectificar la información que se haya recogido y almacenado en las distintas bases 
                de datos de LIMITLESS HOLDINGS. En cumplimiento de dicho derecho, 
                LIMITLESS HOLDINGS recolecta y da Tratamiento a Datos Personales únicamente 
                cuando ha sido autorizado previamente por su Titular, implementando medidas 
                claras sobre la confidencialidad y privacidad de los Datos Personales. Asimismo, 
                detalla los lineamientos generales corporativos que se tienen en cuenta para 
                proteger los Datos Personales de los Titulares, las finalidades del Tratamiento de la 
                información, el área responsable de atender quejas y reclamos, y los procedimientos 
                que deben seguirse para conocer, actualizar, rectificar y suprimir la información, 
                junto con los canales habilitados para ejercer dichos derechos.
            </p>
          </section>

          <Separator className="my-8" />

          <section id="definiciones">
            <h2 className="text-2xl font-bold mb-4">II. DEFINICIONES</h2>
            <div className="space-y-4">
                {definiciones.map((item, index) => (
                    <div key={index}>
                    <h3 className="font-semibold">{item.title}:</h3>
                    <p>{item.description}</p>
                    {item.list && (
                        <ul className="list-disc ml-5">
                        {item.list.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                        </ul>
                    )}
                    </div>
                ))}
            </div>
          </section>

          <Separator className="my-8" />

          <section id="principios">
            <h2 className="text-2xl font-bold mb-4">III. PRINCIPIOS RECTORES</h2>
            <p>Según lo establecido en el Título II de la Ley Estatutaria 1581 de 2012, la protección 
            de datos personales se regirá por la aplicación armónica e integral de los siguientes 
            principios:</p>
          </section>

          <div className="space-y-4">
            {principles.map((principle, index) => (
                <div key={index}>
                <h3 className="font-semibold">{principle.title}:</h3>
                <p>{principle.description}</p>
                </div>
            ))}
          </div>

          <Separator className="my-8" />
          <section id="derechos">
            <h2 className="text-2xl font-bold mb-4">IV.
              DERECHOS DE LOS TITULARES
            </h2>
            <p>
            En cumplimiento de las garantías fundamentales consagradas en la Constitución y la ley, y sin perjuicio de lo dispuesto en las demás normas que regulen la materia, los Titulares de los datos personales podrán ejercer de forma gratuita e ilimitadamente los siguientes derechos:
            </p>
            <div className="space-y-4">
            {rights.map((right, index) => (
                <div key={index}>
                <h3 className="font-semibold">{right.title}:</h3>
                <p>{right.description}</p>
                </div>
            ))}
            </div>

          </section>

          <Separator className="my-8" />
          <section id="forma-recoleccion">
            <h2 className="text-2xl font-bold mb-4">V.
                FORMA DE RECOLECTAR LOS DATOS
            </h2>
            <p>
            <b>LIMITLESS HOLDINGS</b> podrá conocer, recolectar, almacenar y administrar la información del titular de conformidad con la política de uso de datos contenida en el presente documento, a través de los siguientes medios:
            </p>
            <div className="space-y-4">
                {methods.map((method, index) => (
                    <div key={index}>
                    <h3 className="font-semibold">{method.title}:</h3>
                    <p>{method.description}</p>
                    </div>
                ))}
             </div>
            <p>
            Estas acciones se realizan con el propósito de garantizar el acceso a los servicios ofrecidos por la plataforma y facilitar las relaciones con los distintos actores involucrados, siempre bajo estrictas medidas de confidencialidad y seguridad de los datos personales.
            </p>

          </section>

          <Separator className="my-8" />

          <section id="finalidades">
            <h2 className="text-2xl font-bold mb-4">VI. FINALIDAD DEL TRATAMIENTO DE LOS DATOS</h2>
            <p>
              Para cualquier duda o aclaración sobre la presente Política de Tratamiento de Datos Personales
            </p>
            <div className="space-y-6">
                {purposes.map((section, index) => (
                    <div key={index}>
                    <h2 className="text-xl font-bold">{section.title}</h2>
                    <div className="space-y-4">
                        {section.details.map((item, subIndex) => (
                        <div key={subIndex}>
                            <h3 className="text-lg font-semibold">{item.subtitle}</h3>
                            <p>{item.description}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
            </div>

          </section>

          <Separator className="my-8" />

          <section id="Autorizacion">
            <h2 className="text-2xl font-bold mb-4">VII. AUTORIZACIÓN Y CONSENTIMIENTO DEL TITULAR
            </h2>
            <p>
             El consentimiento y autorización por parte del Titular de la información es un requisito constitucional y legal que deben cumplir las personas responsables del tratamiento de datos personales. El consentimiento debe cumplir con los siguientes presupuestos:
            </p>
            
            <p>
                <b>Previo:</b> La autorización la debe dar el Titular de información de manera previa a cualquier tipo de Tratamiento de datos personales.
            </p>

            <p>
                <b>Expreso:</b> La autorización debe otorgarse de forma inequívoca, clara y específica.

            </p>

            <p>
                <b>Informado:</b> El Titular debe comprender claramente para qué serán tratados sus datos personales y las finalidades que pueden derivarse del Tratamiento de los mismos.

            </p>
            <p>
            Todos los usuarios de las plataformas de <b>LIMITLESS HOLDINGS</b>, ya sea la aplicación móvil o la página web, deben registrarse y autorizar el tratamiento de sus datos personales para poder hacer uso de los servicios ofrecidos. En cada sistema se incluye una casilla identificada como “Política de Privacidad y Tratamiento de Datos Personales”, la cual debe ser leída y aceptada antes de proceder con el uso de los servicios de <b>LIMITLESS HOLDINGS</b>

            </p>

          </section>


          <Separator className="my-8" />

          <section id="vigencia">
            <h2 className="text-2xl font-bold mb-4">XI. VIGENCIA</h2>
            <p className="mb-4">
              Los Datos Personales que sean almacenados, utilizados o transmitidos permanecerán en las bases de datos de
              LIMITLESS HOLDINGS durante el tiempo que sea necesario para cumplir con las finalidades expuestas en este
              manual o para que la Empresa pueda cumplir con sus deberes legales.
            </p>
            <p className="mb-4">
              Sin embargo, la información será revisada cada año para verificar la veracidad del dato y finalidad de
              seguir con su tratamiento.
            </p>
            <p>
              De ser necesario LIMITLESS HOLDINGS se reserva el derecho a modificar la presente Política de forma
              unilateral.
            </p>
          </section>

        </div>
      </div>

      {/* Botón para volver arriba */}
      {showScrollTop && (
        <Button className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 bg-primary-400" onClick={scrollToTop}>
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
    <Footer />
    </div>
  )
}

