import Box from "@/components/Box";
import PillButton from "@/components/buttons/PillButton";
import { type SearchFilters, useFilterStore } from "@/modules/search/stores/filterStore";

export const PillsFilter = ({ data, filterId }: { data: string[]; filterId: SearchFilters }) => {
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
