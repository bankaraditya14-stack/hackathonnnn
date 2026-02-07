"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Donation } from "@/lib/types"

export default function TasksPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDonations = useCallback(async () => {
    const res = await fetch("/api/donations")
    if (res.ok) {
      const data = await res.json()
      setDonations(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  async function handleClaim(id: string) {
    const res = await fetch(`/api/donations/${id}/claim`, { method: "POST" })
    if (res.ok) {
      fetchDonations()
    }
  }

  async function handleComplete(id: string) {
    const res = await fetch(`/api/donations/${id}/complete`, { method: "POST" })
    if (res.ok) {
      fetchDonations()
    }
  }

  const pendingDonations = donations.filter((d) => d.status === "pending")
  const myTasks = donations.filter(
    (d) => d.status === "assigned" || d.status === "in_progress"
  )

  if (loading) {
    return (
      <div className="flex-1 p-6 lg:p-8">
        <p className="text-muted-foreground">Loading available tasks...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">My Active Tasks</h1>
          <p className="text-muted-foreground mt-1">Deliveries you have claimed</p>
        </div>

        {myTasks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              You have no active tasks. Claim a donation below to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {myTasks.map((donation) => (
              <Card key={donation.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">{donation.item_type}</CardTitle>
                    <Badge variant="secondary">{donation.status.replace("_", " ")}</Badge>
                  </div>
                  <CardDescription>{donation.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Quantity</span>
                      <span className="font-medium">{donation.quantity}</span>
                    </div>
                    {donation.description && (
                      <p className="text-sm text-muted-foreground">{donation.description}</p>
                    )}
                    <Button
                      size="sm"
                      onClick={() => handleComplete(donation.id)}
                    >
                      Mark as Delivered
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">Available Donations</h2>
          <p className="text-muted-foreground mt-1">Claim a donation to deliver it to those in need</p>
        </div>

        {pendingDonations.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No donations available at the moment. Check back soon.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingDonations.map((donation) => (
              <Card key={donation.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">{donation.item_type}</CardTitle>
                    <Badge variant="outline" className="text-primary border-primary">
                      Available
                    </Badge>
                  </div>
                  <CardDescription>{donation.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Quantity</span>
                      <span className="font-medium">{donation.quantity}</span>
                    </div>
                    {donation.description && (
                      <p className="text-sm text-muted-foreground">{donation.description}</p>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleClaim(donation.id)}
                    >
                      Claim This Donation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
