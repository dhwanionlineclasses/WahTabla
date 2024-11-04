'use client'

import React from 'react'
import { Button } from './ui/button'
import { ArchiveIcon, GearIcon, QuestionMarkCircledIcon, ReaderIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const ProfileSidebar = () => {
  const pathname = usePathname()
  return (
    <section className="w-[300px] flex flex-col justify-start items-start space-y-1 min-h-[92vh] bg-white shadow-sm rounded-lg p-4">
        <div className='w-full flex flex-col justify-start items-start gap-1'>
          <Button variant='ghost' className={cn('w-full h-12 text-lg font-medium justify-start py-1',
            pathname === '/profile' ? 'bg-accent' : ''
          )}>
            <ArchiveIcon className='w-12 h-12 text-black' />
            <span>Overview</span>
          </Button>
          <Button variant='ghost' className='w-full h-12 text-lg font-medium justify-start py-1'>
            <QuestionMarkCircledIcon className='w-12 h-12 text-black' />
            <span>Doubt Clearing</span>
          </Button>
          <Button variant='ghost' className='w-full h-12 text-lg font-medium justify-start py-1'>
            <GearIcon className='w-12 h-12 text-black' />
            <span>Setting</span>
          </Button>
          <Button variant='ghost' className='w-full h-12 text-lg font-medium justify-start py-1'>
            <ReaderIcon className='w-12 h-12 text-black' />
            <span>Exam Marks</span>
          </Button>
        </div>
    </section>
  )
}

export default ProfileSidebar