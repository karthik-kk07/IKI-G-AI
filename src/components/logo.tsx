import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-primary"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 12l6 6" />
        <path d="M12 6l-6 6" />
        <path d="M12 18l-6-6" />
        <path d="M12 6v12" />
        <path d="M6 12h12" />
      </svg>
      <span className="font-headline text-xl font-bold tracking-tight">
        IKI-G-AI
      </span>
    </Link>
  );
}
