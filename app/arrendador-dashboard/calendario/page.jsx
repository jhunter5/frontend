"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Info,
  User,
  Home,
  DollarSign,
} from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  isSameYear,
} from "date-fns"
import { es } from "date-fns/locale"

// Simulación de datos de citas
const appointments = [
  {
    id: 1,
    title: "Visita Apartamento Centro",
    date: new Date(2025, 1, 15),
    time: "10:00 AM",
    color: "bg-blue-100 text-blue-700",
    address: "Calle Principal 123, Centro",
    details: "Apartamento de 2 habitaciones, 1 baño, cocina renovada.",
    type: "landlord",
    propertyDetails: "80m², 2 habitaciones, 1 baño",
    potentialTenant: "María García",
  },
  {
    id: 3,
    title: "Visita Loft Moderno",
    date: new Date(2025, 1, 20),
    time: "11:30 AM",
    color: "bg-purple-100 text-purple-700",
    address: "Calle del Arte 789, Distrito Creativo",
    details: "Loft de espacio abierto, 1 baño, estilo industrial.",
    type: "landlord",
    propertyDetails: "60m², 1 ambiente, 1 baño",
    potentialTenant: "Carlos Rodríguez",
  },
]

function CalendarHeader({ currentDate, onPrevious, onNext, currentView, onToday }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">{format(currentDate, "MMMM yyyy", { locale: es })}</h1>
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex rounded-lg border p-1">
          <Button
            variant={currentView === "month" ? "secondary" : "ghost"}
            size="sm"
          >
            Month
          </Button>
        </div>
      </div>
    </div>
  )
}

function MonthView({ currentDate, appointments }) {
  const firstDayOfMonth = startOfMonth(currentDate)
  const lastDayOfMonth = endOfMonth(currentDate)
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 })
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  return (
    <div className="flex-1 overflow-auto">
      <div className="grid grid-cols-7 h-full">
        {/* Header con días de la semana */}
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
          <div key={day} className="p-2 text-center font-medium border-b">
            {day}
          </div>
        ))}

        {/* Días del mes */}
        {days.map((day, dayIdx) => (
          <div
            key={day.toISOString()}
            className={`min-h-[100px] border-b border-r p-1 ${
              isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-100"
            } ${!isSameYear(day, new Date()) ? "pointer-events-none opacity-50" : ""}`}
          >
            <div className={`text-right ${isSameMonth(day, currentDate) ? "text-gray-900" : "text-gray-400"}`}>
              {format(day, "d")}
            </div>
            {appointments
              .filter((apt) => isSameDay(apt.date, day))
              .map((apt) => (
                <div
                  key={apt.id}
                  className={`rounded p-1 mb-1 cursor-pointer ${apt.color}`}
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <div className="text-xs font-medium truncate">{apt.title}</div>
                  <div className="text-xs truncate">{apt.time}</div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Modal para detalles de la cita */}
      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">{selectedAppointment.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Detalles de la visita programada
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="col-span-3">
                  <p className="text-sm font-medium">{format(selectedAppointment.date, "PPP", { locale: es })}</p>
                  <p className="text-xs text-muted-foreground">{selectedAppointment.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="col-span-3 text-sm">{selectedAppointment.address}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Info className="h-4 w-4 text-muted-foreground" />
                <p className="col-span-3 text-sm">{selectedAppointment.details}</p>
              </div>
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <p className="col-span-3 text-sm">{selectedAppointment.propertyDetails}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="col-span-3 text-sm">Inquilino potencial: {selectedAppointment.potentialTenant}</p>
                  </div>
                </>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedAppointment(null)}>Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}


export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("month")

  const onToday = () => setCurrentDate(new Date())

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col rounded-lg border bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <CalendarHeader
          currentDate={currentDate}
          onPrevious={() => {
            const newDate = addMonths(currentDate, -1)
            if (isSameYear(newDate, new Date())) {
              setCurrentDate(newDate)
            }
          }}
          onNext={() => {
            const newDate = addMonths(currentDate, 1)
            if (isSameYear(newDate, new Date())) {
              setCurrentDate(newDate)
            }
          }}
          onViewChange={setCurrentView}
          currentView={currentView}
          onToday={onToday}
        />

        <MonthView currentDate={currentDate} appointments={appointments} />

        {/* <Button
          size="icon"
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg"
          onClick={() => setShowAddEvent(true)}
        >
          <Plus className="h-6 w-6" />
        </Button> */}
      </div>
      
    </div>
  )
}

