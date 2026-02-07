import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-secondary p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-7 w-7 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">MADAD</span>
          </div>
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-center text-sm text-muted-foreground">
                  Error: {params.error}
                </p>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  An unspecified error occurred. Please try again.
                </p>
              )}
            </CardContent>
          </Card>
          <div className="text-center">
            <Link href="/auth/login" className="text-sm text-primary underline underline-offset-4">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
