import { ScrollView, StyleSheet } from "react-native";

import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";
import type { ProgramModels } from "@/openapi/program/program.models";

import Box from "../Box";
import PillButton from "../buttons/PillButton";
import type { Card } from "./FavoritesList";

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

interface SearchPillsProps {
  results: ProgramModels.SearchResponse["items"];
}

export const SearchPills = ({ results }: SearchPillsProps) => {
  const { filter, setFilter } = useSearchStore();

  return (
    <Box padding="2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Filters.map((item) => {
          const count = item.id === FilterId.ALL ? results?.length : item.count;

          return (
            <PillButton
              label={`${item.label} • ${count ?? 0}`}
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
