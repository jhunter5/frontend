'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TenantCard } from "@/app/arrendador-dashboard/inquilinos/components/inquilino-card"
import { Search, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from "@/app/utils/getAuth0id"

// Ejemplo de datos de inquilinos
// const tenants = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Sebastian",
//     lastName: "Ramirez",
//     email: "Sebas.Ramirez@email.com",
//     phone: "+57 300 123 4567",
//     rating: 4.5,
//     classification: "A+",
//     currentProperty: "Apartamento 301, Edificio Central",
//     monthlyRent: 2500000
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Laura",
//     lastName: "Rodriguez",
//     email: "laura.Rodriguez@example.com",
//     phone: "+57 300 765 4321",
//     rating: 4.2,
//     classification: "A",
//     currentProperty: "Casa 15, Urbanización Los Pinos",
//     monthlyRent: 1500000
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Carlos",
//     lastName: "Gomez",
//     email: "carlos.gomez@example.com",
//     phone: "+57 300 987 6543",
//     rating: 4.7,
//     classification: "A+",
//     currentProperty: "Apartamento 402, Edificio Norte",
//     monthlyRent: 2000000
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Ana",
//     lastName: "Martinez",
//     email: "ana.martinez@example.com",
//     phone: "+57 300 654 3210",
//     rating: 4.3,
//     classification: "B",
//     currentProperty: "Casa 22, Urbanización El Bosque",
//     monthlyRent: 1800000
//   },
//   {
//     id: 5,
//     image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Luis",
//     lastName: "Garcia",
//     email: "luis.garcia@example.com",
//     phone: "+57 310 123 4567",
//     rating: 4.0,
//     classification: "B+",
//     currentProperty: "Apartamento 105, Edificio Sol",
//     monthlyRent: 1400000
//   },
//   {
//     id: 6,
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Maria",
//     lastName: "Lopez",
//     email: "maria.lopez@example.com",
//     phone: "+57 320 456 7890",
//     rating: 4.8,
//     classification: "A+",
//     currentProperty: "Casa 8, Urbanización Las Palmas",
//     monthlyRent: 2200000
//   },
//   {
//     id: 7,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Andres",
//     lastName: "Ruiz",
//     email: "andres.ruiz@example.com",
//     phone: "+57 301 234 5678",
//     rating: 4.1,
//     classification: "A",
//     currentProperty: "Apartamento 202, Edificio Oasis",
//     monthlyRent: 1600000
//   },
//   {
//     id: 8,
//     image: "https://images.unsplash.com/photo-1511424187101-2aaa60069357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Carolina",
//     lastName: "Morales",
//     email: "carolina.morales@example.com",
//     phone: "+57 302 987 6543",
//     rating: 3.9,
//     classification: "B",
//     currentProperty: "Casa 18, Urbanización El Prado",
//     monthlyRent: 1300000
//   },
//   {
//     id: 9,
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Javier",
//     lastName: "Fernandez",
//     email: "javier.fernandez@example.com",
//     phone: "+57 303 876 5432",
//     rating: 4.6,
//     classification: "A+",
//     currentProperty: "Apartamento 401, Edificio Laguna",
//     monthlyRent: 2000000
//   },
//   {
//     id: 10,
//     image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Sofia",
//     lastName: "Castro",
//     email: "sofia.castro@example.com",
//     phone: "+57 304 765 4321",
//     rating: 4.4,
//     classification: "A",
//     currentProperty: "Casa 10, Urbanización El Lago",
//     monthlyRent: 1700000
//   },
//   {
//     id: 11,
//     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Diego",
//     lastName: "Ramirez",
//     email: "diego.mendez@example.com",
//     phone: "+57 305 654 3210",
//     rating: 4.3,
//     classification: "B+",
//     currentProperty: "Apartamento 303, Edificio Rivera",
//     monthlyRent: 1500000
//   },
//   {
//     id: 12,
//     image: "https://images.unsplash.com/photo-1520275126937-9506f7dd123c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Valeria",
//     lastName: "Ortiz",
//     email: "valeria.ortiz@example.com",
//     phone: "+57 306 543 2109",
//     rating: 4.9,
//     classification: "A+",
//     currentProperty: "Casa 12, Urbanización Altos del Sur",
//     monthlyRent: 2400000
//   }
// ];

const ITEMS_PER_PAGE = 6

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("name")
  const { user } = useAuth0()

  const fetchTenants = async () => {
    const userId = getAuth0Id(user.sub)
    const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/landlord/${userId}/tenants/active`)

    if (!response.ok) {
      throw new Error('Ocurrio un error consultando la base de datos')
    }

    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['tenants'],
    queryFn: fetchTenants
  })

  if (isPending) {
    return <div>Cargando...</div>;
  }
  
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const tenants = data.tenants || [];
  console.log(tenants)

  const filteredTenants = tenants.filter(tenant =>
    tenant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedTenants = [...filteredTenants].sort((a, b) => {
    if (sortBy === "name") {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    } else if (sortBy === "rating") {
      return b.avgRating - a.avgRating
    } else if (sortBy === "rent") {
      return b.monthlyRent - a.monthlyRent
    }
    return 0
  })

  // Calcular páginas
  const totalPages = Math.ceil(sortedTenants.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTenants = sortedTenants.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-5xl font-spaceGrotesk font-bold">Inquilinos</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar inquilino..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nombre</SelectItem>
            <SelectItem value="rating">Calificación</SelectItem>
            <SelectItem value="rent">Renta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20 ">
        {paginatedTenants.map((tenant) => (
          <TenantCard key={tenant.id} tenant={tenant} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedTenants.length)} de {sortedTenants.length} inquilinos
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className = "bg-[#1C2671] text-neutral-50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <div className="text-sm font-medium">
            Página {currentPage} de {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className = "bg-[#1C2671] text-neutral-50"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página siguiente</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

