"use client";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SafetyNotices from "./SafetyNotices";
import { useUserStore } from "@/stores/auth/user/user.store";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouterRefStore } from "@/stores/route-ref/routeref.store";
import { fetchVerifySignContract } from "@/lib/data/profile";

interface CalculatorProps {
  priceUnit: number;
  qtyAvailable: number;
  projectId: number;
  children: React.ReactNode;
}

// const CalculatorBuy = () => {
const CalculatorBuy: React.FC<CalculatorProps> = ({
  priceUnit,
  qtyAvailable,
  projectId,
  children,
}) => {
  const [qtyPortions, setQtyPortions] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(qtyPortions * priceUnit);
  }, [qtyPortions, priceUnit]);

  const handleQtyPortionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = parseInt(e.target.value, 10);
    if (newQty > qtyAvailable) {
      setQtyPortions(qtyAvailable);
    } else if (newQty < 1) {
      e.target.value = "1"; // prevent deleting all digits
      setQtyPortions(1);
    } else {
      setQtyPortions(newQty);
    }
    calculateTotal();
  };

  const calculateTotal = () => {
    if (qtyPortions === 0) {
      setTotal(0);
    } else {
      setTotal(qtyPortions * priceUnit);
    }
  };
  const { data: session, status } = useSession();
  const { user, setUser, setProfileExist } = useUserStore();
  const router = useRouter();
  const { setRouteRef } = useRouterRefStore();
  const pathname = usePathname();

  const handleInvest = async () => {
    if (isNaN(total) || total === 0) {
      toast({
        title: "El total es Inválido",
        description: "El total debe ser un valor válido diferente de 0",
        variant: "destructive",
      });
      return;
    }
    // SCOPE: CHECK IF USER IS LOGGED IN
    if (user === null) {
      toast({
        title: "Debes iniciar sesión",
        description: "Debes iniciar sesión para poder invertir",
        variant: "default",
      });
      setTimeout(() => {
        setRouteRef(`${pathname}#calculator-investor`);
        router.push("/api/auth/signin");
      }, 2000);
      return null;
    }

    // SCOPE: CHECK IF USER HAS COMPLETED PROFILE
    if (user.id !== undefined && user.id !== null) {
      const verifiedContrat = await fetchVerifySignContract(user.id);
      if (verifiedContrat === null) {
        setRouteRef(`${pathname}#calculator-investor`);
        toast({
          title: "Ante de invertir debe completar su perfil",
          description: "Esta acción es necesaria para poder invertir",
          variant: "default",
        });
        router.push("/profile");
        return;
      } else if (
        verifiedContrat?.contractSigningDate !== null &&
        verifiedContrat?.commercialContract !== null
      ) {
        toast({
          title: "Puede continuar con la inversión",
          description: "Ahora puede continuar inviertiendo",
          variant: "default",
        });
      } else {
        setProfileExist(true);
        toast({
          title: "Continúe completando el formulario",
          description: "Este paso es necesario para poder invertir",
          variant: "default",
        });
        setRouteRef(`${pathname}#calculator-investor`);
        return router.push("/profile/work");
      }
    }
    console.log("Invertir...");
    setIsDialogOpen(true);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div id="calculator-investor">
      <h2 className="text-center text-xl font-bold text-white max-md:max-w-full sm:max-w-full sm:text-4xl md:max-w-full md:text-xl lg:text-2xl xl:text-3xl">
        Calculadora de SocioCredits
      </h2>
      <div className="flex w-full max-w-full flex-col gap-4 self-end px-5 max-md:mr-2.5 max-md:mt-0 lg:pl-20 lg:pr-20">
        <div className="rounded-2xl border-[7px] border-solid border-white px-9 pb-6 pt-7 max-md:mt-10 max-md:max-w-full max-md:px-5 sm:px-5 md:mt-14 md:max-w-full md:px-9 lg:mt-14 lg:max-w-full lg:px-9 xl:mt-14">
          <div className="flex gap-5 sm:flex-col sm:gap-0 md:flex-row md:gap-5 lg:flex-row lg:gap-5">
            <div className="flex w-[71%] flex-col sm:ml-0 sm:w-full md:ml-0 md:w-[71%] lg:ml-0 lg:w-[71%]">
              <div className="my-auto flex flex-col self-stretch text-lg md:text-2xl font-bold text-white max-md:mt-10">
                <h3>SocioCredits a adquirir</h3>
                <div className="mt-16 max-md:mt-10">Precio Unitario</div>
                <div className="mt-12 max-md:mt-10">Tu Costo Total</div>
              </div>
            </div>
            <div className="ml-5 flex w-[29%] flex-col max-md:ml-0 max-md:w-full">
              <div className="flex grow flex-col max-md:mt-10">
                <div className="h-[62px] shrink-0 rounded-xl border border-solid border-white bg-white">
                  <input
                    className="h-full w-full rounded-xl bg-white px-4 text-base text-slate-950 placeholder:text-slate-400"
                    type="number"
                    value={qtyPortions}
                    onChange={handleQtyPortionsChange}
                    max={qtyAvailable}
                    min={1}
                  />
                </div>
                <div className="mt-9 h-8 shrink-0 rounded-xl border border-solid border-white bg-white">
                  <input
                    type="number"
                    value={priceUnit}
                    className="h-full w-full rounded-xl bg-white px-4 text-base text-slate-950 placeholder:text-slate-400"
                    disabled
                  />
                </div>
                <div className="mt-8 h-8 shrink-0 rounded-xl border border-solid border-white bg-white">
                  <input
                    type="text"
                    disabled
                    className="h-full w-full rounded-xl bg-white px-4 text-base text-slate-950 placeholder:text-slate-400"
                    value={total}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          id="actions"
          className="my-5 flex gap-4 font-extrabold text-white sm:mt-10 sm:flex-wrap md:mt-16 md:flex-nowrap md:text-2xl lg:mt-16 lg:flex-nowrap"
        >
          {children}
          <button
            className="justify-center whitespace-nowrap rounded-2xl border-[3px] border-solid border-white px-4 py-5 sm:px-5 md:px-8 lg:px-8"
            onClick={handleInvest}
          >
            Invertir
          </button>
        </section>
      </div>

      {/* SCOPE: SHOW DIALOG CONFIRMATION */}
      {user?.id && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <DialogContent className="h-screen bg-slate-200 sm:max-w-[425px]"> */}
          <DialogContent className="h-screen bg-slate-200 bg-gradient-to-bl from-teal-800 from-0% via-slate-950 via-100% to-accent to-90% sm:max-w-[425px] lg:max-w-full">
            <DialogHeader>
              <DialogTitle className="text-white">
                Confirmar Inversión
              </DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas invertir Bs. {total} en
                SocioCredits?
              </DialogDescription>
            </DialogHeader>
            <SafetyNotices
              amount={total}
              projectId={projectId}
              qtyActionsBuy={qtyPortions}
              // userId={user.id}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalculatorBuy;
