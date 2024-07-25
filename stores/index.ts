import { useOTPStore } from "@/stores/otp/otp.store";
import { useUserStore } from "@/stores/auth/user/user.store";
// NOTE: add new access importing -> from "@/stores/index"
export * from "./auth/session.store";

export const resetAllStores = () => {
  // NOTE: add new access resetting -> useNewStore.reset();
  const userStoreReset = useUserStore.getState().reset;
  const OTPStoreReset = useOTPStore.getState().reset;

  // NOTE: Execute reset functions
  userStoreReset();
  OTPStoreReset();
};
