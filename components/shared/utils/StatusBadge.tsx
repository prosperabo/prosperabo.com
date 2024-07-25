import { paymentStatus, projectStatus } from "data/status";

interface StatusListType {
  [key: number]: {
    label: string;
    color: string;
  };
}
interface statusProps {
  status: number;
  type?: number; // load from data/status.ts
}
const StatusBadge: React.FC<statusProps> = ({ status, type = 0 }) => {
  const options1 = {
    0: projectStatus,
    1: paymentStatus, // TODO: ADAPT tO PAYMENT STATUS type string
  };

  const statusList: StatusListType = options1[type as keyof typeof options1];
  // console.log("statusList", statusList);

  const { label, color } = statusList[status] || { label: "", color: "" };

  return (
    <div className={`rounded-full px-2 py-1 text-white ${color}`}>{label}</div>
  );
};

export default StatusBadge;
