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

  // Mark donation as completed
  const { data, error } = await supabase
    .from('donations')
    .update({
      status: 'completed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('volunteer_id', user.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Donation not found or not assigned to you' }, { status: 404 })
  }

  // Award points to volunteer
  await supabase.rpc('increment_points', { user_id: user.id, amount: 10 })

  return NextResponse.json(data)
}
