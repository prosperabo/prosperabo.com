"use client";
import React from "react";
import { useRouterRefStore } from "@/stores/route-ref/routeref.store";
import { useUserStore } from "@/stores/auth/user/user.store";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { fetchVerifySignContract } from "@/lib/data/profile";

const ImInvestor = () => {
  const { setRouteRef } = useRouterRefStore();
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();
  const { user, setProfileExist } = useUserStore();

  async function handleInvest(event: React.FormEvent<HTMLDivElement>) {
    // SCOPE: CHECK IF USER IS LOGGED IN
    if (user === null) {
      toast({
        title: "Debes iniciar sesión",
        description: "Debes iniciar sesión para poder invertir",
        variant: "default",
      });
      setTimeout(() => {
        setRouteRef(`${pathname}#banner-investor-company`);
        router.push("/api/auth/signin");
      }, 2000);
      return null;
    }
    // SCOPE: CHECK IF USER HAS COMPLETED PROFILE
    if (user.id !== undefined && user.id !== null) {
      const verifiedContrat = await fetchVerifySignContract(user.id);
      if (verifiedContrat === null) {
        setRouteRef(`${pathname}#banner-investor-company`);
        router.push("/profile");
      } else if (
        verifiedContrat?.contractSigningDate !== null &&
        verifiedContrat?.commercialContract !== null
      ) {
        toast({
          title: "Usted ya tiene un contrato firmado, conozca las campañas",
          description: "Ahora puede continuar inviertiendo...",
          variant: "success",
        });
        setTimeout(() => {
          router.push(`${pathname}#projects`);
        }, 1000);
      } else {
        setProfileExist(true);
        toast({
          title: "Continúe completando el formulario",
          description: "Este paso es necesario para poder invertir",
          variant: "default",
        });
        return router.push("/profile/work");
      }
    }
  }

  return (
    <div
      className="col-span-2 w-full cursor-pointer bg-gradient-to-l from-black to-accent px-16 py-24 text-center align-middle font-light uppercase text-white md:text-2xl lg:text-4xl"
      onClick={handleInvest}
    >
      soy inversor
    </div>
  );
};

export default ImInvestor;
