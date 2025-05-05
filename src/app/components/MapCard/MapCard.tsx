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

interface Props { }

const MapCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle><h1>Card Title</h1></CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className='relative'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/maps/laisa_heightmap.webp"
            alt="Laisa Heightmap"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>

  )
}

export default MapCard