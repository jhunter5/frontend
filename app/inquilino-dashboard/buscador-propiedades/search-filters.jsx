"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

export function SearchFilters({ filters, setFilters, resetFilters }) {
  const [priceRange, setPriceRange] = useState(filters.rentPrice ?? [0, 5000000]);

  useEffect(() => {
    if (filters.rentPrice && Array.isArray(filters.rentPrice)) {
      setPriceRange(filters.rentPrice);
    }
  }, [filters.rentPrice]);

  const handleChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value === "all" ? null : value,
    }));
  };

  const handlePriceChange = (value) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange(value);
      setFilters((prev) => ({
        ...prev,
        rentPrice: value,
      }));
    }
  };

  return (
    <div className="w-full bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto p-4 flex items-center gap-2">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Busca por ubicación"
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={filters.city || ""}
            onChange={(e) => handleChange("city", e.target.value.trim() || "all")}
          />
        </div>
        
        {/* Select Tipo de Inmueble */}
        <Select value={filters.type ?? "all"} onValueChange={(value) => handleChange("type", value)}>
          <SelectTrigger className="w-1/6">
            <SelectValue>
              {filters.type && filters.type !== "all" ? 
                (filters.type === "casa" ? "Casa" : filters.type === "apartamento" ? "Apartamento" : "Oficina") 
                : "Tipo de Inmueble"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="casa">Casa</SelectItem>
            <SelectItem value="apartamento">Apartamento</SelectItem>
            <SelectItem value="oficina">Oficina</SelectItem>
          </SelectContent>
        </Select>

        {/* Select Habitaciones */}
        <Select value={filters.rooms ?? "all"} onValueChange={(value) => handleChange("rooms", value)}>
          <SelectTrigger className="w-1/6">
            <SelectValue>
              {filters.rooms && filters.rooms !== "all" ? filters.rooms : "Habitaciones"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>

        {/* Rango de Precios */}
        <div className="w-1/5">
          <Slider
            min={0}
            max={5000000}
            step={50000}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Botón Limpiar Filtros */}
        <Button variant="outline" onClick={resetFilters} className="bg-primary-500 text-white ml-2">
          Limpiar Filtros
        </Button>
      </div>
    </div>
  );
}
