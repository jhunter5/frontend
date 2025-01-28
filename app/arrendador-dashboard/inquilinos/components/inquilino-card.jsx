import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Phone, Home, DollarSign } from 'lucide-react'
import Link from "next/link"

export function TenantCard({ tenant }) {
  return (
    <Link href={`/arrendador-dashboard/inquilinos/${tenant.authID}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={tenant.avatar} alt={`${tenant.firstName} ${tenant.lastName}`} className="object-cover"/>
              <AvatarFallback>{tenant.firstName[0]}{tenant.lastName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold font-spaceGrotesk">{tenant.firstName} {tenant.lastName}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary font-inter">{tenant.rating}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium font-inter">{tenant.avgRating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground font-inter">
              <Mail className="h-4 w-4 mr-2" />
              <span>{tenant.email}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground font-inter">
              <Phone className="h-4 w-4 mr-2" />
              <span>{tenant.phone}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground font-inter">
              <Home className="h-4 w-4 mr-2" />
              <span>{tenant.currentProperty}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium font-inter">Canon Arrendamiento</span>
            <span className="text-lg font-semibold flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {tenant.monthlyRent}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

