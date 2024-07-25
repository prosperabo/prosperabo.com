import { ContributionByInvestorResponse } from "@/lib/definitions";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  contribution: ContributionByInvestorResponse | undefined;
}
interface Actions {
  setContribution: (newContribution: ContributionByInvestorResponse) => void;
  reset: () => void;
}

// NOTE: () IS IMPORTANT for typescript
const useContributionStore = create<State & Actions>()(
  devtools(
    (set) => ({
      contribution: undefined,
      setContribution: (newContribution) =>
        set({ contribution: newContribution }),
      reset() {
        set({ contribution: undefined });
      },
    }),
    {
      name: "contribution-store",
    },
  ),
);

export { useContributionStore };
