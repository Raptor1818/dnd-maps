import { auth } from "@/server/auth";
import Navbar from "./components/Navbar";
import MapGrid from "./components/MapGrid";

export default async function Home() {
  const session = await auth();

  const isDM = session?.user.id === process.env.DM_ID;

  return (
    <>
      <Navbar session={session} isDM={isDM} />
      <main className="w-full h-full flex flex-col justify-center items-center pt-18 md:pt-22 pb-8 px-4 md:px-8 overflow-scroll">
        <MapGrid isDM={isDM} />
      </main>
    </>
  );
}
