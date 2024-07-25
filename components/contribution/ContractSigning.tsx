"use client";
import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { fetchVerifySignContract } from "@/lib/data/profile";
import { useContributionStore } from "@/stores/contribution/contribution.store";
import { useUserStore } from "@/stores/auth/user/user.store";

const ContractSigning = () => {
  const { contribution } = useContributionStore();
  const [contractSigningDate, setContractSigningDate] = useState<
    Date | string | undefined
  >(undefined);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchContract = async (contributorId: number) => {
      try {
        console.log("se ejecuta.....");
        const verifiedContrat = await fetchVerifySignContract(contributorId);
        console.log("verifiedContrat", verifiedContrat);

        if (verifiedContrat === null) {
          toast({
            title: "Usted no tiene un contrato firmado",
            description: `Complete el formulario y realice la firma digital`,
            variant: "destructive",
          });
        }
        if (verifiedContrat?.contractSigningDate === null) {
          toast({
            title: "Usted no tiene un contrato firmado",
            description: `Complete el formulario y realice la firma digital`,
            variant: "destructive",
          });
        }
        setContractSigningDate(
          // verifiedContrat?.contractSigningDate?.toISOString()?.split("T")[0],
          verifiedContrat?.contractSigningDate?.toString(),
        );
      } catch (error) {
        toast({
          title: "Error al verificar el contrato",
          description: `${error}`,
          variant: "destructive",
        });
      }
    };

    if (user?.id) {
      fetchContract(user?.id);
    }
  }, [user]);

  const contractUrl = "/contrato-inversores.pdf";
  const contractDown = "/contrato-inversores.pdf";
  const handleOpenContract = () => {
    window.open(contractUrl, "_blank");
  };
  const handleDownloadContract = async () => {
    try {
      const response = await fetch(contractDown);
      const blob = await response.blob();
      FileSaver.saveAs(blob, "contrato.pdf");
    } catch (error) {
      toast({
        title: "Error al descargar el contrato",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div
      id="card-container"
      className="rounded-2xl border-[5px] border-solid border-white p-6 text-white"
    >
      <h2 className="py-3 text-center text-3xl font-bold">Firma de contrato</h2>
      <section
        id="prev-file"
        className="h-[100px] w-full min-w-min cursor-pointer rounded-2xl bg-white "
        onClick={handleOpenContract}
      >
        <div className="flex h-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2 h-8 w-8 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 006.75 21a2.25 2.25 0 003.182-3.182l10.94-10.94a2.25 2.25 0 000-3.182z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-500">Abrir contrato PDF</span>
        </div>
      </section>
      <section className="py-6 text-center">
        <Button
          variant={"outline"}
          size={"default"}
          onClick={handleDownloadContract}
        >
          Descargar Contrato
        </Button>
      </section>

      <section id="show-data-contract-sign">
        {contractSigningDate ? (
          <p>
            Usted firmó el contrato de Prospera el:{" "}
            {contractSigningDate?.toLocaleString()}
          </p>
        ) : (
          <p>Usted no tiene un contrato firmado</p>
        )}
      </section>
    </div>
  );
};

export default ContractSigning;
