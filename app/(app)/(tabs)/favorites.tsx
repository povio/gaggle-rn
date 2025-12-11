import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import { FavoritesCards } from "@/components/shared/FavoritesCards";
import Text from "@/components/text/Text";

const Favorites = () => {
  const router = useRouter();
  const [isNotified, setIsNotified] = useState<boolean>(false);

  const handleNotifyMe = () => {
    if (!isNotified) {
      setIsNotified(true);
      return;
    }

    router.push("./");
  };

  return (
    <Box
      flex={1}
      justifyContent="flex-start"
      backgroundColor="elevation-background"
    >
      <View>
        <Text
          variant="title-1-prominent-1"
          textAlign="center"
          paddingTop="10"
        >
          Favorites
        </Text>
      </View>
      <FavoritesCards />
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Favorites;
