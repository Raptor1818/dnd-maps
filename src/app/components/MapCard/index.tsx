import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import type { MapType } from '@/server/api/routers/map'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
  map: MapType;
  isDM: boolean;
}

const MapCard = ({ map, isDM }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);


  return (
    <Card className="w-[80vw] md:w-[30vw]">
      <CardHeader>
        <CardTitle className="text-lg">{map.name}</CardTitle>
        <CardDescription>{map.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <AspectRatio ratio={16 / 9} className="w-full">
          {!imageLoaded && <Skeleton className="w-full h-full rounded-sm" />}
          <Image
            src={map.image_url}
            alt={map.name}
            fill
            onLoad={() => setImageLoaded(true)}
            className={`object-cover rounded-sm transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </AspectRatio>
      </CardContent>

      {isDM && (
        <CardFooter>
          <div className="flex items-center space-x-2">
            <Checkbox id={`visible-${map.id}`} checked={map.visible} />
            <label
              htmlFor={`visible-${map.id}`}
              className="text-sm font-medium leading-none"
            >
              Visibile
            </label>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default MapCard;
