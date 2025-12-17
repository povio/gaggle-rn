import { ChevronRight } from "lucide-react-native";
import { cloneElement, useState } from "react";

import Box from "@/components/Box";
import Checkbox from "@/components/buttons/Checkbox";
import PillButton from "@/components/buttons/PillButton";
import Toggle from "@/components/buttons/Toggle";
import Calendar from "@/components/input/Calendar";
import Slider from "@/components/input/Slider";
import TimePicker from "@/components/input/TimePicker";
import Text from "@/components/text/Text";
import {
  type Boxes,
  type FilterItem,
  FilterList,
  type FilterType,
  FilterTypeEnum,
  type MinMaxFilter,
  type SearchFilters,
  useFilterStore,
} from "@/modules/search/stores/filterStore";
import { DateUtils } from "@/utils/date.utils";

interface FilterBuilderProps {
  list: SearchFilters[];
  onFilterSelect: (filterId: SearchFilters) => void;
  selectedFilter: SearchFilters | null;
  onBackToList: () => void;
}

const PillsFilter = ({ data, filterId }: { data: string[]; filterId: SearchFilters }) => {
  const { setFilter, filters } = useFilterStore();
  const selectedValue = filters[filterId];

  return (
    <Box
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexWrap={"wrap"}
      gap="2"
    >
      {data.map((item) => (
        <PillButton
          key={item}
          label={item}
          variant="outlined"
          onPress={() => setFilter(filterId, item)}
          checked={item === selectedValue}
          size="l"
        />
      ))}
    </Box>
  );
};

const DateFilter = ({ filterId }: { filterId: SearchFilters }) => {
  const { setFilter, getSelectedFilters } = useFilterStore();
  const filterValue = getSelectedFilters(filterId);
  const [date, setDate] = useState<Date>((filterValue as Date) || new Date());

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFilter(filterId, newDate);
    }
  };

  return (
    <Box
      flexDirection={"row"}
      justifyContent={"center"}
      width={"100%"}
      alignItems={"center"}
      gap="2"
    >
      <Calendar
        date={date}
        setDate={handleDateChange}
        label=""
        showControls={false}
      />
    </Box>
  );
};

const TimeFilter = ({ filterId }: { filterId: SearchFilters }) => {
  const { setFilter, getSelectedFilters } = useFilterStore();
  const filterValue = getSelectedFilters(filterId);
  const [time, setTime] = useState<Date>((filterValue as Date) || new Date());

  const handleTimeChange = (newTime: Date | undefined) => {
    if (newTime) {
      setTime(newTime);
      setFilter(filterId, newTime);
    }
  };

  return (
    <Box
      flexDirection={"row"}
      justifyContent={"center"}
      width={"100%"}
      alignItems={"center"}
      gap="2"
    >
      <TimePicker
        time={time}
        setTime={handleTimeChange}
        label=""
        showControls={false}
      />
    </Box>
  );
};

const ToggleFilter = ({ data, filterId }: { data: Boxes[]; filterId: SearchFilters }) => {
  const { toggleCheckboxValue, filters } = useFilterStore();
  const filterValue = filters[filterId];
  const selectedValues = Array.isArray(filterValue) ? filterValue : [];

  const handleOnChange = (checked: boolean, id: string) => {
    toggleCheckboxValue(filterId, id);
  };

  return (
    <Box
      flexDirection={"column"}
      justifyContent={"center"}
      width={"100%"}
      alignItems={"center"}
      gap="2"
    >
      {data.map((value) => (
        <Box
          key={value.id}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <Text variant="variant-8">{value.label}</Text>
          <Toggle
            onChange={handleOnChange}
            checked={selectedValues.includes(value.id)}
            id={value.id}
          />
        </Box>
      ))}
    </Box>
  );
};

