// app/map/[id]/page.tsx
import { notFound } from "next/navigation"
import { api } from "@/trpc/server"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import MainWrapper from "@/components/MainWrapper"
import ImageContainer from "@/components/ImageContainer"

type Props = {
  params: {
    id: string
  }
}

export default async function MapPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const mapId = Number(id)
  if (isNaN(mapId)) return notFound()

  const map = await api.map.getOneMap(mapId)
  if (!map) return notFound()

  return (
    <>
      <nav className="fixed flex flex-row justify-between top-0 left-0 w-full h-fit p-2">
        <Link href="/">
          <Button size={"sm"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Indrio
          </Button>
        </Link>
        <h2>{map.name}</h2>
      </nav>
      <MainWrapper className="md:pt-12! md:px-16! pb-0! h-screen">
        <p className="md:hidden text-lg font-semibold pb-4">Metti in full e ruota il dispositivo, vecio</p>
        <ImageContainer map={map} />
        <p className="md:hidden select-none text-background text-lg font-semibold pb-4">Metti in full e ruota il dispositivo, vecio</p>
      </MainWrapper>
    </>
  )
}
