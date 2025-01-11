import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin, DollarSign, Star, ExternalLink, User } from 'lucide-react'
import Link from "next/link"

export function PropertyDetails({ property }) {
  // Limitar a un máximo de 3 candidatos
  const displayedCandidates = property.candidates.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumen de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{property.address}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>{property.bedrooms} Habitaciones</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>{property.bathrooms} Baños</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Square className="h-4 w-4 text-muted-foreground" />
              <span>{property.area} m²</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-semibold">${property.price}/mes</span>
            </div>
          </CardContent>
        </Card>
        <Card>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Candidatos</CardTitle>
          <span className="text-sm text-muted-foreground">
            Mostrando {displayedCandidates.length} de {property.candidates.length} candidatos
          </span>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {displayedCandidates.map((candidate) => (
              <li key={candidate.id} className="flex items-center justify-between">
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
          <Link href={`/dashboard/properties/${property.id}/full-details`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver Detalles Completos
          </Link>
        </Button>
      </div>
    </div>
  )
}

