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
import { ChevronLeft, ChevronRight, CalendarIcon, MapPin, Info, User, Home } from 'lucide-react'
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
import { motion } from "framer-motion"

function CalendarHeader({ currentDate, onPrevious, onNext, onToday }) {
  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-t-lg">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold">
          {format(currentDate, "MMMM yyyy", { locale: es }).charAt(0).toUpperCase() + format(currentDate, "MMMM yyyy", { locale: es }).slice(1)}
        </h1>
        <Button variant="outline" size="sm" onClick={onToday} className="text-primary-600">
          Hoy
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onPrevious} className="text-white hover:bg-white hover:text-primary-600">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext} className="text-white hover:bg-white hover:text-primary-600">
          <ChevronRight className="h-6 w-6" />
        </Button>
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
    <div className="flex-1 overflow-auto bg-white">
      <div className="grid grid-cols-7 h-full">
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
          <div key={day} className="p-2 text-center font-medium text-primary-600 border-b bg-primary-50">
            {day}
          </div>
        ))}

        {days.map((day, dayIdx) => (
          <motion.div
            key={day.toISOString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`min-h-[100px] border-b border-r p-1 ${
              isSameMonth(day, currentDate) ? "bg-white" : "bg-primary-50"
            } ${!isSameYear(day, new Date()) ? "pointer-events-none opacity-50" : ""}`}
          >
            <div className={`text-right ${isSameMonth(day, currentDate) ? "text-primary-600" : "text-primary-300"}`}>
              {format(day, "d")}
            </div>
            {appointments
              .filter((apt) => isSameDay(apt.date, day))
              .map((apt) => (
                <motion.div
                  key={apt._id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded p-1 mb-1 cursor-pointer bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-sm"
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <div className="text-xs font-medium truncate">{apt.title}</div>
                  <div className="text-xs truncate opacity-75">{apt.time}</div>
                </motion.div>
              ))}
          </motion.div>
        ))}
      </div>

      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-primary-600">{selectedAppointment.title}</DialogTitle>
              <DialogDescription className="text-sm text-primary-300">
                Detalles de la visita programada
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <CalendarIcon className="h-6 w-6 text-primary-400" />
                <div className="col-span-3">
                  <p className="text-sm font-medium">{format(selectedAppointment.date, "PPP", { locale: es })}</p>
                  <p className="text-xs text-primary-300">{selectedAppointment.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <MapPin className="h-6 w-6 text-primary-400" />
                <p className="col-span-3 text-sm">{selectedAppointment.property?.address}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Info className="h-6 w-6 text-primary-400" />
                <p className="col-span-3 text-sm">{selectedAppointment.description}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Home className="h-6 w-6 text-primary-400" />
                <p className="col-span-3 text-sm truncate">{selectedAppointment.property?.description}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <User className="h-6 w-6 text-primary-400" />
                <p className="col-span-3 text-sm">Arrendador potencial: {selectedAppointment.landlord[0]?.firstName + ' ' + selectedAppointment.landlord[0]?.lastName}</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedAppointment(null)} className="bg-primary-500 hover:bg-primary-600 text-white">Cerrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const {user} = useAuth0()
  const onToday = () => setCurrentDate(new Date())

  const fetchAppointments = async () => {
    const userId = getAuth0Id(user.sub)
    const response = await fetch(`https://backend-khaki-three-90.vercel.app/api/appointment/tenant/${userId}`)
    if (!response.ok) {
      throw new Error('Ocurrió un error consultando la base de datos')
    }
    return response.json()
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments
  })

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  } 

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-primary-50 border-l-4 border-primary-500 text-primary-600 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error.message}</p>
        </div>
      </div>
    )
  }

  const appointments = data || []

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col rounded-lg border shadow-lg bg-white overflow-hidden">
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
        onToday={onToday}
      />
      <MonthView currentDate={currentDate} appointments={appointments} />
    </div>
  )
}
