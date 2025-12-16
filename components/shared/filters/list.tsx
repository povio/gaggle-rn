import { ChevronRight } from "lucide-react-native";
import { type ReactElement, cloneElement } from "react";
import type { SvgProps } from "react-native-svg";
import { z } from "zod";

import BlankCalendarIcon from "@/assets/icons/BlankCalendarIcon";
import BlankUserIcon from "@/assets/icons/BlankUserIcon";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import ClockIcon from "@/assets/icons/ClockIcon";
import DollarSignIcon from "@/assets/icons/DollarSignIcon";
import FullCalendarIcon from "@/assets/icons/FullCalendarIcon";
import StarIcon from "@/assets/icons/StarIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import Text from "@/components/text/Text";

export const SearchFiltersEnum = z.enum([
  "child-age",
  "dayOfWeek",
  "price",
  "rating",
  "startTime",
  "endTime",
  "startDate",
  "endDate",
]);
export type SearchFilters = z.infer<typeof SearchFiltersEnum>;

export const FilterTypeEnum = z.enum(["pills", "rating", "dateTime"]);
export type FilterType = z.infer<typeof FilterTypeEnum>;

interface FilterItem {
  label: string;
  id: SearchFilters;
  type: FilterType;
  icon?: ReactElement<SvgProps>;
}

export const FilterList: FilterItem[] = [
  {
    label: "Child Age",
    id: "child-age",
    type: "pills",
    icon: <BlankUserIcon />,
  },
  {
    label: "Day of Week",
    id: "dayOfWeek",
    type: "pills",
    icon: <FullCalendarIcon />,
  },
  {
    label: "Price",
    id: "price",
    type: "pills",
    icon: <DollarSignIcon />,
  },
  {
    label: "Rating",
    id: "rating",
    type: "rating",
    icon: <StarIcon color={"#B1B1B1"} />,
  },
  {
    label: "Start Time",
    id: "startTime",
    type: "dateTime",
    icon: <ClockIcon />,
  },
  {
    label: "End Time",
    id: "endTime",
    type: "dateTime",
    icon: <ClockIcon />,
  },
  {
    label: "Start Date",
    id: "startDate",
    type: "dateTime",
    icon: <CalendarIcon />,
  },
  {
    label: "End Date",
    id: "endDate",
    type: "dateTime",
    icon: <CalendarIcon />,
  },
];

interface FilterBuilderProps {
  list: SearchFilters[];
}

export const FilterBuilder = ({ list }: FilterBuilderProps) => {
  const filters = FilterList.filter((filter) => list.includes(filter.id));

  return (
    <Box
      flexDirection={"column"}
      gap="4"
    >
      {filters.map((filter) => {
        return (
          <Box
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              flexDirection={"row"}
              gap="2"
            >
              {filter.icon && (
                <Box
                  width={20}
                  height={20}
                >
                  {cloneElement(filter.icon)}
                </Box>
              )}
              <Text variant="variant-11">{filter.label}</Text>
            </Box>
            <Box
              flexDirection={"row"}
              gap={"2"}
              alignItems={"center"}
            >
              <Text
                variant="variant-11"
                color={"text-disabled"}
              >
                Any
              </Text>
              <Box
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <IconButton
                  icon={<ChevronRight />}
                  onPress={() => {}}
                  size="xs"
                  variant="transparent"
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
