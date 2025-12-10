import { useTheme } from "@shopify/restyle";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import type { DimensionValue } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import type { Theme } from "@/utils/theme/restyleTheme";

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: keyof Theme["borderRadii"];
  flex?: number;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Skeleton = ({ height, width, flex, borderRadius = "xs" }: SkeletonProps) => {
  const theme = useTheme<Theme>();
  const animation = useSharedValue(0);

  React.useEffect(() => {
    animation.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 0.5, 1], [1, 0.75, 0.5], Extrapolation.CLAMP),
    };
  });

  return (
    <AnimatedLinearGradient
      colors={[theme.colors["elevation-surface-2"], theme.colors["elevation-surface-1"]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          flex,
          height,
          width,
          borderRadius: theme.borderRadii[borderRadius],
        },
        animatedStyle,
      ]}
    />
  );
};

export default Skeleton;
