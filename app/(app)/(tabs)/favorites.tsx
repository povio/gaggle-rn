import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Box from "@/components/Box";
import { FavoritesList } from "@/components/shared/FavoritesList";
import Text from "@/components/text/Text";

const Favorites = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Box
      flex={1}
      justifyContent="flex-start"
      backgroundColor="elevation-background"
    >
      <View style={{ paddingTop: top }}>
        <Text
          variant="variant-6-prominent"
          textAlign="center"
          paddingTop="10"
        >
          Favorites
        </Text>
      </View>
      <FavoritesList />
    </Box>
  );
};

export default Favorites;
