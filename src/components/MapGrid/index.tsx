"use client";

import { Loader2 } from "lucide-react";
import MapCard from "../MapCard";
import { useMapContext } from "@/context/MapContext";

interface Props {
  isDM: boolean;
}

export default function MapGrid({ isDM }: Props) {
  const { data, isLoading } = useMapContext();

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
      {data.map((map) => (
        <MapCard key={map.id} map={map} isDM={isDM} />
      ))}
    </div>
  );
}