import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin, DollarSign, Star, ExternalLink, User } from 'lucide-react'
import Link from "next/link"

export function PropertyDetails({ property, className }) {
  // Limitar a un máximo de 3 candidatos
  const displayedCandidates = property.lista_candidatos.slice(0, 3)

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle className="font-spaceGrotesk font-bold">Resumen de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{property.direccion}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">${property.precio} /mes</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-inter">{property.habitaciones}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-inter">{property.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-inter">{property.area_propiedad} m²</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle className="font-spaceGrotesk font-bold">Imagen de la Propiedad</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={property.media}  
              alt={`Imagen de ${property.direccion}`}
              className="w-full h-48 object-cover rounded-md"
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CardTitle className="font-spaceGrotesk font-bold">Candidatos</CardTitle>
          <span className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Mostrando {displayedCandidates.length} de {property.lista_candidatos.length} candidatos
          </span>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {displayedCandidates.map((candidate) => (
              <li key={candidate._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={candidate.tenantInfo.firstName} />
                    <AvatarFallback>{candidate.tenantInfo.firstName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium font-inter">{candidate.tenantInfo.firstName}</span>
                </div>
                <div className="flex items-center space-x-4 font-inter">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{candidate.tenantInfo.avgRating}</span>
                  </Badge>
                  <Button variant="outline" size="sm" asChild className="text-primary-400 font-inter">
                    <Link href={`candidatos/${candidate._id}?tenant=${candidate.tenantInfo.id}&property=${property._id}`}>
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
        <Button asChild className='bg-primary-400'>
          <Link href={`/arrendador-dashboard/propiedades-busqueda/${property._id}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver Lista Completa de Candidatos
          </Link>
        </Button>
      </div>
    </div>
  )
}

