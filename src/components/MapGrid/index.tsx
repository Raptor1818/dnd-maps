"use client";

import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import MapCard from "../MapCard";


export default function MapGrid({ isDM }: { isDM: boolean }) {
  const { data, isLoading } = api.map.getAllMaps.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-row gap-4 items-center">
        <Loader2 className="animate-spin" />
        <h1>Caricamento</h1>
      </div>
    );
  }

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
      {data?.map((map) => (
        map.visible || isDM &&
        <MapCard key={map.id} map={map} isDM={isDM} />
      ))}
    </div>
  );
}
