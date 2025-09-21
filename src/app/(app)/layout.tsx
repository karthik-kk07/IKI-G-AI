'use client';

import Link from "next/link";
import Logo from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Search } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Career Paths', href: '/career-paths' },
    { name: 'Contest Calendar', href: '/contest-calendar' },
    { name: 'Daily Tracker', href: '/daily-tracker' },
    { name: 'Forum', href: '/forum' },
    { name: 'AI Counselor', href: '/chat' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="bg-primary/90 text-primary-foreground">
          <div className="container flex h-10 items-center justify-end gap-6 text-sm">
            <button className="hover:underline"><Search className="h-4 w-4" /></button>
            <button className="hover:underline"><LayoutGrid className="h-4 w-4" /></button>
            <UserNav />
          </div>
        </div>
        <div className="container flex h-16 items-center">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-10">
             <NavigationMenu>
                <NavigationMenuList>
                    {navItems.map(item => (
                        <NavigationMenuItem key={item.href}>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={item.href}>
                                    {item.name}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
