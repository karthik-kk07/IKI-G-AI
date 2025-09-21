'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4">
            <Logo />
          </Link>
          <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
          <CardDescription>Continue to your IKI-G-AI dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleContinue}>
            <LogIn className="mr-2 h-4 w-4" />
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
