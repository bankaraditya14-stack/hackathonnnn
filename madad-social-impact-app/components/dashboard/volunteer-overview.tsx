'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Package, ClipboardList } from 'lucide-react'
import type { Donation } from '@/lib/types'

export function VolunteerOverview({
  available,
  myTasks,
  points,
}: {
  available: Donation[]
  myTasks: Donation[]
  points: number
}) {
  const activeTasks = myTasks.filter((t) => t.status !== 'completed').length
  const completedTasks = myTasks.filter((t) => t.status === 'completed').length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Volunteer Dashboard</h2>
        <p className="text-muted-foreground">Browse tasks, deliver donations, and earn points.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Points</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{points}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Tasks</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{activeTasks}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-display text-2xl font-bold text-card-foreground">{completedTasks}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Package className="h-5 w-5 text-primary" />
            Available Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {available.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No donations available right now. Check back later!
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {available.slice(0, 10).map((d) => (
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
                  <Badge variant="secondary">Available</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {myTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <ClipboardList className="h-5 w-5 text-primary" />
              My Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {myTasks.slice(0, 10).map((d) => (
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
                  <Badge variant={d.status === 'completed' ? 'default' : 'outline'}>
                    {d.status === 'in_progress' ? 'In Progress' : d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
