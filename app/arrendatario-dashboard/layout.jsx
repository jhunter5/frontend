'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, Users, UserCheck, BarChart3 } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import Navbar from "@/components/ui/navbar"

const sidebarNavItems = [
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
]

export default function DashboardLayout({ children, modal }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden border-r bg-[#1C2671] lg:block lg:w-64">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/arrendatario-dashboard/propiedades" className="flex items-center space-x-2">
                <img src="https://i.ibb.co/tbsXY21/Logo-Blanco.png" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>
            <ScrollArea className="flex-1 py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {sidebarNavItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={index}
                      asChild
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={cn(
                        "flex items-center justify-start gap-2 px-2 text-white hover:text-white",
                        pathname === item.href && "bg-white/10"
                      )}
                    >
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  )
                })}
              </nav>
            </ScrollArea>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4 p-4 md:p-8">
          {children}
          {modal}
        </div>
      </div>
    </div>
  )
}

