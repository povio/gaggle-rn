import { useTheme } from "@shopify/restyle";

import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import SliderComponent, { type SliderProps } from "./Slider";

const meta = {
  title: "Input Fields/Slider",
  component: Box,
  decorators: [withPadding()],
  args: {
    min: 0,
    max: 100,
    title: "Percentage",
    unit: "%",
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
};

export default meta;

export const Slider = {
  render: (args: SliderProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box
        alignItems="center"
        justifyContent="center"
      >
        <SliderComponent
          min={args.min}
          max={args.max}
          title={args.title}
          onValueChange={() => null}
          unit={args.unit}
          disabled={args.disabled}
        />
      </Box>
    );
  },
};
