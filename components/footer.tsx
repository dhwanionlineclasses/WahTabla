'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {

  const pathname = usePathname()

  if(pathname.startsWith('/auth')) {
    return
  }

  return (
    // <div className='w-full bg-white py-4 px-8 flex justify-center'>
      <div className='w-full flex flex-col justify-between items-center bg-primary text-white gap-12 mt-10 px-4 pt-12 pb-4'>
        <div className='max-w-[1517px] w-full flex flex-col sm:flex-row justify-between items-start sm:items-center'>
          <div className='flex flex-col justify-start items-start gap-2 pb-6'>
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={0}
              height={0}
              className='w-12 mb-4 text-white'
            />
            <span className='flex justify-start items-center gap-2'>
            <Image
              src='/icons/message.svg'
              alt='logo'
              width={0}
              height={0}
              className='w-4'
            />
            <span>onlineclasses@dhwaniacademy.org</span>
            </span>
            <span className='flex justify-start items-center gap-2'>
            <Image
              src='/icons/phone.svg'
              alt='logo'
              width={0}
              height={0}
              className='w-4'
            />
            <span>+91 99999 99999</span>
            </span>
            <span className='flex justify-start items-center gap-2'>
            <Image
              src='/icons/location.svg'
              alt='logo'
              width={0}
              height={0}
              className='w-4'
            />
            <span>Somewhere in the World</span>
            </span>
          </div>
          <div className='flex flex-col sm:flex-row justify-start items-start gap-6 sm:gap-2 md:gap-20'>
          <div className='flex flex-col justify-start items-start gap-1 text-sm'>
            <Link href='/' className='text-lg pb-1 font-semibold'>Home</Link>
            <Link href='/#benefits' className='text-white'>Benefits</Link>
            <Link href='/#benefits' className='text-white'>Our Modules</Link>
            <Link href='/#benefits' className='text-white'>Our Testimonials</Link>
            <Link href='/#benefits' className='text-white'>Our FAQ</Link>
          </div>
          <div className='flex flex-col justify-start items-start gap-1 text-sm'>
            <Link href='/' className='text-lg pb-1 font-semibold'>About Us</Link>
            <Link href='/#benefits' className='text-white'>TV Dhwani</Link>
            <Link href='/#benefits' className='text-white'>Dhwani India</Link>
            <Link href='/#benefits' className='text-white'>Dhwani US</Link>
          </div>
          <div className='flex flex-col justify-start items-start gap-1'>
            <Link href='/' className='text-lg pb-1 font-semibold'>Social Profiles</Link>
            <div className='flex justify-start items-center gap-1 text-sm'>
              <Link href='/'>
                <Image
                  src='/icons/linkedin.svg'
                  alt='logo'
                  width={0}
                  height={0}
                  className='w-10 p-2.5 rounded-sm'
                />
              </Link>
              <Link href='/'>
                <Image
                  src='/icons/facebook.svg'
                  alt='logo'
                  width={0}
                  height={0}
                  className='w-10 p-2.5 rounded-sm'
                />
              </Link>
              <Link href='/'>
                <Image
                  src='/icons/twitter.svg'
                  alt='logo'
                  width={0}
                  height={0}
                  className='w-10 p-2.5 rounded-sm'
                />
              </Link>
            </div>
          </div>
          </div>
        </div>
        <p className='w-full flex justify-center items-center text-white text-sm'>© 2024 Abhijit Banerjee. All rights reserved.</p>
      </div>
    // </div>
  )
}

export default Footer