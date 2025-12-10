import { useTheme } from "@shopify/restyle";

import { type ShadowIntensity, ShadowIntensityEnum } from "@/types";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";

const meta = {
  title: "Effects/Shadows",
  component: Box,
  args: {
    intensity: "shadow-1" as ShadowIntensity,
  },
  argTypes: {
    intensity: {
      options: ShadowIntensityEnum,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

export const Shadow = {
  render: (args: { intensity: ShadowIntensity }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme || !theme?.shadows[args.intensity]) {
      return null;
    }

    return (
      <Box
        alignItems="center"
        mt="20"
      >
        <Box
          style={{ ...theme.shadows[args.intensity] }}
          width={100}
          height={100}
          backgroundColor="elevation-outline-1"
        />
      </Box>
    );
  },
};
