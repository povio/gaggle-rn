import { useTheme } from "@shopify/restyle";

import InfoIcon from "@/assets/icons/InfoIcon";
import { type IconButtonSize, IconButtonSizeEnum, type IconButtonVariant, IconButtonVariantEnum } from "@/types";
import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import IconButtonComponent, { type IconButtonProps } from "./IconButton";

const meta = {
  title: "Buttons/IconButton",
  component: Box,
  decorators: [withPadding()],
  args: {
    variant: "primary" as IconButtonVariant,
    size: "m" as IconButtonSize,
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: IconButtonVariantEnum,
      control: {
        type: "select",
      },
    },
    size: {
      options: IconButtonSizeEnum,
      control: {
        type: "select",
      },
      defaultValue: IconButtonSizeEnum.m,
    },
    loading: {
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

export const IconButton = {
  render: (args: IconButtonProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme || !theme?.iconButtonVariants[args.variant]) {
      return null;
    }

    return (
      <Box alignItems="center">
        <IconButtonComponent
          variant={args.variant}
          size={args.size}
          disabled={args.disabled}
          onPress={() => null}
          icon={<InfoIcon />}
          loading={args.loading}
        />
      </Box>
    );
  },
};
