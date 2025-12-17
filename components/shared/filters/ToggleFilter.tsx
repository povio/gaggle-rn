import Box from "@/components/Box";
import Toggle from "@/components/buttons/Toggle";
import Text from "@/components/text/Text";
import { type Boxes, type SearchFilters, useFilterStore } from "@/modules/search/stores/filterStore";

export const ToggleFilter = ({ data, filterId }: { data: Boxes[]; filterId: SearchFilters }) => {
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
