import { useCallback } from "react";
import { FlatList } from "react-native";

import Box from "@/components/Box";
import Text from "@/components/text/Text";
import { type Flower, useFlowersList } from "@/data/flowers";

import { FlowerListItem } from "./FlowerListItem";
import { FlowersListFooter } from "./FlowersListFooter";

export const FlowersList = () => {
  const { data, isLoading, error } = useFlowersList();

  const flowerKeyExtractor = useCallback((item: Flower) => item.id?.toString(), []);

  if (isLoading) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text>{`An error has occurred: ${error}`}</Text>
      </Box>
    );
  }

  return (
    <FlatList
      data={data?.flowers}
      keyExtractor={flowerKeyExtractor}
      ItemSeparatorComponent={() => (
        <Box
          borderBottomColor="elevation-outline-3"
          borderBottomWidth={1}
        />
      )}
      renderItem={({ item }) => (
        <FlowerListItem
          name={item.name}
          sightings={item.sightings}
        />
      )}
      ListFooterComponent={FlowersListFooter}
    />
  );
};
