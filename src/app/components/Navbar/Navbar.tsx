import React from 'react'
import { ModeToggle } from '../ModeToggle/ModeToggle'
import clsx from 'clsx';

import Link from 'next/link';

interface Props {
  session: any;
}

const Navbar = ({ session }: Props) => {
  return (
    <nav className='px-4 h-14 flex items-center justify-between'>
      <ModeToggle />
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className={clsx(
          'rounded-md px-10 py-3 font-semibold no-underline transition',
          session ? 'bg-white/10 hover:bg-white/20' : 'bg-blurple hover:bg-blurple/70'
        )}
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </nav>
  )
}

export default Navbar