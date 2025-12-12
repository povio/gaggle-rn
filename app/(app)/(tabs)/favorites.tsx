import React from "react";
import { StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import { FavoritesList } from "@/components/shared/FavoritesList";
import Text from "@/components/text/Text";

const Favorites = () => {
  return (
    <Box
      flex={1}
      justifyContent="flex-start"
      backgroundColor="elevation-background"
    >
      <View>
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

const styles = StyleSheet.create({});

export default Favorites;
