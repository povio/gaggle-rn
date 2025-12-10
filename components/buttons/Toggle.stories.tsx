import { useTheme } from "@shopify/restyle";
import { useState } from "react";

import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import ToggleComponent, { type ToggleProps } from "./Toggle";

const meta = {
  title: "Buttons/Toggle",
  component: Box,
  decorators: [withPadding()],
  args: {
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

const WrappedToggle = ({ args }: { args: ToggleProps }) => {
  const [checked, setChecked] = useState(false);

  return (
    <ToggleComponent
      checked={checked}
      disabled={args.disabled}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Toggle = {
  render: (args: ToggleProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box alignItems="center">
        <WrappedToggle args={args} />
      </Box>
    );
  },
};
