'use client'

import { useState } from 'react'
import {Card,CardContent,CardHeader,CardTitle,CardDescription} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell, Tooltip, Legend } from "recharts"
import { DollarSign, Home, Star, Calendar, Bell, ChevronRight } from 'lucide-react'

const metrics = [
  { title: "Total pagado este año", value: "$14,600", icon: <DollarSign className="w-6 h-6" />, change: "+5.25%" },
  { title: "Contratos activos", value: 2, icon: <Home className="w-6 h-6" />, change: "Sin cambios" },
  { title: "Tareas pendientes", value: 3, icon: <Star className="w-6 h-6" />, change: "-1" },
  { title: "Próximo pago", value: "$1,400", icon: <Calendar className="w-6 h-6" />, date: "12/01" },
]

const paymentData = [
  { month: "Ene", total: 1400, rent: 1200, utilities: 200 },
  { month: "Feb", total: 1380, rent: 1200, utilities: 180 },
  { month: "Mar", total: 1410, rent: 1200, utilities: 210 },
  { month: "Abr", total: 1390, rent: 1200, utilities: 190 },
  { month: "May", total: 1420, rent: 1200, utilities: 220 },
  { month: "Jun", total: 1400, rent: 1200, utilities: 200 },
]

const distributionData = [
  { name: "Renta", value: 85, color: "#3748CD" },
  { name: "Servicios", value: 10, color: "#70BF3F" },
  { name: "Otros", value: 5, color: "#eab308" },
];

const notifications = [
  { type: "Pago", message: "Tu renta de marzo ha sido procesada.", color: "bg-blue-500" },
  { type: "Tarea", message: "Revisar actualizaciones en tu contrato antes del 15/01.", color: "bg-yellow-500" },
  { type: "Próximo", message: "Tu próximo pago es el 12/01 ($1,400).", color: "bg-green-500" },
]

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("Todos")

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Estadísticas del Inquilino</h1>
      
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-100 rounded-full">{metric.icon}</div>
                <Badge variant="outline" className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-500">{metric.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                {metric.date && (
                  <p className="ml-2 text-sm text-gray-500">el {metric.date}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-8">
        <Card className="col-span-5 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Historial de pagos</CardTitle>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar mes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos los meses</SelectItem>
                  {paymentData.map((data) => (
                    <SelectItem key={data.month} value={data.month}>
                      {data.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rent" stackId="a" fill="#3748CD" name="Renta" />
                <Bar dataKey="utilities" stackId="a" fill="#70BF3F" name="Servicios" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribución de Gastos</CardTitle>
            <CardDescription>Desglose mensual de tus pagos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 shadow rounded border border-gray-200">
                          <p className="font-semibold">{data.name}</p>
                          <p className="text-sm">{`${data.value}% - $${(data.value * 14.6).toFixed(2)}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  content={({ payload }) => (
                    <ul className="flex justify-center space-x-4">
                      {payload.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: entry.color }} />
                          <span className="text-sm">{entry.value}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Total mensual: $1,400</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notificaciones */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tareas y Notificaciones</CardTitle>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <li key={index} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Badge className={`mr-3 ${notification.color} text-white`}>
                    {notification.type}
                  </Badge>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

