import Box from "@/components/Box";
import Toggle from "@/components/buttons/Toggle";
import Text from "@/components/text/Text";
import { type FilterItem, useFilterStore } from "@/modules/search/stores/filterStore";

interface EmbededToggleProps {
  filter: FilterItem;
}

export const EmbededToggle = ({ filter }: EmbededToggleProps) => {
  const { setFilter, filters: filterValues } = useFilterStore();
  const isChecked = filterValues[filter.id] === true;
  const IconComponent = filter.iconComponent;

  return (
    <Box
      key={filter.id}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingRight={"2"}
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
      <Toggle
        checked={isChecked}
        onChange={(checked) => setFilter(filter.id, checked)}
        id={filter.id}
      />
    </Box>
  );
};
