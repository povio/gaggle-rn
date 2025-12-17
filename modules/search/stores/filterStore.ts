import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import { z } from "zod";
import { create } from "zustand";

import AlarmClockIcon from "@/assets/icons/AlarmClockIcon";
import BlankCalendarIcon from "@/assets/icons/BlankCalendarIcon";
import BlankUserIcon from "@/assets/icons/BlankUserIcon";
import BusIcon from "@/assets/icons/BusIcon";
import ClockIcon from "@/assets/icons/ClockIcon";
import DollarSignIcon from "@/assets/icons/DollarSignIcon";
import FullCalendarIcon from "@/assets/icons/FullCalendarIcon";
import StarAltIcon from "@/assets/icons/StarAltIcon";
import TicketIcon from "@/assets/icons/TicketIcon";
import { DateUtils } from "@/utils/date.utils";

// Schemas
export const SearchFiltersEnum = z.enum([
  "child-age",
  "dayOfWeek",
  "price",
  "rating",
  "startTime",
  "endTime",
  "startDate",
  "endDate",
  "duration",
  "toggleTester",
  "embeded-toggle",
]);
export type SearchFilters = z.infer<typeof SearchFiltersEnum>;

export const FilterTypeEnum = z.enum(["pills", "date", "slider", "time", "checkbox", "toggle", "embeded-toggle"]);
export type FilterType = z.infer<typeof FilterTypeEnum>;

export const UnitPositionEnum = z.enum(["left", "right"]);
export type UnitPosition = z.infer<typeof UnitPositionEnum>;
export interface MinMaxFilter {
  min: number;
  max: number;
}

export interface Boxes {
  id: string;
  label: string;
}

export interface FilterItem {
  label: string;
  id: SearchFilters;
  type: FilterType;
  iconComponent?: ComponentType<SvgProps>;
  values?: any | MinMaxFilter | string[] | Date | Boxes;
  helperText?: string;
  unitPosition?: UnitPosition;
  unit?: string;
}

// testing purposes
export const FilterList: FilterItem[] = [
  {
    label: "Child Age",
    id: "child-age",
    type: "pills",
    values: ["Age 1", "Age 2", "Grade 3rd", "Grade 4th"],
    iconComponent: BlankUserIcon,
  },
  {
    label: "Day of Week",
    id: "dayOfWeek",
    type: "pills",
    helperText: "Weeks",
    values: DateUtils.getDaysOfWeek(),
    iconComponent: FullCalendarIcon,
  },
  {
    label: "Duration",
    id: "duration",
    type: "pills",
    helperText: "Hours",
    unit: "h",
    unitPosition: UnitPositionEnum.enum.right,
    values: ["1", "2", "3", "4", "5", "6", "7", "8"],
    iconComponent: AlarmClockIcon,
  },
  {
    label: "Embeded toggle Test",
    id: "embeded-toggle",
    type: "embeded-toggle",
    values: [
      {
        label: "Embeded toggle test",
        id: "embeded-toggle-test",
      },
    ],
    iconComponent: TicketIcon,
  },
  {
    label: "Price",
    id: "price",
    unit: "$",
    unitPosition: UnitPositionEnum.enum.left,
    type: "slider",
    values: {
      min: 0,
      max: 5000,
    },
    iconComponent: DollarSignIcon,
  },
  {
    label: "Rating",
    id: "rating",
    type: "checkbox",
    values: [
      {
        label: "5",
        id: "5",
      },
      {
        label: "4",
        id: "4",
      },
      {
        label: "3",
        id: "3",
      },
      {
        label: "2",
        id: "2",
      },
      {
        label: "1",
        id: "",
      },
    ],
    iconComponent: StarAltIcon,
  },
  {
    label: "Toggle Test",
    id: "toggleTester",
    type: "toggle",
    values: [
      {
        label: "Value 1",
        id: "abc",
      },
      {
        label: "Lorem ipsum",
        id: "123",
      },
    ],
    iconComponent: BusIcon,
  },
  {
    label: "Start Time",
    id: "startTime",
    type: "time",
    iconComponent: ClockIcon,
  },
  {
    label: "End Time",
    id: "endTime",
    type: "time",
    iconComponent: ClockIcon,
  },
  {
    label: "Start Date",
    id: "startDate",
    type: "date",
    iconComponent: BlankCalendarIcon,
  },
  {
    label: "End Date",
    id: "endDate",
    type: "date",
    iconComponent: BlankCalendarIcon,
  },
];

// Filter values can be string, number, string array, boolean, or null
export type FilterValue = string | number | boolean | null | Date | string[];

// Filter state type
export type FilterValues = Partial<Record<SearchFilters, FilterValue>>;

interface FilterState {
  filters: FilterValues;
}

interface FilterActions {
  setFilter: (filterId: SearchFilters, value: FilterValue) => void;
  toggleCheckboxValue: (filterId: SearchFilters, value: string) => void;
  clearFilter: (filterId: SearchFilters) => void;
  clearAllFilters: () => void;
  getSelectedFilters: (filterId?: SearchFilters) => FilterValues | FilterValue | undefined;
}

const createInitialState = (): FilterState => ({
  filters: {},
});

export const useFilterStore = create<FilterState & FilterActions>((set, get) => ({
  ...createInitialState(),
  setFilter: (filterId: SearchFilters, value: FilterValue) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterId]: value,
      },
    }));
  },
  toggleCheckboxValue: (filterId: SearchFilters, value: string) => {
    set((state) => {
      const currentValue = state.filters[filterId];
      let newValue: string[];

      if (Array.isArray(currentValue)) {
        // If value exists in array, remove it; otherwise add it
        if (currentValue.includes(value)) {
          newValue = currentValue.filter((v) => v !== value);
        } else {
          newValue = [...currentValue, value];
        }
      } else {
        // If not an array, create a new array with this value
        newValue = [value];
      }

      // If array is empty, remove the filter
      if (newValue.length === 0) {
        const { [filterId]: _, ...rest } = state.filters;
        return { filters: rest };
      }

      return {
        filters: {
          ...state.filters,
          [filterId]: newValue,
        },
      };
    });
  },
  clearFilter: (filterId: SearchFilters) => {
    set((state) => {
      const { [filterId]: _, ...rest } = state.filters;
      return { filters: rest };
    });
  },
  clearAllFilters: () => {
    set({ filters: {} });
  },
  getSelectedFilters: (filterId?: SearchFilters) => {
    const filters = get().filters;
    if (filterId !== undefined) {
      return filters[filterId];
    }
    return filters;
  },
}));
