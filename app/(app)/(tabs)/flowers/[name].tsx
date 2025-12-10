import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import Box from "@/components/Box";

const FlowerDetails = () => {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      p="4"
      pt="2"
    >
      <Text style={{ fontSize: 15 }}>
        Details page for <Text style={{ fontWeight: "bold" }}>{name}</Text>
      </Text>
    </Box>
  );
};

export default FlowerDetails;
