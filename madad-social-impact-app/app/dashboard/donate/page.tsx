"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DonatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const body = {
      item_type: formData.get("item_type") as string,
      quantity: Number(formData.get("quantity")),
      location: formData.get("location") as string,
      description: formData.get("description") as string,
    }

    const res = await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Failed to create donation")
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Create a Donation</CardTitle>
            <CardDescription>
              Share what you have with those who need it most.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="item_type">Item Type</Label>
                <Select name="item_type" required>
                  <SelectTrigger id="item_type">
                    <SelectValue placeholder="Select item type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="clothes">Clothes</SelectItem>
                    <SelectItem value="essentials">Essentials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. 123 Main St, City"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Any details about the donation..."
                  rows={3}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating..." : "Submit Donation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
