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
import { useQuery } from "@tanstack/react-query"
import { getAuth0Id } from "@/app/utils/getAuth0id"
import { useAuth0 } from "@auth0/auth0-react"

function CalendarHeader({ currentDate, onPrevious, onNext, currentView, onToday }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
      <h1 className="text-2xl font-semibold">{format(currentDate, "MMMM yyyy", { locale: es }).charAt(0).toUpperCase() + format(currentDate, "MMMM yyyy", { locale: es }).slice(1)}</h1>
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
                  key={apt._id}
                  className={`rounded p-1 mb-1 cursor-pointer bg-primary-200`}
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <div className="text-xs font-inter font-medium truncate text-white">{apt.title}</div>
                  <div className="text-xs truncate text-gray-200">{apt.time}</div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Modal para detalles de la cita */}
      {selectedAppointment && (
        console.log(selectedAppointment),
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
                <Calendar className="h-6 w-6 text-muted-foreground" />
                <div className="col-span-3">
                  <p className="text-sm font-medium">{format(selectedAppointment.date, "PPP", { locale: es })}</p>
                  <p className="text-xs text-muted-foreground">{selectedAppointment.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <MapPin className="h-6 w-6 text-muted-foreground" />
                <p className="col-span-3 text-sm">{selectedAppointment.property?.address}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Info className="h-6 w-6 text-muted-foreground" />
                <p className="col-span-3 text-sm">{selectedAppointment.description}</p>
              </div>
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Home className="h-6 w-6 text-muted-foreground" />
                    <p className="col-span-3 text-sm truncate">{selectedAppointment.property?.description}</p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <User className="h-6 w-6 text-muted-foreground" />
                    <p className="col-span-3 text-sm">Arrendador potencial: {selectedAppointment.landlord?.firstName + ' ' + selectedAppointment.landlord?.lastName}</p>
                  </div>
                </>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedAppointment(null)} className="bg-primary-400">Cerrar</Button>
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
  const {user} = useAuth0()
  const onToday = () => setCurrentDate(new Date())

  const fetchAppointments = async () => {
    const userId = getAuth0Id(user.sub)
    console.log(userId)

    const response = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/appointment/tenant/${userId}`)

    if (!response.ok) {
      throw new Error('Ocurrio un error consultando la base de datos')
    }

    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments
  })

  if (isPending) {
    return <div>Cargando...</div>
  } 

  if (isError) {
    return <div>Ocurrió un error: {error.message}</div>
  }

  const appointments = data || []


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
      </div>
      
    </div>
  )
}

