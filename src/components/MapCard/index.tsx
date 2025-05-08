import React, { useState } from 'react'
import Image from 'next/image'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import type { MapType } from '@/server/api/routers/map'
import { EllipsisVertical, Eye, EyeOff, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import DeleteButton from './DeleteButton'
import clsx from 'clsx'

interface Props {
  map: MapType;
  isDM: boolean;
}

const editVisiblityMapFormSchema = z.object({
  visible: z.boolean(),
});

type editVisiblityMapFormValues = z.infer<typeof editVisiblityMapFormSchema>;

const MapCard = ({ map, isDM }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const editVisibility = api.map.editVisibilityMap.useMutation();

  const editVisiblityMapForm = useForm<editVisiblityMapFormValues>({
    resolver: zodResolver(editVisiblityMapFormSchema),
    defaultValues: {
      visible: map.visible,
    },
  })

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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className='cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Edita</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Form {...editVisiblityMapForm}>
                  <form
                    onSubmit={editVisiblityMapForm.handleSubmit(async (values) => {
                      try {
                        await editVisibility.mutateAsync({
                          id: map.id,
                          visible: values.visible,
                        });
                        alert("Map visiblity edited successfully!");
                      } catch (e) {
                        console.error(e);
                        alert("Error editing map visiblity");
                      }
                    })}
                  >
                    <FormField
                      control={editVisiblityMapForm.control}
                      name="visible"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <button type='submit' className='w-full'>
                              <DropdownMenuCheckboxItem
                                checked={map.visible}
                                onCheckedChange={field.onChange}
                              >
                                Visiblile
                                <DropdownMenuShortcut><Eye /></DropdownMenuShortcut>
                              </DropdownMenuCheckboxItem>
                            </button>
                          </FormControl>
                        </FormItem>
                      )}
                    >
                    </FormField>
                  </form>
                </Form>

                <DeleteButton mapId={map.id} map_generated_name={map.image_generated_name} />

              </DropdownMenuContent>
            </DropdownMenu>
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
