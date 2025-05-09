import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Mappa",
  description: "Mappe dei Guardiani Reali",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}
