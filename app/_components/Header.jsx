import React from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
function Header() {
  return (
    <div className='p-8 flex justify-between items-center shadow-sm'>
    <Image src={'./logo.svg'} alt='logo' width={160} height={100} />

  <Link
   href="/signin"
  className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
  >
    Get Started
    </Link>

    </div>
  )
}

export default Header
