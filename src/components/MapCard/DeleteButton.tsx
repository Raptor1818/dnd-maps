import React from 'react'
import { DropdownMenuItem, DropdownMenuShortcut } from '../ui/dropdown-menu'
import { Trash } from 'lucide-react'
import { api } from "@/trpc/react";

interface Props {
  mapId: number
}

const DeleteButton = ({ mapId }: Props) => {
  const { mutateAsync: deleteMap } = api.map.deleteMap.useMutation();
  return (
    <DropdownMenuItem
      className='bg-destructive hover:bg-destructive/80 active:bg-destructive/60'
      onClick={() => { deleteMap({ id: mapId }) }}
    >
      Elimina
      <DropdownMenuShortcut><Trash /></DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}

export default DeleteButton