import Link from "next/link";
import Logo from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Assessment', href: '/assessment' },
    { name: 'My Roadmap', href: '/roadmap' },
    { name: 'AI Counselor', href: '/chat' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-10">
            {navItems.map(item => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-primary text-muted-foreground">
                    {item.name}
                </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
