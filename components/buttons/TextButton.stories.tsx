import { useTheme } from "@shopify/restyle";

import InfoIcon from "@/assets/icons/InfoIcon";
import { type TextButtonVariant, TextButtonVariantEnum } from "@/types";
import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import TextButtonComponent, { type TextButtonProps } from "./TextButton";

const meta = {
  title: "Buttons/TextButton",
  component: Box,
  decorators: [withPadding()],
  args: {
    label: "Log in!",
    variant: "primary" as TextButtonVariant,
    icon: null,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: TextButtonVariantEnum,
      control: {
        type: "select",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    icon: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
};

export default meta;

export const TextButton = {
  render: (args: TextButtonProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box alignItems="center">
        <TextButtonComponent
          label={args.label}
          variant={args.variant}
          onPress={() => null}
          disabled={args.disabled}
          icon={args.icon ? <InfoIcon /> : undefined}
        />
      </Box>
    );
  },
};
