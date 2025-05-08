import React from 'react'
import { DropdownMenuItem, DropdownMenuShortcut } from '../ui/dropdown-menu'
import { Trash } from 'lucide-react'
import { api } from "@/trpc/react";
import { deleteMapImage } from '@/utils/supabaseHandler';

interface Props {
  mapId: number
  map_generated_name: string
}

const DeleteButton = ({ mapId, map_generated_name }: Props) => {
  const { mutateAsync: deleteMap } = api.map.deleteMap.useMutation();

  return (
    <DropdownMenuItem
      className='bg-destructive hover:bg-destructive/80 active:bg-destructive/60'
      onClick={() => {
        deleteMap({ id: mapId })
        deleteMapImage(map_generated_name)
      }}
    >
      Elimina
      <DropdownMenuShortcut><Trash /></DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

export default DeleteButton