"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FinancialStatementProps {
  url: string | null;
}

const FinancialStatement: React.FC<FinancialStatementProps> = ({ url }) => {
  const replaceOrigin: string | RegExp =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://www.services.prosperabo.com/api/v1";
  return (
    <Dialog>
      <DialogTrigger className="w-fit grow justify-center rounded-2xl border-4 border-solid border-white px-5 py-4 text-center max-md:px-5">
        Extracto Financiero
      </DialogTrigger>
      <DialogContent className="h-screen bg-slate-200 bg-gradient-to-bl from-teal-800 from-0% via-slate-950 via-100% to-accent to-90% sm:max-w-[425px] lg:max-w-full">
        <DialogHeader>
          <DialogTitle className="text-white">Extracto Financiero</DialogTitle>
          <DialogDescription>...</DialogDescription>
        </DialogHeader>
        <section className="flex h-screen items-center justify-center">
          <iframe
            suppressHydrationWarning={true}
            src={
              url
                ? url?.replace(
                    replaceOrigin,
                    `/api/proxy/${process.env.NEXT_PUBLIC_API_VERSION}`,
                  )
                : "/TestPDFfile.pdf"
            }
            height="100%"
            width="80%"
            aria-controls="Extracto Financiero"
            title="Extracto Financiero"
            className="h-screen border-0"
          ></iframe>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialStatement;
