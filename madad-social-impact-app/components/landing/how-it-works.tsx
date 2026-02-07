import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Sign up & choose your role',
    description: 'Create a free account as a donor, volunteer, or admin. Each role has a tailored dashboard.',
  },
  {
    step: '02',
    title: 'List or claim donations',
    description: 'Donors list items they want to give. Volunteers browse available donations and claim deliveries.',
  },
  {
    step: '03',
    title: 'Deliver & earn points',
    description: 'Volunteers deliver items to those in need and earn recognition points. Admins oversee operations.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How MADAD works
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Three simple steps from donation to delivery.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="flex flex-col">
              <span className="font-display text-4xl font-bold text-primary/30">{item.step}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/auth/sign-up">
              Join MADAD today <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
