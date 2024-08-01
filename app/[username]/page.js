"use client"
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

const page = () => {
  const { user, error, isLoading } = useUser();

  return (
    <>
    {user && <div className='flex flex-col gap-4 my-20 py-4 justify-center items-center'>
      
      <div className='flex gap-3'>
        <div className='w-[120px]'>Name</div>
        <div className='bg-slate-700 rounded-sm w-[360px] px-2'>{user.name}</div>
      </div>

      <div className='flex gap-3'>
        <div className='w-[120px]'>Email Address </div>
        <div className='bg-slate-700 rounded-sm w-[360px] px-2'>{user.email}</div>
      </div>
    </div>}
    </>
  )
}

export default page
