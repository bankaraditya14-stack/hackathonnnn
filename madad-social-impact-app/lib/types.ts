export type Profile = {
  id: string
  full_name: string | null
  role: 'donor' | 'volunteer' | 'admin'
  location: string | null
  points: number
  created_at: string
}

export type Donation = {
  id: string
  item_type: 'food' | 'clothes' | 'essentials'
  quantity: number
  location: string
  description: string | null
  status: 'pending' | 'assigned' | 'in_progress' | 'completed'
  donor_id: string
  volunteer_id: string | null
  created_at: string
  updated_at: string
}
