'use client'

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import type { MapType } from '@/server/api/routers/map'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"


export default function ImageContainer({ map }: { map: MapType }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div
      className={`
        ${"fixed top-0 left-0 w-screen h-screen bg-black"}
        flex items-center justify-center
      `}
    >
      {!isImageLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded" />
      )}


      <TransformWrapper
        initialScale={.75}
        minScale={0.25}
        maxScale={5}
        centerOnInit
        doubleClick={{ disabled: false }}
        pinch={{ disabled: false }}
        wheel={{ step: 0.05 }}
        panning={{ velocityDisabled: true }}
        limitToBounds={false}
      >
        <TransformComponent wrapperClass="w-full h-full flex justify-center items-center">
          <Image
            src={map.image_url}
            alt={map.name}
            width={1920}
            height={1080}
            unoptimized

            className={`object-contain transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => {
              setIsImageLoaded(true)
              console.log("Image loaded")
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
