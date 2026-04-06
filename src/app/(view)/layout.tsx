import BG from "@/components/core/bg";
import Navbar from "@/components/core/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative h-dvh w-dvw bg-background flex flex-col">
      <BG />
      <section className="relative z-10 flex-1 w-dvw overflow-y-auto flex flex-col p-4 sm:p-6 lg:h-dvh lg:overflow-y-hidden">
        <Navbar />

        {children}
      </section>
    </main>
  );
}
