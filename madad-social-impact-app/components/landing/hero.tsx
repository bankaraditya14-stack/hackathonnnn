import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(168_65%_34%/0.06),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-display text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          Give what you can.{' '}
          <span className="text-primary">Help where it matters.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          MADAD connects donors with volunteers to deliver food, clothes, and essentials to those who need them most. Every contribution makes a difference.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/auth/sign-up">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">Sign in</Link>
          </Button>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold text-foreground">3</span>
            <span>Roles supported</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold text-foreground">100%</span>
            <span>Transparent</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold text-foreground">AI</span>
            <span>Powered matching</span>
          </div>
        </div>
      </div>
    </section>
  )
}
