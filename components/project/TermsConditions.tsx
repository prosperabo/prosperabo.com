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
      <DialogTrigger className="mr-5 justify-center self-end rounded-[48px] border-[3px] border-solid border-white px-5 text-base font-extrabold sm:mr-2.5 sm:mt-10 md:mr-5 md:mt-0 lg:mr-5 2xl:mt-6 2xl:py-4">
        Términos y condiciones
      </DialogTrigger>
      <DialogContent className="h-screen bg-slate-200 bg-gradient-to-bl from-teal-800 from-0% via-slate-950 via-100% to-accent to-90% sm:max-w-[425px] lg:max-w-full">
        <DialogHeader>
          <DialogTitle className="text-white">
            Términos y condiciones
          </DialogTitle>
          <DialogDescription>...</DialogDescription>
        </DialogHeader>
        <section className="flex h-screen items-center justify-center">
          <iframe
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
            aria-controls="Términos y Condiciones"
            title="Términos y Condiciones"
            className="h-screen border-0"
          ></iframe>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialStatement;
