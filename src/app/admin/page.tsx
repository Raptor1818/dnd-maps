import React from 'react'
import clsx from "clsx";
import Link from "next/link";
import { auth } from '@/server/auth';
import MainWrapper from '@/components/MainWrapper';

type Props = {}

const page = async (_props: Props) => {
  const session = await auth();
  return (
    <MainWrapper>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className={clsx(
          "rounded-md px-10 py-2 font-semibold no-underline transition",
          session ? "bg-white/10 hover:bg-white/20" : "bg-blurple hover:bg-blurple/70"
        )}
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </MainWrapper>
  )
}

export default page