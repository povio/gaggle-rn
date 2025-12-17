import { ChevronRight } from "lucide-react-native";

import Box from "@/components/Box";
import Text from "@/components/text/Text";
import {
  type FilterItem,
  FilterList,
  type FilterType,
  FilterTypeEnum,
  type SearchFilters,
  UnitPosition,
  UnitPositionEnum,
  useFilterStore,
} from "@/modules/search/stores/filterStore";
import { DateUtils } from "@/utils/date.utils";

import { CheckboxFilter } from "./CheckboxFilter";
import { DateFilter } from "./DateFilter";
import { EmbededToggle } from "./EmbededToggle";
import { PillsFilter } from "./PillsFilter";
import { SliderFilter } from "./SliderFilter";
import { TimeFilter } from "./Timefilter";
import { ToggleFilter } from "./ToggleFilter";

interface FilterBuilderProps {
  list: SearchFilters[];
  onFilterSelect: (filterId: SearchFilters) => void;
  selectedFilter: SearchFilters | null;
  onBackToList?: () => void;
}

const FilterDetailView = ({ filter }: { filter: FilterItem }) => {
  return (
    <Box
      flexDirection="column"
      gap="1"
    >
      {filter.helperText && <Text variant="variant-8">{filter.helperText}</Text>}
      <Box paddingVertical="4">
        {filter.type === FilterTypeEnum.enum.pills && (
          <PillsFilter
            data={filter.values}
            filterId={filter.id}
          />
        )}
        {filter.type === FilterTypeEnum.enum.slider && (
          <SliderFilter
            data={filter.values}
            filterId={filter.id}
          />
        )}
        {filter.type === FilterTypeEnum.enum.checkbox && (
          <CheckboxFilter
            data={filter.values}
            filterId={filter.id}
          />
        )}
        {filter.type === FilterTypeEnum.enum.toggle && (
          <ToggleFilter
            data={filter.values}
            filterId={filter.id}
          />
        )}
        {filter.type === FilterTypeEnum.enum.date && <DateFilter filterId={filter.id} />}
        {filter.type === FilterTypeEnum.enum.time && <TimeFilter filterId={filter.id} />}
      </Box>
    </Box>
  );
};

export const FilterBuilder = ({ list, onFilterSelect, selectedFilter }: FilterBuilderProps) => {
  const filters = FilterList.filter((filter) => list.includes(filter.id));
  const selectedFilterData = FilterList.find((f) => f.id === selectedFilter);
  const { getSelectedFilters } = useFilterStore();
  const setFiltersData = getSelectedFilters();
  const setFiltersField = setFiltersData ? Object.keys(setFiltersData) : [];

  if (selectedFilterData) {
    return <FilterDetailView filter={selectedFilterData} />;
  }

  const getFilterValue = (filter: FilterItem): string => {
    const { id, type, unit, unitPosition } = filter;

    if (!setFiltersData) return "Any";

    if ((type === FilterTypeEnum.enum.date || type === FilterTypeEnum.enum.time) && setFiltersData) {
      return DateUtils.formatDate(setFiltersData[id] as Date, type === FilterTypeEnum.enum.time ? "HH:mm a" : "MMM d");
    }

    if (type === FilterTypeEnum.enum.checkbox && Array.isArray(setFiltersData[id])) {
      const values = setFiltersData[id] as string[];
      return values.length > 0 ? values.join(", ") : "Any";
    }

    if (type === FilterTypeEnum.enum.toggle && Array.isArray(setFiltersData[id])) {
      const values = setFiltersData[id] as string[];
      return values.length > 0 ? values.join(", ") : "Any";
    }

    if (unit) {
      return unitPosition === UnitPositionEnum.enum.left
        ? `${unit} ${setFiltersData[id] as string}`
        : `${setFiltersData[id] as string} ${unit}`;
    }

    return setFiltersData[id] as string;
  };

  return (
    <Box
      flexDirection={"column"}
      gap="5"
    >
      {filters.map((filter) => {
        const IconComponent = filter.iconComponent;

        // Handle embedded toggle inline (no navigation)
        if (filter.type === FilterTypeEnum.enum["embeded-toggle"]) {
          return <EmbededToggle filter={filter} />;
        }

        // Regular filter with navigation
        return (
          <Box
            key={filter.id}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            onTouchEnd={() => onFilterSelect(filter.id)}
            style={{ cursor: "pointer" }}
          >
            <Box
              flexDirection={"row"}
              gap="2"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {IconComponent && (
                <Box
                  width={18}
                  height={18}
                >
                  <IconComponent color={"#B1B1B1"} />
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
                {setFiltersField && setFiltersField.includes(filter.id) ? getFilterValue(filter) : "Any"}
              </Text>
              <Box
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <ChevronRight
                  size={16}
                  color="#B1B1B1"
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
