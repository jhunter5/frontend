"use client"; 

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchFilters({ filters, setFilters, resetFilters }) {
  const handleChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value === "all" ? null : value, 
    }));
  };

  return (
    <div className="w-full bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Busca por ubicación"
            className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filters.location || ""}
            onChange={(e) =>
              handleChange("location", e.target.value || "all")
            }
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={filters.type || ""} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tipo de Inmueble" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="office">Oficina</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.bedrooms || ""} onValueChange={(value) => handleChange("bedrooms", value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Habitaciones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.price || ""} onValueChange={(value) => handleChange("price", value)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="0-1000000">$0 - $1.000.000</SelectItem>
              <SelectItem value="1000000-2000000">$1.000.000 - $2.000.000</SelectItem>
              <SelectItem value="2000000+">$2.000.000+</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={resetFilters}>
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
