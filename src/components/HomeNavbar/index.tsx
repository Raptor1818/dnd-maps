"use client";

import React from "react";
import { ModeToggle } from "../ModeToggle";

import UploadDialog from "../UploadDialog";
import { useMapContext } from "@/context/MapContext";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import NavbarWrapper from "../NavbarWrapper";

interface Props {
  isDM: boolean;
}

const HomeNavbar = ({ isDM }: Props) => {
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
      </div>
    </NavbarWrapper>
  );
};

export default HomeNavbar;
