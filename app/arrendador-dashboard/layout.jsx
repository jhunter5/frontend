'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Users, UserCheck, BarChart3, User, LogOut, Menu, CalendarDays, Banknote} from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "@tanstack/react-query"
import { getAuth0Id } from "../utils/getAuth0id"
import { title } from "process"

const sidebarNavItems = {
  administracion: [
    {
      title: "Mis propiedades",
      href: "/arrendador-dashboard/propiedades",
      icon: Building2,
    },
    {
      title: "Inquilinos",
      href: "/arrendador-dashboard/inquilinos",
      icon: Users,
    },
    {
      title: "Candidaturas",
      href: "/arrendador-dashboard/propiedades-busqueda",
      icon: UserCheck,
    },
    {
      title: "Calendario",
      href: "/arrendador-dashboard/calendario",
      icon: CalendarDays,
    }
  ],
  personal: [
    {
      title: "Mi Perfil",
      href: "/arrendador-dashboard/perfil",
      icon: User
    },
    {
      title: "Pagar suscripción",
      href: "/arrendador-dashboard/pago-suscripcion",
      icon: Banknote
    }
  ]
} 


export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const { logout, user } = useAuth0()
  const [open, setOpen] = useState(false)

  const fecthUser = async () => {
    const userId = getAuth0Id(user.sub);
    const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/landlord/${userId}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

  const { isPending, isError, data, error } = useQuery( {
    queryKey: ['user'],
    queryFn: fecthUser
  } )

  const SidebarContent = () => (
    <ScrollArea className="flex-1 h-full">
      <div className="space-y-4 py-4 flex flex-col justify-end h-full">
        {/* Sección de Administración */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold font-spaceGrotesk tracking-tight text-white">
            Administración
          </h2>
          <nav className="grid items-start gap-2 text-sm font-medium">
            {sidebarNavItems.administracion.map((item, index) => {
              const Icon = item.icon
              return (
                <Button
                  key={index}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "flex items-center justify-start gap-2 px-2 text-white hover:text-white w-full",
                    pathname === item.href && "bg-white/10"
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    <p className="font-inter">{item.title}</p>
                  </Link>
                </Button>
              )
            })}
          </nav>
        </div>

      <Separator className="mx-3 bg-white/20" />

      {/* Sección Personal */}
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold font-spaceGrotesk tracking-tight text-white">
          Personal
        </h2>
        <nav className="grid items-start gap-2 text-sm font-medium">
          {sidebarNavItems.personal.map((item, index) => {
            const Icon = item.icon
            return (
              <Button
                key={index}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "flex items-center justify-start gap-2 px-2 text-white hover:text-white w-full",
                  pathname === item.href && "bg-white/10"
                )}
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  <p className="font-inter">{item.title}</p>
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>

      <Separator className="mx-3 bg-white/20" />

      {/* Sección de Usuario */}
      <div className="px-3 py-2 flex flex-col justify-end h-auto border-t border-white/10"> 
        <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3 w-full">
        <Avatar className="h-10 w-10 shrink-0">
          {isPending ? (
          
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>

          ) : (
          <AvatarImage src={data.avatar} alt="Usuario" />
          )}
        </Avatar>
        <div className="flex flex-col min-w-0 max-w-20">
          {isPending ? (
          <span className="text-xs font-medium font-inter text-white truncate">Cargando..</span>
          ) 
          : (
          <>
            <span className="text-xs font-medium font-inter text-white truncate">{data.firstName + " " + data.lastName}</span>
            <span className="text-xs font-medium font-inter text-muted-foreground truncate">{data.email}</span>
          </>
          )
          }
          
        </div>
        </div>
        <Button
        variant="ghost"
        className="mt-2 flex w-full items-center justify-start gap-2 px-2 text-white hover:text-white hover:bg-white/10 font-inter"
        onClick={ () =>
          logout({
            logoutParams: {
              returnTo: process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/'
              : 'https://www.limitlessholdings.site/',
            }
          })
        }
        >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
        </Button>
      </div>
    </div>
  </ScrollArea>
)

  return (
    <div className="flex flex-col min-h-screen">
      {/*Navbar para pantallas peque;as */}
      <div className="lg:hidden sticky top-0 z-40 w-full bg-[#1C2671] text-white"> 
        <div className="flex h-16 items-center px-4">
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#1C2671] p-0 border-r-0">
              <div className="flex h-16 items-center px-6 border-b border-white/10">
                <Link href="/dashboard" className="flex items-center" onClick={() => setOpen(false)}>
                  <img src="https://i.ibb.co/tbsXY21/Logo-Blanco.png" alt="Logo" className="h-8 w-auto" />
                </Link>
              </div>
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex-1">
            <Link href="/dashboard" className="flex items-center justify-center">
              <img src="https://i.ibb.co/tbsXY21/Logo-Blanco.png" alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>
        </div>
      </div>


      <div className="flex flex-1">
        {/* Sidebar pantallas grandes*/}
        <div className="hidden border-r bg-[#1C2671] lg:block lg:w-64 lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-center border-b px-4 w-full border-white/10 px-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <img src="https://i.ibb.co/tbsXY21/Logo-Blanco.png" alt="Logo" className="h-8 w-full"/>
              </Link>
            </div>
            <SidebarContent />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

