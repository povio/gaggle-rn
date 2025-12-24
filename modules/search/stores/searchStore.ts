import { create } from "zustand";

export enum FilterId {
  ALL = "all",
  CAMPS = "camps",
  SPORTS = "sports",
  CLASSES = "classes",
  PARTY = "party",
  PHOTOGRAPHY = "photography",
}

interface SearchState {
  filter: FilterId;
}

interface SearchActions {
  setFilter: (filter: FilterId) => void;
}

const createInitialState = (): SearchState => ({
  filter: FilterId.ALL,
});

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  ...createInitialState(),
  setFilter: (filter: FilterId) => {
    set({ filter });
  },
}));
