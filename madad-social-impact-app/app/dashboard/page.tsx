import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DonorOverview } from '@/components/dashboard/donor-overview'
import { VolunteerOverview } from '@/components/dashboard/volunteer-overview'
import { AdminOverview } from '@/components/dashboard/admin-overview'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/auth/login')

  if (profile.role === 'admin') {
    const { data: donations } = await supabase.from('donations').select('*').order('created_at', { ascending: false })
    const { data: profiles } = await supabase.from('profiles').select('*')
    return <AdminOverview donations={donations ?? []} profiles={profiles ?? []} />
  }

  if (profile.role === 'volunteer') {
    const { data: available } = await supabase
      .from('donations')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    const { data: myTasks } = await supabase
      .from('donations')
      .select('*')
      .eq('volunteer_id', user.id)
      .order('created_at', { ascending: false })
    return <VolunteerOverview available={available ?? []} myTasks={myTasks ?? []} points={profile.points} />
  }

  // Default: donor
  const { data: myDonations } = await supabase
    .from('donations')
    .select('*')
    .eq('donor_id', user.id)
    .order('created_at', { ascending: false })

  return <DonorOverview donations={myDonations ?? []} />
}
