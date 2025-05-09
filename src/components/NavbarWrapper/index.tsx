import clsx from 'clsx';
import React from 'react'

type Props = {
  children: React.ReactNode;
  className?: string;
}

const NavbarWrapper = ({ children, className }: Props) => {
  return (
    <nav className={clsx('z-[100] fixed w-full bg-background border border-x-0 border-t-0 border-b-border px-4 py-2 md:px-8 md:py-4 flex items-center justify-between', className && className)}>
      {children}
    </nav>
  )
}

export default NavbarWrapper