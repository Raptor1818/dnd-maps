import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { MapUploadForm } from '../MapUploadForm'
import { Plus } from 'lucide-react'

interface Props { }

const UploadDialog = (_props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Aggiungi Mappa</DialogTitle>
        <MapUploadForm />
      </DialogContent>
    </Dialog>

  )
}

export default UploadDialog