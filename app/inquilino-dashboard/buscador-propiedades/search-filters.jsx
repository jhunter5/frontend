"use client"

import { Search, HomeIcon, Bed, DollarSign, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export function SearchFilters({ filters, setFilters, resetFilters }) {
  const [priceRange, setPriceRange] = useState(filters.rentPrice ?? [0, 5000000])

  useEffect(() => {
    if (filters.rentPrice && Array.isArray(filters.rentPrice)) {
      setPriceRange(filters.rentPrice)
    }
  }, [filters.rentPrice])

  const handleChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value === "all" ? null : value,
    }))
  }

  const handlePriceChange = (value) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange(value)
      setFilters((prev) => ({
        ...prev,
        rentPrice: value,
      }))
    }
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== null && (!Array.isArray(value) || value[0] !== 0 || value[1] !== 5000000),
  ).length

  return (
    <div className="w-full bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          {/* Búsqueda por ubicación */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Busca por ciudad o ubicación"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50/50"
              value={filters.city || ""}
              onChange={(e) => handleChange("city", e.target.value.trim() || "all")}
            />
          </div>

          {/* Tipo de Inmueble */}
          <div className="w-full md:w-48">
            <Select value={filters.type ?? "all"} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Tipo de Inmueble" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="oficina">Oficina</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Habitaciones */}
          <div className="w-full md:w-44">
            <Select value={filters.rooms ?? "all"} onValueChange={(value) => handleChange("rooms", value)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Habitaciones" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="1">1 Habitación</SelectItem>
                <SelectItem value="2">2 Habitaciones</SelectItem>
                <SelectItem value="3">3+ Habitaciones</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rango de Precios */}
          <div className="w-full md:w-72">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Rango de precios</span>
            </div>
            <Slider
              min={0}
              max={5000000}
              step={50000}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Botón Limpiar Filtros */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex items-center gap-2 h-10 px-4 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
              <span>
                Limpiar filtros <Badge variant="secondary">{activeFiltersCount}</Badge>
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

