import { Header } from "@/components/Sections/headers/Header";
import { HeaderAdmin } from "@/components/Sections/headers/HeaderAdmin";
import { BackOfficeNav } from "@/components/Sections/nav/BackOfficeNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      <HeaderAdmin />

      {/* <section className="flex justify-end"></section> */}
      {children}
    </>
  );
}
