interface StatusListType {
  [key: number]: {
    label: string;
    color: string;
  };
}
const projectStatus: StatusListType = {
  0: { label: "Inicial", color: "bg-gray-500" },
  1: { label: "En Progreso", color: "bg-accent" },
  2: { label: "Finalizado", color: "bg-red-500" },
  3: { label: "Revision", color: "bg-amber-500" },
  4: { label: "Cerrada", color: "bg-green-500" },
};
const paymentStatus: StatusListType = {
  0: { label: "PENDING", color: "bg-amber-500" },
  1: { label: "En Progreso", color: "bg-teal-500" },
  2: { label: "Finalizado", color: "bg-red-500" },
  3: { label: "Revision", color: "bg-amber-500" },
  4: { label: "Cerrada", color: "bg-green-500" },
};

export { projectStatus, paymentStatus };
