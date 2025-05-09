"use client";

import React, { createContext, useContext, type ReactNode } from "react";
import { api } from "@/trpc/react";
import type { MapType } from "@/server/api/routers/map";

interface MapContextType {
  data: MapType[];
  isLoading: boolean;
  refetch: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
  includeInvisible: boolean;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children, includeInvisible }) => {
  const { data, isLoading, refetch } = api.map.getAllMaps.useQuery(
    { includeInvisible },
    { refetchOnWindowFocus: false }
  );

  return (
    <MapContext.Provider value={{ data: data || [], isLoading, refetch }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMapContext must be used within a MapProvider");
  return context;
};
