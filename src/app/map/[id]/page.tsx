import { notFound } from "next/navigation"
import { api } from "@/trpc/server"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import NavbarWrapper from "@/components/NavbarWrapper"
import MainWrapper from "@/components/MainWrapper"
import ImageContainer from "@/components/ImageContainer"


interface PageProps {
  params: { id: string }
}

export default async function MapPage({ params }: PageProps) {
  const mapId = Number(params.id)
  const map = await api.map.getOneMap(mapId)
  if (!map) return notFound()


  return (
    <>
      <NavbarWrapper>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Indrio
          </Button>
        </Link>
      </NavbarWrapper>
      <MainWrapper>
        <div className="w-full flex flex-col items-start justify-start gap-2 mb-4">
          <h1>{map.name}</h1>
          <p className="text-neutral-300">{map.description}</p>
        </div>
        <ImageContainer map={map} />
      </MainWrapper>
    </>
  )
}

