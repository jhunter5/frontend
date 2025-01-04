'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Users, UserCheck, BarChart3, User, Settings, LogOut } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth0 } from "@auth0/auth0-react"

const sidebarNavItems = {
  administracion: [
    {
      title: "Mis propiedades",
      href: "/arrendatario-dashboard/propiedades",
      icon: Building2,
    },
    {
      title: "Inquilinos",
      href: "/dashboard/tenants",
      icon: Users,
    },
    {
      title: "Candidatos",
      href: "/dashboard/candidates",
      icon: UserCheck,
    },
    {
      title: "Estadísticas",
      href: "/dashboard/statistics",
      icon: BarChart3,
    },
  ],
  personal: [
    {
      title: "Mi Perfil",
      href: "/arrendatario-dashboard/perfil",
      icon: User
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
    }
  ]
} 

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const { logout, user } = useAuth0()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden border-r bg-[#1C2671] lg:block lg:w-64 lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center justify-center border-b px-4 w-full">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <img src="https://i.ibb.co/tbsXY21/Logo-Blanco.png" alt="Logo" className="h-8 w-full"/>
              </Link>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-4 py-4">
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
                <div className="px-3 py-2">
                  <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3 w-full">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={user.picture} alt="Usuario" />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 max-w-20">
                      <span className="text-xs font-medium font-inter text-white truncate">{user.name}</span>
                      <span className="text-xs font-inter text-white/70 truncate">{user.address}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-2 flex w-full items-center justify-start gap-2 px-2 text-white hover:text-white hover:bg-white/10 font-inter"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4 p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

