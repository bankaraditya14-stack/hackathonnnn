import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Heart, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SignUpSuccessPage() {
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
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>
                We sent you a confirmation link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-sm text-muted-foreground">
                Please check your email and click the confirmation link to activate your account. Then you can sign in and start making an impact.
              </p>
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
