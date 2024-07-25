import React from "react";

interface riskLevelProps {
  riskLevel: number;
}
// const getRiskLevelBadge = (riskLevel: number) => {
const RiskBadge: React.FC<riskLevelProps> = ({ riskLevel }) => {
  const riskLevels = [
    { label: "Alto", color: "bg-red-500" },
    { label: "Medio-Alto", color: "bg-orange-500" },
    { label: "Medio", color: "bg-yellow-500" },
    { label: "Medio-Bajo", color: "bg-green-500" },
    { label: "Bajo", color: "bg-blue-500" },
  ];

  for (const { label, color } of riskLevels) {
    if (riskLevel <= 20) {
      return (
        <div className={`rounded-full px-3 py-0 text-white ${color}`}>
          {label}
        </div>
      );
    }
    riskLevel -= 20;
  }

  return null; // Valor predeterminado si no se encuentra un nivel de riesgo válido
};
//   return (
//     <div>

//     </div>
//   );
// };

export default RiskBadge;
