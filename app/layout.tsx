import "./globals.css";
// import cx from "classnames";
import { inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

// REF.: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
// REF.: https://ui.shadcn.com/docs/installation/next
export const metadata = {
  title: "Crowdfunding Prospera",
  description:
    "Prospera es una plataforma de crowdfunding, arquitectos de un futuro financiero donde cada boliviano tiene la llave para desbloquear oportunidades ilimitadas. Conectamos inversores audaces y visionarios con el vibrante mundo de las startups y PYMES bolivianas llenas de potencial. Transformando el Panorama Financiero de Bolivia: Empoderando Innovación y Prosperidad para Todos",
  metadataBase: new URL("https://prosperabo.com"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("max-w-full bg-black font-sans ", inter.variable)}>
        <div className="fixed h-full w-screen max-w-full bg-gradient-to-br from-slate-900 via-black to-slate-900" />
        {/* <div className="fixed h-screen w-full bg-gradient-to-br from-teal-900 via-black to-teal-900" /> */}
        {/* <div className="fixed h-screen w-full bg-gradient-to-r from-teal-950 from-0% via-slate-950 via-30% to-teal-900 to-100%" /> */}
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-2">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
