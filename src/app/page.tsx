import { auth } from "@/server/auth";
import Navbar from "./components/Navbar/Navbar";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Navbar session={session} />
    </div>
  )
}