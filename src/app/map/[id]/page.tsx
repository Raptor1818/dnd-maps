import { notFound } from "next/navigation"
import { api } from "@/trpc/server"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import MainWrapper from "@/components/MainWrapper"
import ImageContainer from "@/components/ImageContainer"

export default async function MapPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mapId = Number(id)
  if (isNaN(mapId)) return notFound()

  const map = await api.map.getOneMap(mapId)
  if (!map) return notFound()

  return (
    <>
      <nav className="fixed flex flex-row justify-between top-0 left-0 w-full h-fit p-2 z-50">
        <Link href="/">
          <Button size={"sm"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Indrio
          </Button>
        </Link>
        <h2>{map.name}</h2>
      </nav>
      <ImageContainer map={map} />
    </>
  )
}
