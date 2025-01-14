import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin, DollarSign, Star, ExternalLink, User } from 'lucide-react'
import Link from "next/link"

export function PropertyDetails({ property, className }) {
  // Limitar a un máximo de 3 candidatos
  const displayedCandidates = property.candidates.slice(0, 3)

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>Resumen de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">${property.price}/mes</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.area} m²</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>Imagen de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={property.image}
              alt={`Imagen de ${property.address}`}
              className="w-full h-48 object-cover rounded-md"
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CardTitle>Candidatos</CardTitle>
          <span className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Mostrando {displayedCandidates.length} de {property.candidates.length} candidatos
          </span>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {displayedCandidates.map((candidate) => (
              <li key={candidate.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{candidate.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{candidate.rating}</span>
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/tenants/${candidate.id}`}>
                      <User className="h-4 w-4 mr-2" />
                      Ver Perfil
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/arrendador-dashboard/propiedades-busqueda/${property.id}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver Lista Completa de Candidatos
          </Link>
        </Button>
      </div>
    </div>
  )
}

