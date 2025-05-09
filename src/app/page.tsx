import { auth } from "@/server/auth";
import HomeNavbar from "@/components/HomeNavbar";
import MapGrid from "@/components/MapGrid";
import ClientMapProvider from "@/providers/ClientMapProvider";
import MainWrapper from "@/components/MainWrapper";

export default async function Home() {
  const session = await auth();

  const isDM = session?.user.email === process.env.DM_ID;

  return (
    <ClientMapProvider includeInvisible={isDM}>
      <HomeNavbar isDM={isDM} />
      <MainWrapper>
        <MapGrid isDM={isDM} />
      </MainWrapper>
    </ClientMapProvider>
  );
}
