"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useContributionStore } from "@/stores/contribution/contribution.store";

const Balance = () => {
  const { contribution } = useContributionStore();

  return (
    <>
      {contribution?.payment.status !== "CANCELED" && (
        <div
          id="card-container"
          className="rounded-2xl border-[5px] border-solid border-white text-white lg:p-6"
        >
          <h2 className="py-3 text-center text-3xl font-bold">Balance</h2>
          <section id="balances" className="grid grid-cols-5 gap-0 ">
            <section id="labels" className="col-span-3 flex flex-col space-y-7">
              <label className="text-xl font-bold">Ganancia</label>
              <Separator />

              <label className="pt-2 font-light">Inversión</label>
              <Separator />

              <label className="font-light">
                Rendimiento ({contribution?.project.rate}% anual)
              </label>
            </section>
            <section id="values" className="col-span-2 flex flex-col space-y-7">
              <label
                placeholder="0.00"
                className="h-fit w-full rounded-xl border-none px-4 text-base font-bold lg:text-xl"
              >
                {contribution != undefined &&
                contribution.project.rate != undefined
                  ? `${(
                      ((parseFloat(contribution?.project.rate) *
                        contribution?.amount) /
                        100) *
                        contribution.qtyPortions +
                      contribution?.amount
                    ) // TODO: Calcular el tiempo de la inversión, y confirma que el rendimiento se calcula correctamente (si es por porción o por año)
                      .toLocaleString("en-BO", {
                        style: "currency",
                        currency: "BOB",
                      })}`
                  : "undefined"}
              </label>
              <Separator />
              <input
                type="text"
                value={contribution?.amount.toLocaleString("en-BO", {
                  style: "currency",
                  currency: "BOB",
                })}
                className="mb-0 h-fit w-full rounded-xl border-none bg-transparent px-4 pb-0 text-base font-light"
                disabled
              />
              <Separator />

              <label
                placeholder="0.00"
                className="h-fit w-full rounded-xl border-none bg-transparent px-4 text-base font-light"
              >
                {contribution != undefined &&
                  contribution.project.rate != undefined &&
                  `${(
                    (parseFloat(contribution?.project.rate) *
                      contribution?.amount) /
                    100
                  ).toLocaleString("en-BO", {
                    style: "currency",
                    currency: "BOB",
                  })}`}
              </label>
            </section>
          </section>
        </div>
      )}
    </>
  );
};

export default Balance;
