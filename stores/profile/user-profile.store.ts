import { create } from "zustand";

interface UserProfile {
  id?: number;
  picture: string;
  bio: string | null; // NA
  birthdate: string | null; // Date | null
  civilStatus: string | null; // NA
  educationDegree: string | null;
  gender: string;
  frontIdDocumentFile: string;
  reverseIdDocumentFile: string;
  swornDeclaration: boolean | null;
  safetyNotices: boolean | null;
  commercialContract: boolean | null;
  contractSigningDate: Date | null;
  occupation: string | null;
  sector: string | null;
  mainActivity: string | null;
  address: string;
  sinceDate: string | null; // NA
  typerOfHousing: string | null; // NA
  amountRetailPay: string | null; // NA
  userId: number;
  createdAt: Date;
  updatedAt?: Date | string;
}
type Profile = {
  id?: number;
  bio?: string | null;
  userId: number;
  address?: string | null;
  // amountRetailPay?: Decimal | DecimalJsLike | number | string | null;
  birthdate?: Date | string | null;
  // civilStatus?: CivilStatus | null;
  educationDegree?: string | null;
  picture?: string | null;
  sinceDate?: Date | string | null;
  typerOfHousing?: string | null;
  commercialContract?: boolean | null;
  createdAt?: Date | string;
  frontIdDocumentFile?: string | null;
  // gender?: Gender | null;
  mainActivity?: string | null;
  occupation?: string | null;
  reverseIdDocumentFile?: string | null;
  safetyNotices?: boolean | null;
  sector?: string | null;
  swornDeclaration?: boolean | null;
  updatedAt?: Date | string;
};

// SCOPE: STORE
interface State {
  userProfile: UserProfile | null;
}
interface Actions {
  setUserProfile: (profile: UserProfile) => void;
}

const useUserProfileStore = create<State & Actions>((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
}));

export { useUserProfileStore };
