import React from 'react'
import { ModeToggle } from '../ModeToggle'
import clsx from 'clsx';

import Link from 'next/link';

interface Props {
  session: any;
}

const Navbar = ({ session }: Props) => {
  return (
    <nav className='z-[100] fixed w-full bg-background border border-x-0 border-t-0 border-b-border px-4 py-2 md:px-8 md:py-4 flex items-center justify-between'>
      <ModeToggle />
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className={clsx(
          'rounded-md px-10 py-2 font-semibold no-underline transition',
          session ? 'bg-white/10 hover:bg-white/20' : 'bg-blurple hover:bg-blurple/70'
        )}
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </nav>
  )
}

export default Navbar