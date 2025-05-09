import clsx from 'clsx';
import React from 'react'

interface Props {
  children: React.ReactNode;
  className?: string;
}

const MainWrapper = ({ children, className }: Props) => {
  return (
    <main
      className={clsx('w-full h-full flex flex-col justify-center items-center pt-18 md:pt-22 pb-8 px-4 md:px-8 overflow-scroll', className && className)}
    >
      {children}
    </main>
  )
}

export default MainWrapper