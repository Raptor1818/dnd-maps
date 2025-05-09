"use client";

import React, { type ReactNode } from "react";
import { MapProvider } from "@/context/MapContext";

interface ClientMapProviderProps {
  children: ReactNode;
  includeInvisible: boolean;
}

const ClientMapProvider: React.FC<ClientMapProviderProps> = ({ children, includeInvisible }) => (
  <MapProvider includeInvisible={includeInvisible}>{children}</MapProvider>
);

export default ClientMapProvider;
