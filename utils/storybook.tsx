import type { ElementType } from "react";
import { View } from "react-native";

export const withPadding =
  (padding = 45) =>
  (Story: ElementType) => (
    <View style={{ padding }}>
      <Story />
    </View>
  );
