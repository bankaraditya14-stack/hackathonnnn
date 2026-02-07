import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") redirect("/dashboard")

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false })

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("points", { ascending: false })

  const totalDonations = donations?.length ?? 0
  const completed = donations?.filter((d) => d.status === "completed").length ?? 0
  const pending = donations?.filter((d) => d.status === "pending").length ?? 0
  const inProgress = donations?.filter(
    (d) => d.status === "assigned" || d.status === "in_progress"
  ).length ?? 0

  const donors = profiles?.filter((p) => p.role === "donor") ?? []
  const volunteers = profiles?.filter((p) => p.role === "volunteer") ?? []

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Donations</CardDescription>
              <CardTitle className="text-3xl font-display">{totalDonations}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl font-display text-primary">{completed}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-3xl font-display text-accent">{inProgress}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl font-display">{pending}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Volunteers</CardTitle>
              <CardDescription>Ranked by impact points</CardDescription>
            </CardHeader>
            <CardContent>
              {volunteers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No volunteers yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {volunteers.slice(0, 10).map((v, i) => (
                    <div key={v.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="font-medium">{v.full_name || "Anonymous"}</span>
                      </div>
                      <Badge variant="secondary">{v.points} pts</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest activity on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              {!donations || donations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No donations yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {donations.slice(0, 10).map((d) => (
                    <div key={d.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium capitalize">{d.item_type}</span>
                        <span className="text-xs text-muted-foreground">{d.location}</span>
                      </div>
                      <Badge
                        variant={
                          d.status === "completed" ? "default" :
                          d.status === "pending" ? "outline" : "secondary"
                        }
                      >
                        {d.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>{(profiles?.length ?? 0)} registered users ({donors.length} donors, {volunteers.length} volunteers)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {profiles?.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{p.full_name || "Anonymous"}</span>
                    <span className="text-xs text-muted-foreground">{p.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">{p.role}</Badge>
                    {p.role === "volunteer" && (
                      <Badge variant="secondary">{p.points} pts</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
