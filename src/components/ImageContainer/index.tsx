'use client'

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { MapType } from '@/server/api/routers/map'

interface Props {
  map: MapType
}

const MapImage = ({ map }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <AspectRatio ratio={16 / 9} className="relative w-full">
      {!isImageLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded" />
      )}

      <Image
        src={map.image_url}
        alt={map.name}
        fill
        unoptimized
        className={`object-cover transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        onLoad={() => {
          setIsImageLoaded(true)
          console.log('Image loaded')
        }}
      />
    </AspectRatio>
  )
}

export default MapImage
