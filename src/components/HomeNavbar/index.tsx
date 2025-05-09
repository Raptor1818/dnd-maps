"use client";

import React from "react";
import { ModeToggle } from "../ModeToggle";
import type { Session } from "next-auth";
import clsx from "clsx";
import Link from "next/link";
import UploadDialog from "../UploadDialog";
import { useMapContext } from "@/context/MapContext";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import NavbarWrapper from "../NavbarWrapper";

interface Props {
  session: Session | null;
  isDM: boolean;
}

const HomeNavbar = ({ session, isDM }: Props) => {
  const { isLoading, refetch } = useMapContext();

  return (
    <NavbarWrapper>
      <ModeToggle />
      <Button
        onClick={() => refetch()}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin inline-block" /> : <RefreshCw />}{" "}Refresha mappe
      </Button>
      <div className="flex items-center gap-2">
        {isDM && <UploadDialog />}
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className={clsx(
            "rounded-md px-10 py-2 font-semibold no-underline transition",
            session ? "bg-white/10 hover:bg-white/20" : "bg-blurple hover:bg-blurple/70"
          )}
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </NavbarWrapper>
  );
};

export default HomeNavbar;
