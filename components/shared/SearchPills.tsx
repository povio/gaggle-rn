import { ScrollView, StyleSheet } from "react-native";

import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";

import Box from "../Box";
import PillButton from "../buttons/PillButton";

export const Filters = [
  {
    label: "All",
    id: FilterId.ALL,
    count: 122,
  },
  {
    label: "Camps",
    id: FilterId.CAMPS,
    count: 43,
  },
  {
    label: "Sports",
    id: FilterId.SPORTS,
    count: 98,
  },
  {
    label: "Classes",
    id: FilterId.CLASSES,
    count: 1,
  },
  {
    label: "Party",
    id: FilterId.PARTY,
    count: 211,
  },
];

export const SearchPills = () => {
  const { filter, setFilter } = useSearchStore();

  return (
    <Box padding="2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Filters.map((item, index) => {
          return (
            <PillButton
              label={`${item.label} • ${item.count}`}
              onPress={() => setFilter(item.id)}
              variant="toggle"
              key={item.id}
              textVariant="variant-11"
              checked={item.id === filter}
            />
          );
        })}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
