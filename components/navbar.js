"use client"
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import Link from 'next/link';

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <div className='bg-cyan-700 flex justify-around items-center py-1'>
        <div className="logo flex gap-2 items-center h-8">
          <img width={44} height={44} src="data:image/png;base64,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" alt="" />
          <span className='text-white font-bold'>Task Manager</span>
        </div>

        {!user && <div className="menu cursor-pointer">
          <Button gradientDuoTone="pinkToOrange">
            <Link href="/api/auth/login" className='hover:font-medium transition-all'>Login</Link>
          </Button>
        </div>}
        {user && <div className='flex gap-3'>
        <Dropdown label="Menu" className='bg-white py-1 px-4 font-medium hover:font-medium' dismissOnClick={false}>
          <Dropdown.Item><Link href={"http://localhost:3000"}>
            Home
          </Link></Dropdown.Item>
          <Dropdown.Item><Link href={"http://localhost:3000/dashboard"}>
            Dashboard
          </Link></Dropdown.Item>
          <Dropdown.Item><Link href={`http://localhost:3000/${user.name}`}>
            Profile
          </Link></Dropdown.Item>
          <Dropdown.Item >
            <Link href={"/api/auth/logout"}>Sign out</Link>
          </Dropdown.Item>
        </Dropdown>

      </div>}
      </div>
    </>
  )
}

export default Navbar
