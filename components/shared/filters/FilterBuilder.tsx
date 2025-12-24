import { ChevronRight } from "lucide-react-native";

import Box from "@/components/Box";
import Text from "@/components/text/Text";
import {
  type FilterItem,
  FilterList,
  FilterTypeEnum,
  type MinMaxFilter,
  type PillListItem,
  type SearchFilters,
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

    let value = setFiltersData[id];

    if ((type === FilterTypeEnum.enum.date || type === FilterTypeEnum.enum.time) && setFiltersData) {
      value = DateUtils.formatDate(value as Date, type === FilterTypeEnum.enum.time ? "HH:mm a" : "MMM d");
    }

    if (type === FilterTypeEnum.enum.pills && setFiltersData) {
      const filterDataValues: PillListItem[] = FilterList.find((filter) => filter.id === id)?.values ?? [];
      value = filterDataValues.find((item) => item.id === value)?.label;
    }

    if (type === FilterTypeEnum.enum.checkbox && Array.isArray(value)) {
      const values = value as string[];
      value = values.length > 0 ? values.join(", ") : "Any";
    }

    if (type === FilterTypeEnum.enum.toggle && Array.isArray(value)) {
      const values = value as string[];
      value = values.length > 0 ? values.join(", ") : "Any";
    }

    if (type === FilterTypeEnum.enum.slider) {
      const values = value as MinMaxFilter;
      value = `${values.min}-${values.max}`;
    }

    if (unit) {
      return unitPosition === UnitPositionEnum.enum.left ? `${unit} ${value as string}` : `${value as string} ${unit}`;
    }

    return value as string;
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
