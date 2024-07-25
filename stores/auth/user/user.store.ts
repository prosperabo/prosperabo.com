import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  id?: number;
  email?: string | null;
  name?: string | null;
  companyId?: number | null;
  password?: string | null;
  emailVerified?: boolean | null;
  image?: string | null;
  profile?: string | null;
  role?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string;
};

// SCOPE: STORE
interface State {
  user: User | null;
  profileExist: boolean;
}
interface Actions {
  setUser: (user: User) => void;
  setProfileExist: (profileExist: boolean) => void;
  reset: () => void;
}

const useUserStore = create<State & Actions>()(
  devtools(
    // TODO: Eval persist
    persist(
      (set) => ({
        user: null,
        profileExist: false,
        setUser: (user) => set({ user: user }),
        setProfileExist: (newProfileExist: boolean) =>
          set({ profileExist: newProfileExist }),
        reset() {
          set({ user: null });
          set({ profileExist: false });
        },
      }),
      { name: "user-store" },
    ),
  ),
);

export { useUserStore };
