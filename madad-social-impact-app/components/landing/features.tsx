import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, BarChart3, MessageSquare, Shield, Star } from 'lucide-react'

const features = [
  {
    icon: Package,
    title: 'Donate Items',
    description: 'List food, clothes, or essentials you want to donate. We handle the matching and logistics.',
  },
  {
    icon: Users,
    title: 'Volunteer Network',
    description: 'Volunteers pick up and deliver donations, earning points for their contributions to the community.',
  },
  {
    icon: BarChart3,
    title: 'Admin Dashboard',
    description: 'Full visibility into all operations with analytics, user management, and donation tracking.',
  },
  {
    icon: MessageSquare,
    title: 'AI Assistant',
    description: 'Built-in AI chatbot helps you navigate the platform, find resources, and answer questions.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Secure role management ensures donors, volunteers, and admins see exactly what they need.',
  },
  {
    icon: Star,
    title: 'Points & Rewards',
    description: 'Volunteers earn recognition points for completed deliveries, encouraging sustained community engagement.',
  },
]

export function Features() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need to make an impact
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A complete platform for coordinating donations from listing to delivery.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/60 bg-card">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
