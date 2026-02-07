'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Clock, CheckCircle2, Truck } from 'lucide-react'
import type { Donation } from '@/lib/types'

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'secondary' },
  assigned: { label: 'Assigned', variant: 'outline' },
  in_progress: { label: 'In Progress', variant: 'default' },
  completed: { label: 'Completed', variant: 'default' },
}

export function DonorOverview({ donations }: { donations: Donation[] }) {
  const pending = donations.filter((d) => d.status === 'pending').length
  const active = donations.filter((d) => d.status === 'assigned' || d.status === 'in_progress').length
  const completed = donations.filter((d) => d.status === 'completed').length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Donor Dashboard</h2>
        <p className="text-muted-foreground">Track your donations and their delivery status.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{pending}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Transit</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{active}</p>
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
            <Package className="h-5 w-5 text-primary" />
            Recent Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No donations yet. Create your first donation from the My Donations page.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {donations.slice(0, 10).map((d) => {
                const config = statusConfig[d.status] ?? statusConfig.pending
                return (
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
                    <Badge variant={config.variant}>{config.label}</Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
