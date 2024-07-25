import { create } from "zustand";

type userSession = {
  name: string;
  image: string;
  email: string;
  email_verified?: boolean; // NOTE: because jwtDecode not return all properties
  uid?: string;
  provider?: string;
};

interface State {
  // tokens: AuthTokens;
  user: userSession;
}
interface Actions {
  // tokens: AuthTokens;
  setUserSession: (user: userSession) => void;
}
export const useSessionStore = create<State & Actions>()((set) => ({
  user: {
    name: "",
    email: "",
    image: "",
    provider: "",
    uid: "",
    email_verified: false,
  },
  setUserSession: (user: userSession) =>
    set((state) => ({
      user,
    })),
}));
