'use client'

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import type { MapType } from '@/server/api/routers/map'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageContainer({ map }: { map: MapType }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div
      className={`
        ${fullscreen ? "fixed top-0 left-0 w-screen h-screen z-50 bg-black" : "relative w-full"}
        flex items-center justify-center
      `}
    >
      {!isImageLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded" />
      )}

      <Button
        variant="secondary"
        className="absolute top-2 right-2 z-50"
        onClick={() => setFullscreen(!fullscreen)}
      >
        {fullscreen ? <Minimize /> : <Maximize />}
      </Button>

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        centerOnInit
        doubleClick={{ disabled: false }}
        pinch={{ disabled: false }}
        wheel={{ step: 0.1 }}
        panning={{ velocityDisabled: true }}
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
