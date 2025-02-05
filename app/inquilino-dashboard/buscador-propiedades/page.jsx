"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchFilters } from "@/app/inquilino-dashboard/buscador-propiedades/search-filters";
import { PropertyCard } from "@/app/inquilino-dashboard/buscador-propiedades/property-card-inquilino";

const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
};

const fetchProperties = async () => {
  const response = await fetch("https://backend-khaki-three-90.vercel.app/api/property/available/no-filters");

  if (!response.ok) {
    throw new Error("Ocurrió un error al obtener las propiedades");
  }

  return response.json();
};

export default function Home() {
  const [filters, setFilters] = useState({
    city: null,
    type: null,
    rooms: null,
    rentPrice: [0, 5000000],
  });

  const { data: properties = [], isLoading, isError } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const resetFilters = () => {
    setFilters({
      city: null,
      type: null,
      rooms: null,
      rentPrice: [0, 5000000],
    });
  };

  const filteredProperties = properties.filter((property) => {
    if (!property) return false;

    const normalizedLocation = normalizeString(property.city || "");
    const normalizedSearchLocation = filters.city ? normalizeString(filters.city) : "";

    const matchesLocation =
      !filters.city || normalizedLocation.includes(normalizedSearchLocation);
    const matchesType = !filters.type || property.type === filters.type;
    const matchesRooms = !filters.rooms || property.rooms >= parseInt(filters.rooms, 10);
    const matchesPrice =
      !filters.rentPrice ||
      (property.rentPrice >= filters.rentPrice[0] && property.rentPrice <= filters.rentPrice[1]);

    return matchesLocation && matchesType && matchesRooms && matchesPrice;
  });

  if (isLoading) return <p className="text-center">Cargando propiedades...</p>;
  if (isError) return <p className="text-center text-red-500">Error al cargar las propiedades</p>;

  return (
    <main className="min-h-screen bg-gray-50">
      <SearchFilters filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => <PropertyCard key={property._id} property={property} />)
          ) : (
            <p className="text-center col-span-3">No se encontraron propiedades.</p>
          )}
        </div>
      </div>
    </main>
  );
}