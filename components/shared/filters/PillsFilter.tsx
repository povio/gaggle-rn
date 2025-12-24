import Box from "@/components/Box";
import PillButton from "@/components/buttons/PillButton";
import { type PillListItem, type SearchFilters, useFilterStore } from "@/modules/search/stores/filterStore";

export const PillsFilter = ({ data, filterId }: { data: PillListItem[]; filterId: SearchFilters }) => {
  const { setFilter, filters } = useFilterStore();
  const selectedValue = filters[filterId];

  return (
    <Box
      flexDirection={"row"}
      // justifyContent={"space-between"}
      alignItems={"center"}
      flexWrap={"wrap"}
      gap="1"
    >
      {data.map((item) => (
        <PillButton
          key={item.id}
          label={item.label}
          variant="outlined"
          onPress={() => setFilter(filterId, item.id)}
          checked={item.id === selectedValue}
          size="l"
        />
      ))}
    </Box>
  );
};
