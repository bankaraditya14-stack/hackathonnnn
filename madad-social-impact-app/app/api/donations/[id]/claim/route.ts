import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'volunteer') {
    return NextResponse.json({ error: 'Only volunteers can claim tasks' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('donations')
    .update({
      volunteer_id: user.id,
      status: 'assigned',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('status', 'pending')
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Donation not available' }, { status: 404 })
  }

  return NextResponse.json(data)
}
