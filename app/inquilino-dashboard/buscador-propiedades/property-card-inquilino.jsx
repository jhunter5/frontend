import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bed, LandPlot, MapPin, DollarSign, Car } from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

export function PropertyCard({ property }) {
  // Obtener la primera imagen de la propiedad o usar un placeholder
  const imageUrl =
    property.media?.length > 0
      ? property.media[0].mediaUrl
      : "https://via.placeholder.com/300";

  return (
    <Link href={`/inquilino-dashboard/buscador-propiedades/${property._id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={imageUrl}
            alt={`Imagen de ${property.address || "propiedad"}`}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold font-spaceGrotesk">
              {property.city || "Ubicación desconocida"}
            </h3>
            <p className="text-lg font-semibold font-inter text-green-500">
              {formatPrice(property.rentPrice)}/mes
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <p className="truncate font-inter">{property.address || "Dirección no disponible"}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-inter truncate">
                {property.rooms !== undefined ? `${property.rooms} Hab` : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <LandPlot className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-inter truncate">
                {property.squareMeters ? `${property.squareMeters}M²` : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-inter truncate">
                {property.parking !== undefined ? `${property.parking} Parqueaderos` : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
