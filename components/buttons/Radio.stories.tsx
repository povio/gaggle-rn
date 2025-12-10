import { useTheme } from "@shopify/restyle";
import { useState } from "react";

import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import RadioComponent, { type RadioProps } from "./Radio";

const meta = {
  title: "Buttons/Radio",
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

const WrappedRadio = ({ args }: { args: RadioProps }) => {
  const [checked, setChecked] = useState(false);

  return (
    <RadioComponent
      checked={checked}
      disabled={args.disabled}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Radio = {
  render: (args: RadioProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box alignItems="center">
        <WrappedRadio args={args} />
      </Box>
    );
  },
};
