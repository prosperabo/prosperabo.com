import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// const middlewareStore = (f: any) => devtools(persist(f, { name: "ref-store" }));

interface State {
  routeRef: string;
}
interface Actions {
  setRouteRef: (newRouteRef: string) => void;
}
const useRouterRefStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        routeRef: "",
        setRouteRef: (newRouteRef) => set(() => ({ routeRef: newRouteRef })),
      }),
      {
        name: "route-store",
      },
    ),
  ),
);

export { useRouterRefStore };

// export const useRouterRefStore = create<State & Actions>()(
//   middlewareStore((set) => ({
//     routeRef: "",
//     setRouteRef: (newRouteRef) => set(() => ({ routeRef: newRouteRef })),
//   })),
// );
