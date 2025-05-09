import React from 'react'
import { DropdownMenuItem, DropdownMenuShortcut } from '../ui/dropdown-menu'
import { Trash } from 'lucide-react'
import { api } from "@/trpc/react";
import { deleteMapImage } from '@/utils/supabaseHandler';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button';


interface Props {
  mapId: number
  map_generated_name: string
}

const DeleteButton = ({ mapId, map_generated_name }: Props) => {
  const { mutateAsync: deleteMap } = api.map.deleteMap.useMutation();

  // non va magari togli il dropdown e metti le icone

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ma te son fora?</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare questa mappa?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No dei</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteMap({ id: mapId })
              deleteMapImage(map_generated_name)
            }}
          >Si ah</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton