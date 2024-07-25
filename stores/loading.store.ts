import { create } from "zustand";

interface LoadingState {
  [id: string]: boolean;
}
interface State {
  loadingStates: LoadingState;
}
interface Actions {
  setLoading: (id: string, newIsLoading: boolean) => void;
  isLoading: (id: string) => boolean;
}
const useLoadingStore = create<State & Actions>((set, get) => ({
  loadingStates: {},
  setLoading: (id: string, newIsLoading: boolean) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [id]: newIsLoading,
      },
    })),
  isLoading: (id: string) => get().loadingStates[id] || false,
}));

export default useLoadingStore;
