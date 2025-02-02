import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, User } from 'lucide-react'

export function CandidateList({ candidates, requestSort, sortConfig, property }) {
  const getSortDirection = (key) => {
    if (!sortConfig) {
      return undefined
    }
    return sortConfig.key === key ? sortConfig.direction : undefined
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort('name')}>
              Nombre
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort('age')}>
              Edad
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort('industry')}>
              Industria
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort('status')}>
              Estado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => requestSort('rating')}>
              Calificación
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate) => (
          <TableRow key={candidate.id}>
            <TableCell>{candidate.name}</TableCell>
            <TableCell>{candidate.age}</TableCell>
            <TableCell>{candidate.industry}</TableCell>
            <TableCell>
              <Badge variant={candidate.status === "Preseleccionado" ? "default" : "secondary"}>
                {candidate.status}
              </Badge>
            </TableCell>
            <TableCell>{candidate.rating.toFixed(1)}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/arrendador-dashboard/candidatos/${candidate.id}?property=${property.id}`}>
                  <User className="mr-2 h-4 w-4" />
                  Ver perfil
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

