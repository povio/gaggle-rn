import Box from "@/components/Box";
import Slider from "@/components/input/Slider";
import { type MinMaxFilter, type SearchFilters, useFilterStore } from "@/modules/search/stores/filterStore";

export const SliderFilter = ({ data, filterId }: { data: MinMaxFilter; filterId: SearchFilters }) => {
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
