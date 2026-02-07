'use client'

import React from "react"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Heart,
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

type Profile = {
  id: string
  full_name: string | null
  role: string
  location: string | null
  points: number
  created_at: string
}

const navItems: Record<string, { label: string; href: string; icon: React.ElementType }[]> = {
  donor: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Donations', href: '/dashboard/donations', icon: Package },
    { label: 'AI Assistant', href: '/dashboard/chat', icon: MessageSquare },
  ],
  volunteer: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Available Tasks', href: '/dashboard/tasks', icon: Package },
    { label: 'AI Assistant', href: '/dashboard/chat', icon: MessageSquare },
  ],
  admin: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'All Donations', href: '/dashboard/donations', icon: Package },
    { label: 'Users', href: '/dashboard/users', icon: Users },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'AI Assistant', href: '/dashboard/chat', icon: MessageSquare },
  ],
}

export function DashboardShell({
  profile,
  userEmail,
  children,
}: {
  profile: Profile
  userEmail: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const items = navItems[profile.role] ?? navItems.donor

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const initials = profile.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : userEmail[0]?.toUpperCase() ?? 'U'

  return (
    <div className="flex min-h-svh">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-card-foreground">MADAD</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-xs text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-card-foreground">
                {profile.full_name || userEmail}
              </p>
              <p className="truncate text-xs text-muted-foreground capitalize">{profile.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setMobileOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
          <aside className="relative z-50 flex h-full w-64 flex-col bg-card shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-display text-xl font-bold text-card-foreground">MADAD</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-4">
              {items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
            <h1 className="font-display text-lg font-semibold text-card-foreground">
              {items.find((i) => i.href === pathname)?.label ?? 'Dashboard'}
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm md:inline">{profile.full_name || userEmail}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-6">{children}</main>
      </div>
    </div>
  )
}
