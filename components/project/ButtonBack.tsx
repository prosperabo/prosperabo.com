"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
function ButtonBack() {
  const pathname = usePathname();
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div>
      {/* TODO: NEXT convert to component ... handleGoBack*/}
      <Link
        href={pathname.startsWith("/project/") ? "/#projects" : "/"}
        onClick={handleGoBack}
      >
        <button className="my-4 mr-5 justify-center self-end rounded-[48px] border-[3px] border-solid border-white px-10 py-3 text-xl font-extrabold text-white sm:mr-2.5 sm:mt-10 md:mr-5 md:mt-0 lg:mr-10 2xl:mt-6 2xl:py-4">
          Regresar
        </button>
      </Link>
    </div>
  );
}

export default ButtonBack;
