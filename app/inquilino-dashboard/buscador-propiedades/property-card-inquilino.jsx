import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Bed, LandPlot, MapPin, Bath } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price)
}

const propertyTypeColors = {
  casa: "bg-blue-100 text-blue-700",
  apartamento: "bg-green-100 text-green-700",
  oficina: "bg-purple-100 text-purple-700",
}

export function PropertyCard({ property }) {
  const imageUrl = property.media?.length > 0 ? property.media[0].mediaUrl : "https://via.placeholder.com/300"

  return (
    <Link href={`/inquilino-dashboard/buscador-propiedades/${property._id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={`Imagen de ${property.address || "propiedad"}`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <Badge
            className={`absolute top-3 left-3 ${propertyTypeColors[property.type] || "bg-gray-100 text-gray-700"}`}
          >
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-lg font-semibold text-white mb-1">{property.city || "Ubicación desconocida"}</h3>
            <div className="flex items-center gap-1 text-white/90">
              <MapPin className="h-3.5 w-3.5" />
              <p className="text-sm truncate">{property.address || "Dirección no disponible"}</p>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Precio mensual</p>
              <p className="text-lg font-semibold text-green-600">{formatPrice(property.rentPrice)}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 rounded-md bg-blue-50">
                <Bed className="h-4 w-4 text-blue-500" />
              </div>
              <span className="text-gray-600">{property.rooms !== undefined ? `${property.rooms} Hab` : "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 rounded-md bg-green-50">
                <Bath className="h-4 w-4 text-green-500" />
              </div>
              <span className="text-gray-600">
                {property.bathrooms !== undefined ? `${property.bathrooms} Baños` : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 rounded-md bg-purple-50">
                <LandPlot className="h-4 w-4 text-purple-500" />
              </div>
              <span className="text-gray-600">{property.squareMeters ? `${property.squareMeters}m²` : "N/A"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

