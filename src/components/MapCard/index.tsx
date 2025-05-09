import React, { useState } from 'react'
import Image from 'next/image'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import type { MapType } from '@/server/api/routers/map'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { api } from "@/trpc/react";
import DeleteButton from './DeleteButton'
import clsx from 'clsx'
import { Button } from '../ui/button'

interface Props {
  map: MapType;
  isDM: boolean;
}


const MapCard = ({ map, isDM }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [databaseActionLoading, setDatabaseActionLoading] = useState(false);

  const editVisibility = api.map.editVisibilityMap.useMutation();

  const VisibilityOnChange = async () => {
    setDatabaseActionLoading(true);
    try {
      await editVisibility.mutateAsync({
        id: map.id,
        visible: !map.visible,
      });
      alert("Map visiblity edited successfully!");
    } catch (e) {
      console.error(e);
      alert("Error editing map visiblity");
    }
    setDatabaseActionLoading(false);
  };

  return (
    <Card className="w-[80vw] md:w-[30vw]">
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle className="text-2xl">
            <div className='flex items-center gap-2'>
              {map.name}
              <EyeOff className={clsx("text-red-700", map.visible && "hidden")} />
            </div>
          </CardTitle>

          {isDM && (
            <div className='flex gap-2'>

              <Button
                onClick={VisibilityOnChange}
                type='submit'
                disabled={databaseActionLoading}
              >
                {databaseActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (map.visible ? <EyeOff /> : <Eye />)}
              </Button>
              <DeleteButton mapId={map.id} map_generated_name={map.image_generated_name} />
            </div>
          )}

        </div>
        <CardDescription>{map.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Link href={`/map/${map.id}`} className='cursor-pointer'>
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
        </Link>
      </CardContent>
    </Card>
  );
}

export default MapCard;
