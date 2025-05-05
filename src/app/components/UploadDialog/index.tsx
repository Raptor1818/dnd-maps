import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { MapUploadForm } from '../MapUploadForm'
import { Plus } from 'lucide-react'

type Props = {}

const UploadDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Aggiungi Mappa</DialogTitle>
        <MapUploadForm />
      </DialogContent>
    </Dialog>

  )
}

export default UploadDialog