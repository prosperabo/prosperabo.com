import { create } from "zustand";

interface State {
  otp: string;
}
interface Actions {
  setOTP: (newOTP: string) => void;
  reset: () => void;
}
export const useOTPStore = create<State & Actions>()((set) => ({
  otp: "",
  setOTP: (newOTP) => set(() => ({ otp: newOTP })),
  reset: () => set(() => ({ otp: "" })),
}));
