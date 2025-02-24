import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, User, Star } from "lucide-react"

export function CandidateList({ candidates, requestSort, sortConfig, property }) {
  const getSortDirection = (key) => {
    if (!sortConfig) return undefined
    return sortConfig.key === key ? sortConfig.direction : undefined
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-medium">
              <Button variant="ghost" onClick={() => requestSort("name")} className="hover:bg-slate-200">
                Nombre
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="font-medium">
              <Button variant="ghost" onClick={() => requestSort("age")} className="hover:bg-slate-200">
                Edad
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="font-medium">
              <Button variant="ghost" onClick={() => requestSort("industry")} className="hover:bg-slate-200">
                Industria
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="font-medium">
              <Button variant="ghost" onClick={() => requestSort("status")} className="hover:bg-slate-200">
                Estado
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="font-medium">
              <Button variant="ghost" onClick={() => requestSort("rating")} className="hover:bg-slate-200">
                Calificación
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="font-medium">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate?.tenant?._id} className="hover:bg-slate-50 transition-colors">
              <TableCell className="font-medium">
                {candidate?.tenant?.firstName + " " + candidate?.tenant?.lastName}
              </TableCell>
              <TableCell>{candidate?.tenant?.age}</TableCell>
              <TableCell>{candidate?.tenant?.industry}</TableCell>
              <TableCell>
                <Badge
                  variant={candidate.status === 1 ? "default" : "secondary"}
                  className={candidate.status === 1 ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}
                >
                  {candidate.status === 0 ? "Postulado" : "Preseleccionado"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>{candidate?.tenant?.avgRating?.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                >
                  <Link
                    href={`/arrendador-dashboard/candidatos/${candidate.id}?tenant=${candidate.tenant.authID}&property=${property?.property?._id}`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Ver perfil
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {candidates.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                No se encontraron candidatos que coincidan con los filtros aplicados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

