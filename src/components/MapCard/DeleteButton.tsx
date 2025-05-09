import React, { useState } from 'react'
import { Loader2, Trash } from 'lucide-react'
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
import { useMapContext } from '@/context/MapContext';


interface Props {
  mapId: number
  map_generated_name: string
}

const DeleteButton = ({ mapId, map_generated_name }: Props) => {
  const { mutateAsync: deleteMap } = api.map.deleteMap.useMutation();

  const [isBeingDeleted, setIsBeingDeleted] = useState(false);

  const { refetch } = useMapContext();

  const handleDeletion = async () => {
    try {
      setIsBeingDeleted(true)
      await deleteMap({ id: mapId })
      deleteMapImage(map_generated_name)
    } catch (e) {
      console.error(e)
      setIsBeingDeleted(false)
      if (e instanceof Error) {
        alert(e.message)
      }
    } finally {
      setIsBeingDeleted(false)
      refetch()
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          disabled={isBeingDeleted}
        >
          {isBeingDeleted ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash />}
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
            onClick={async () => { await handleDeletion() }}
          >
            Si ah
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton