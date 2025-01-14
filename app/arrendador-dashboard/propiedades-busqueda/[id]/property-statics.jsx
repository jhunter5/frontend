import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function PropertyStatistics({ property }) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de la Propiedad</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{property.totalApplications}</p>
          <p className="text-muted-foreground">Total de postulaciones</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución por Edad</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={property.demographics.ageGroups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución por Industria</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={property.demographics.industries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

