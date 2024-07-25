"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/shared/utils/StatusBadge";
import { ContributionByInvestorResponse } from "@/lib/definitions";
import { useContributionStore } from "@/stores/contribution/contribution.store";
import { MousePointer2 } from "lucide-react";

interface Props {
  contributions: ContributionByInvestorResponse[];
}

const DataTable: React.FC<Props> = ({ contributions }) => {
  const { setContribution, contribution } = useContributionStore();
  return (
    <div
      id="data-table"
      className="rounded-2xl border-[5px] border-white p-6 text-white"
    >
      <h2 className="py-3 text-center text-3xl font-bold">
        Campañas en las que has invertido
      </h2>
      <Table className="text-white">
        <TableCaption className="text-xl">
          {contributions.length > 0
            ? "Lista de sus inversiones recientes"
            : "No hay inversiones para mostrar, comience a invertir"}
          .
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-muted/70">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead> Campaña </TableHead>
            <TableHead> Empresa </TableHead>
            <TableHead> Estado </TableHead>
            <TableHead> SocioCredits Adquiridos </TableHead>
            <TableHead className="text-right"> Monto </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributions.map((row) => (
            <TableRow
              key={row.id}
              onClick={setContribution.bind(null, row)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">PY-00{row.id}</TableCell>
              <TableCell className="font-medium">{row.project.title}</TableCell>
              <TableCell>
                {row.project.Company?.name || "COMPANY NOT REGISTER"}
              </TableCell>
              <TableCell className="w-[140px] justify-center text-center">
                <StatusBadge status={parseInt(row.project.status)} />
              </TableCell>
              <TableCell className="justify-center text-center ">
                {row.qtyPortions}
              </TableCell>
              <TableCell className="text-right">
                {/* {row.amount } */}
                {row.amount.toLocaleString("en-BO", {
                  style: "currency",
                  currency: "BOB",
                })}
                {/* {row.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                }) */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* {contribution && ( */}
          <TableRow className="bg-slate-700 text-white hover:bg-slate-700/80 data-[state=selected]:bg-slate-700/80">
            <TableCell colSpan={5}>
              {contributions.length > 0
                ? "Seleccione la inversión de la lista para ver más detalles..."
                : ""}
            </TableCell>
            <TableCell>
              <MousePointer2 />
            </TableCell>
          </TableRow>
          {/* )} */}
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
