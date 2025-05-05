import { auth } from "@/server/auth";
import Navbar from "./components/Navbar/Navbar";
import MapCard from "./components/MapCard/MapCard";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />
      <main className="pt-18 md:pt-22 pb-8 px-4 md:px-8 gap-4 grid grid-cols-1 md:grid-cols-3 overflow-scroll">
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
        <MapCard></MapCard>
      </main>
    </>
  )
}