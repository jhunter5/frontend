"use client";

import { useState } from "react";
import { SearchFilters } from "@/app/inquilino-dashboard/buscador-propiedades/search-filters";
import { PropertyCard } from "@/app/inquilino-dashboard/buscador-propiedades/property-card-inquilino";

const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const MOCK_PROPERTIES = [
    {
      id: "6782b14ab6a0c01a87cadf47",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Calle Los Olivos 34, Edificio Sol",
      agency: "Soluciones Inmobiliarias",
      price: 1400000,
      bedrooms: 2,
      bathrooms: 1,
      city: "Bucaramanga",
      area: 75,
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Calle 50 #10-20, Apartamento 301",
      agency: "Inmobiliaria Capital",
      price: 950000,
      bedrooms: 1,
      bathrooms: 1,
      city: "Bogotá",
      area: 50,
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Carrera 12 #34-45, Urbanización Palma Real",
      agency: "Real Estate Solutions",
      price: 2200000,
      bedrooms: 3,
      bathrooms: 2,
      city: "Cali",
      area: 120,
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Avenida Libertad 87, Torre Central",
      agency: "Inmobiliaria Confiar",
      price: 2700000,
      bedrooms: 4,
      bathrooms: 3,
      city: "Medellín",
      area: 140,
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Sector Vista Hermosa, Casa 5",
      agency: "Vivienda Ideal",
      price: 1800000,
      bedrooms: 3,
      bathrooms: 2,
      city: "Pereira",
      area: 95,
    },
    {
      id: 13,
      image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Barrio San Joaquín, Lote 23",
      agency: "Hogar Total",
      price: 1300000,
      bedrooms: 2,
      bathrooms: 2,
      city: "Cartagena",
      area: 70,
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Calle Nueva 89, Apartaestudio 12",
      agency: "Rentas Plus",
      price: 750000,
      bedrooms: 1,
      bathrooms: 1,
      city: "Barranquilla",
      area: 40,
    },
    {
      id: 15,
      image: "https://plus.unsplash.com/premium_photo-1683140425081-14c44089acd0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      address: "Sector Central, Edificio Vista Real",
      agency: "Inmobiliaria Éxito",
      price: 3000000,
      bedrooms: 4,
      bathrooms: 4,
      city: "Manizales",
      area: 150,
    }
  ];
  

export default function Home() {
  const [filters, setFilters] = useState({
    location: null,
    type: null,
    bedrooms: null,
    price: null,
  });

  const resetFilters = () => {
    setFilters({
      location: null,
      type: null,
      bedrooms: null,
      price: null,
    });
  };

  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    const normalizedLocation = normalizeString(property.city);
    const normalizedSearchLocation = filters.location
      ? normalizeString(filters.location)
      : "";

    const matchesLocation =
      !filters.location || normalizedLocation.includes(normalizedSearchLocation);
    const matchesType = !filters.type || property.type === filters.type;
    const matchesBedrooms =
      !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms, 10);
    const matchesPrice = !filters.price || (() => {
      const [min, max] = filters.price.split("-").map(Number);
      return max
        ? property.price >= min && property.price <= max
        : property.price >= min;
    })();

    return matchesLocation && matchesType && matchesBedrooms && matchesPrice;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <SearchFilters
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
