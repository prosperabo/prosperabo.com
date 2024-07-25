"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";

interface Props {
  rate: number;
}

const InvestmentSimulator = ({ rate }: Props) => {
  const [amount, setAmount] = useState(0);
  const [months, setMonths] = useState(0);
  const [total, setTotal] = useState(0);

  function calculateResult(): void {
    // event: React.ButtonHTMLAttributes<HTMLButtonElement>,
    // const total = amount * Math.pow(1 + rate / 100, months);
    if (isNaN(amount) || amount === 0) {
      toast({
        title: "El monto es Inválido",
        description: "El monto debe ser un valor válido diferente de 0",
        variant: "destructive",
      });
      return;
    }
    if (isNaN(months) || months === 0) {
      toast({
        title: "La Duración es Inválida",
        description: "La duración debe ser un valor válido diferente de 0",
        variant: "destructive",
      });
      return;
    }
    const total = ((amount * (rate / 100)) / 12) * months;
    setTotal(total);
    toast({
      title: "Satisfactorio!",
      description:
        "Simulacíon exitosa, el ganancia aproximada es: Bs. " +
        total.toFixed(2),
      variant: "success",
    });
  }
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(value);
    setTotal(0);
  };
  const handleChangeMonths = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMonths(value);
    setTotal(0);
  };

  return (
    <div className="mt-6 flex flex-col gap-4 text-white max-md:mr-2.5 max-md:mt-0 lg:pl-20 lg:pr-20">
      <p className="text-center py-3">
        <h2 className="text-2xl font-bold my-3">Simula tu inversión</h2>
        ¡Bienvenido al simulador de inversión! Aquí podrás calcular el valor
        futuro de tu inversión en función de la tasa de interés anual {rate}(%)
        y el período de inversión. ¡Comencemos!
      </p>
      {/* INPUT DEL MONTO de inversion inicial */}
      <span> 1. Monto de inversión: </span>
      <input
        className="h-full w-full rounded-xl bg-white px-4 text-base text-slate-950 placeholder:text-slate-400"
        type="number"
        placeholder="Ingresa el monto de inversión"
        value={amount}
        onChange={handleChangeAmount}
        // onChange={(e) => setAmount(parseInt(e.target.value))}
        min={100}
      />
      <span> 2. Duración (meses): </span>
      <input
        className="h-full w-full rounded-xl bg-white px-4 text-base text-slate-950 placeholder:text-slate-400"
        type="number"
        placeholder="10 meses"
        onChange={handleChangeMonths}
        // onChange={(e) => setMonths(parseInt(e.target.value))}
        value={months}
        min={1}
      />
      {amount > 0 && months > 0 && total > 0 && (
        <section
          id="result-simulation"
          className="rounded-xl border-x-4 border-r-4 border-t-2 border-x-accent border-t-accent bg-white p-4 text-sm font-medium text-slate-950"
        >
          Ganarás aproximadamente Bs {total.toFixed(2)} invirtiendo Bs {amount}{" "}
          a una tasa de interés anual del {rate}% durante {months} meses.
          Finalizando el proyecto recibirás un total de Bs{" "}
          {(total + amount).toFixed(2)}
        </section>
      )}
      <Button variant={"custom"} onClick={calculateResult}>
        Simular Ganancia
      </Button>
    </div>
  );
};

export default InvestmentSimulator;
