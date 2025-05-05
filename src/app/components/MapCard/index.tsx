import React from 'react'
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Checkbox } from "@/components/ui/checkbox"

interface Props {
  map: any;
  isDM: boolean;
}

const MapCard = ({ map, isDM }: Props) => {
  function byteArrayToImage(byteArray: Uint8Array, mimeType: string): string {
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle><h1>{map.name}</h1></CardTitle>
        <CardDescription>{map.description}</CardDescription>
      </CardHeader>
      <CardContent className='relative'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={byteArrayToImage(map.image, "image/webp")}
            alt={map.name}
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      {isDM && (
        <CardFooter>
          <div className="flex items-center space-x-2">
            <Checkbox id="visible" checked={map.visible} />
            <label
              htmlFor="visible"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Visibile
            </label>
          </div>
        </CardFooter>
      )}
    </Card>

  )
}

export default MapCard