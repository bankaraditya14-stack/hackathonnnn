'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Package, BarChart3, CheckCircle2 } from 'lucide-react'
import type { Donation, Profile } from '@/lib/types'

export function AdminOverview({
  donations,
  profiles,
}: {
  donations: Donation[]
  profiles: Profile[]
}) {
  const totalDonors = profiles.filter((p) => p.role === 'donor').length
  const totalVolunteers = profiles.filter((p) => p.role === 'volunteer').length
  const totalDonations = donations.length
  const completed = donations.filter((d) => d.status === 'completed').length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground">Full overview of the MADAD platform operations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Donors</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{totalDonors}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volunteers</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{totalVolunteers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Donations</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{totalDonations}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{completed}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            Recent Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No donations in the system yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {donations.slice(0, 15).map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium capitalize text-card-foreground">{d.item_type}</span>
                    <span className="text-sm text-muted-foreground">
                      Qty: {d.quantity} &middot; {d.location}
                    </span>
                  </div>
                  <Badge
                    variant={
                      d.status === 'completed'
                        ? 'default'
                        : d.status === 'pending'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {d.status === 'in_progress'
                      ? 'In Progress'
                      : d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
