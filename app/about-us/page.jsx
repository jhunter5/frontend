import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"
import { RocketIcon, EyeIcon, Lightbulb, Shield, Target, Leaf, Users, Shuffle, LinkedinIcon, TwitterIcon, MailIcon, Building2 } from 'lucide-react'

const creators = [
    { 
      name: "Gabriela Guzman", 
      role: "Co-fundadora",
      image: "https://cdn.pixabay.com/photo/2023/07/30/00/12/cat-8157889_640.png",
      bio: "Ingeniera de software con experiencia en startups de proptech",
      linkedin: "#",
      twitter: "#",
      email: "gguzman@limitless.com"
    },
    { 
      name: "Carlos Muricia", 
      role: "Co-fundador",
      image: "/carlos_murcia.jpg",
      bio: "Ingeniero de software con experiencia en startups de proptech",
      linkedin: "https://www.linkedin.com/in/carlosmurcia72/",
      twitter: "#",
      email: "carlos@limitless.com"
    },
    { 
      name: "Juan Hunter", 
      role: "CEO & Co-fundador",
      image: "/juan_hunter.jpeg",
      bio: "Ingeniero de software con experiencia en startups de proptech",
      linkedin: "https://www.linkedin.com/in/juanhunter/",
      twitter: "#",
      email: "jhunter@limitless.com"
    },
    {
        name: "Eder Rodriguez",
        role: "CTO & Co-fundador",
        image: "/eder.jpg",
        bio: "Ingeniero de software con experiencia en startups de proptech",
        linkedin: "https://www.linkedin.com/in/eder-hern%C3%A1ndez-buelvas-09147b211/",
        twitter: "#",
        email: "ehernadez@limitless.com"
    }
  ]

  const stats = [
    { number: "500+", label: "Propiedades Gestionadas" },
    { number: "98%", label: "Satisfacción del Cliente" },
    { number: "15+", label: "Años de Experiencia" },
    { number: "50M€", label: "en Transacciones" },
  ]

export default function AboutUsPage() {
return (
    <div>
        <Navbar/>

        {/* Hero Section */}
        <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="/hero_about_us.jpg"
          alt="Modern skyscrapers"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.15"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Building2 className="w-16 h-16 text-white mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Nosotros
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            Transformando el futuro de la gestión inmobiliaria
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#27317E] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
      <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-[#27317E] flex items-center gap-2">
            <Users className="w-8 h-8" />
            Quiénes Somos
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4">
              Somos Limitless Holdings, una plataforma digital innovadora diseñada para revolucionar el sector inmobiliario. Nuestro propósito es simplificar y optimizar la gestión de propiedades de alquiler, conectando propietarios e inquilinos en un ecosistema integral.
              </p>
              <p className="text-lg text-gray-700">
              Nos caracterizamos por ofrecer herramientas y servicios que acompañan a nuestros usuarios en cada etapa del proceso de arrendamiento, promoviendo la autonomía, la transparencia y la eficiencia. Más que una solución tecnológica, somos un aliado estratégico que busca empoderar a nuestros clientes, brindándoles confianza y el control necesario para maximizar el potencial de sus inversiones.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/reunion.jpg"
                alt="Equipo LIMITLESS"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="transform hover:scale-105 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <RocketIcon className="w-8 h-8 text-[#27317E] mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[#27317E]">Nuestra Misión</h2>
                  <p className="text-gray-700">
                  Proveer servicios de acompañamiento integral en la búsqueda de soluciones inmobiliarias de arrendamiento permitiendo a los propietarios gestionar sus inmuebles e inquilinos de forma eficiente y autónoma, facilitando un entorno de colaboración, comprensión mutua y empoderamiento. A través de una plataforma web que se apoya en el compromiso, la integridad y el profesionalismo, buscamos transformar la experiencia de arrendamiento al ofrecer soluciones responsables y de alta calidad, asegurando la satisfacción de todas las partes involucradas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="transform hover:scale-105 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <EyeIcon className="w-8 h-8 text-[#27317E] mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-[#27317E]">Nuestra Visión</h2>
                  <p className="text-gray-700">
                  Para 2030, Limitless Holdings será la plataforma líder en Colombia en la gestión de arrendamientos, revolucionando la experiencia de propietarios e inquilinos mediante un enfoque que fomenta la colaboración, el entendimiento mutuo y la autonomía. Nos destacaremos por nuestra integridad, compromiso profesional y responsabilidad, creando valor tanto para propietarios como para inquilinos en todo el territorio nacional.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Perfiles de los Creadores */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-[#27317E]">Nuestro Equipo Fundador</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creators.map((creator) => (
              <Card key={creator.name} className="overflow-hidden group">
                <div className="relative">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-opacity duration-300" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{creator.name}</h3>
                  <p className="text-[#27317E] font-medium mb-2">{creator.role}</p>
                  <p className="text-gray-600 mb-4 text-sm">{creator.bio}</p>
                  <div className="flex gap-4">
                    <Link href={creator.linkedin} className="text-gray-600 hover:text-[#27317E] transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </Link>
                    <Link href={creator.twitter} className="text-gray-600 hover:text-[#27317E] transition-colors">
                      <TwitterIcon className="w-5 h-5" />
                    </Link>
                    <Link href={`mailto:${creator.email}`} className="text-gray-600 hover:text-[#27317E] transition-colors">
                      <MailIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Valores de la Empresa */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center text-[#27317E]">Nuestros Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Profesionalismo", description: "Somos un equipo que actúa pensando en la calidad del servicio que se ofrece y en el impacto del mismo en sus clientes.", icon: <Target /> },
              { title: "Independencia", description: "La autonomía de nuestros clientes es muy valiosa para nosotros, por eso ofrecemos una herramienta para liberar a los propietarios e inquilinos de los procesos dependientes.", icon: <Leaf /> },
              { title: "Colaboración", description: "Trabajamos en estrecha colaboración con nuestros clientes y socios para lograr objetivos comunes.", icon: <Users /> },
            ].map((value) => (
              <Card key={value.title} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="mb-4 text-[#27317E] ">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#27317E]">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 text-[#27317E]">¿Quieres formar parte de nuestra historia?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a nosotros en nuestra misión de transformar el sector inmobiliario con tecnología innovadora y servicios excepcionales.
          </p>
          <Button className="bg-[#27317E] hover:bg-[#1f2666]" asChild>
          <Link href="/contact-us">Contactanos</Link>
          </Button>
        </section>

      </div>
        
       <Footer/>
    </div>
)
}