const CheckboxFilter = ({ data, filterId }: { data: Boxes[]; filterId: SearchFilters }) => {
  const { toggleCheckboxValue, filters } = useFilterStore();
  const filterValue = filters[filterId];
  const selectedValues = Array.isArray(filterValue) ? filterValue : [];

  const handleOnChange = (id: string) => {
    toggleCheckboxValue(filterId, id);
  };

  return (
    <Box
      flexDirection={"column"}
      justifyContent={"center"}
      width={"100%"}
      alignItems={"center"}
      gap="2"
    >
      {data.map((value) => (
        <Box
          key={value.id}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <Text variant="variant-8">{value.label}</Text>
          <Checkbox
            onChange={handleOnChange}
            checked={selectedValues.includes(value.id)}
            id={value.toString()}
          />
        </Box>
      ))}
    </Box>
  );
};

const SliderFilter = ({ data, filterId }: { data: MinMaxFilter; filterId: SearchFilters }) => {
  const { setFilter, filters } = useFilterStore();
  const selectedValue = filters[filterId];

  const handleRangeChange = (range: { min: number; max: number }) => {
    setFilter(filterId, `${range.min}-${range.max}`);
  };

  // Parse initial range from stored value
  const getInitialRange = (): { min: number; max: number } | undefined => {
    if (typeof selectedValue === "string" && selectedValue.includes("-")) {
      const [minStr, maxStr] = selectedValue.split("-");
      const minVal = Number.parseInt(minStr);
      const maxVal = Number.parseInt(maxStr);
      if (!Number.isNaN(minVal) && !Number.isNaN(maxVal)) {
        return { min: minVal, max: maxVal };
      }
    }
    return undefined;
  };

  return (
    <Box
      flexDirection={"row"}
      width={"100%"}
      alignItems={"center"}
    >
      <Slider
        min={data.min}
        max={data.max}
        onRangeChange={handleRangeChange}
        rangeMode={true}
        title=""
        unit="$"
        initialRange={getInitialRange()}
      />
    </Box>
  );
};

const FilterDetailView = ({ filter, onBack }: { filter: FilterItem; onBack: () => void }) => {
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

export const FilterBuilder = ({ list, onFilterSelect, selectedFilter, onBackToList }: FilterBuilderProps) => {
  const filters = FilterList.filter((filter) => list.includes(filter.id));
  const selectedFilterData = FilterList.find((f) => f.id === selectedFilter);
  const { getSelectedFilters } = useFilterStore();
  const setFiltersData = getSelectedFilters();
  const setFiltersField = setFiltersData ? Object.keys(setFiltersData) : [];

  if (selectedFilterData) {
    return (
      <FilterDetailView
        filter={selectedFilterData}
        onBack={onBackToList}
      />
    );
  }

  const getFilterValue = (id: SearchFilters, type: FilterType, unit: string | undefined): string => {
    if (!setFiltersData) return "Any";

    if ((type === FilterTypeEnum.enum.date || type === FilterTypeEnum.enum.time) && setFiltersData) {
      return DateUtils.formatDate(setFiltersData[id] as Date, "HH:mm a");
    }

    if (type === FilterTypeEnum.enum.checkbox && Array.isArray(setFiltersData[id])) {
      const values = setFiltersData[id] as string[];
      return values.length > 0 ? values.join(", ") : "Any";
    }

    if (type === FilterTypeEnum.enum.toggle && Array.isArray(setFiltersData[id])) {
      const values = setFiltersData[id] as string[];
      return values.length > 0 ? values.join(", ") : "Any";
    }

    return `${unit} ${setFiltersData[id] as string}`;
  };

  return (
    <Box
      flexDirection={"column"}
      gap="5"
    >
      {filters.map((filter) => {
        const IconComponent = filter.iconComponent;
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
            >
              {IconComponent && (
                <Box
                  width={20}
                  height={20}
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
                {setFiltersField && setFiltersField.includes(filter.id)
                  ? getFilterValue(filter.id, filter.type, filter.unit)
                  : "Any"}
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
