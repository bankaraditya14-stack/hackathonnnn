import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold text-card-foreground">MADAD</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Connecting communities through compassion. Built for social impact.
        </p>
      </div>
    </footer>
  )
}
