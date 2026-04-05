import BG from "@/components/core/bg";
import Navbar from "@/components/core/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative min-h-dvh w-dvw bg-background">
      <BG />
      <section className="relative z-10 h-dvh w-dvw p-6 flex flex-col">
        <Navbar />

        {children}
      </section>
    </main>
  );
}
