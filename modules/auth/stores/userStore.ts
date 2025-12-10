import { create } from "zustand";

type CounterState = {
  count: number;
};

type CounterActions = {
  increment: () => void;
  decrement: () => void;
};

export type CounterStore = CounterState & CounterActions;

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
