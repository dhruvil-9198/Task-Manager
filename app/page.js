"use client"
import Link from "next/link";
import { Button } from "flowbite-react";
import { useUser } from '@auth0/nextjs-auth0/client'
// import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function Home() {
  // const { data: session } = useSession()
  const { user, error, isLoading } = useUser();

  return (
    <div className="text-white flex flex-col gap-5 justify-center items-center h-[80vh]">
      <div className="text-7xl font-serif">Welcome to the Task Manager</div>
      <div className="text-7xl font-serif">Start managing your tasks</div>
      <div className="text-center text-2xl">
      <Button gradientDuoTone="tealToLime">
          <Link href={(user) ? `/dashboard` : `/api/auth/login`} className="font-bold text-2xl">Get Started →</Link>
      </Button>
      </div>
    </div>
  );
}
