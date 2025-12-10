import { useTheme } from "@shopify/restyle";
import { StyleSheet } from "react-native";

import { type BlurIntensity, BlurIntensityEnum } from "@/types";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box, { BlurredBox } from "../Box";
import Text from "../text/Text";

const meta = {
  title: "Effects/Blurs",
  component: Box,
  args: {
    intensity: "bg-blur-0" as BlurIntensity,
  },
  argTypes: {
    intensity: {
      options: BlurIntensityEnum,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

export const Blur = {
  render: (args: { intensity: BlurIntensity }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    const blurIntensity = theme?.blurs[args.intensity];
    if (!theme || blurIntensity === undefined) {
      return null;
    }

    return (
      <>
        <Box
          flex={1}
          flexWrap="wrap"
          style={StyleSheet.absoluteFill}
        >
          {[...Array(20).keys()].map((i) => (
            <Box
              width="25%"
              height="25%"
              key={`box-${i}`}
              backgroundColor={i % 2 === 1 ? "informational-warning" : "informational-success"}
            />
          ))}
        </Box>
        <BlurredBox
          experimentalBlurMethod="dimezisBlurView" // This can be used on Android (experimental blur rendering)
          intensity={blurIntensity}
          alignItems="center"
          justifyContent="center"
          flex={1}
          margin="16"
          padding="2"
          borderRadius="5xl"
          overflow="hidden"
        >
          <Text variant="title-1-prominent-1">Hello, my container is blurring contents underneath!</Text>
        </BlurredBox>
      </>
    );
  },
};
