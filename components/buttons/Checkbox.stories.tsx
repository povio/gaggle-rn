import { useTheme } from "@shopify/restyle";
import { useState } from "react";

import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import CheckboxComponent, { type CheckboxProps } from "./Checkbox";

const meta = {
  title: "Buttons/Checkbox",
  component: Box,
  decorators: [withPadding()],
  args: {
    disabled: false,
    indeterminate: false,
  },
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    indeterminate: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
};

export default meta;

const WrappedCheckbox = ({ args }: { args: CheckboxProps & { indeterminate: boolean } }) => {
  const [checked, setChecked] = useState(false);

  return (
    <CheckboxComponent
      checked={args.indeterminate ? "indeterminate" : checked}
      disabled={args.disabled}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Checkbox = {
  render: (
    args: CheckboxProps & {
      indeterminate: boolean;
    },
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box alignItems="center">
        <WrappedCheckbox args={args} />
      </Box>
    );
  },
};
