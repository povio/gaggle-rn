import { type PillButtonVariant, PillButtonVariantEnum } from "@/types";
import { withPadding } from "@/utils/storybook";

import Box from "../Box";
import PillButtonComponent, { type PillButtonProps } from "./PillButton";

const meta = {
  title: "Buttons/PillButton",
  component: Box,
  decorators: [withPadding()],
  args: {
    variant: "primary" as PillButtonVariant,
    checked: false,
    label: "Log in!",
    dismissable: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: PillButtonVariantEnum,
      control: {
        type: "select",
      },
    },
    checked: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    dismissable: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
};

export default meta;

export const PillButton = {
  render: (args: PillButtonProps) => {
    return (
      <Box alignItems="center">
        <PillButtonComponent
          variant={args.variant}
          onPress={() => null}
          checked={args.checked}
          disabled={args.disabled}
          label={args.label}
          dismissable={args.dismissable}
        />
      </Box>
    );
  },
};
