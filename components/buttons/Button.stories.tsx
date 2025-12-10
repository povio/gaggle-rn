import { useTheme } from "@shopify/restyle";

import InfoIcon from "@/assets/icons/InfoIcon";
import {
  type ButtonSize,
  ButtonSizeEnum,
  type ButtonVariant,
  ButtonVariantEnum,
  type ButtonWidth,
  ButtonWidthEnum,
  type LoaderPosition,
  LoaderPositionEnum,
} from "@/types";
import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import ButtonComponent, { type ButtonProps } from "./Button";

const meta = {
  title: "Buttons/Button",
  component: Box,
  decorators: [withPadding()],
  args: {
    label: "Log in!",
    variant: "primary" as ButtonVariant,
    width: "m" as ButtonWidth,
    size: "default" as ButtonSize,
    loading: false,
    loaderPosition: "left" as LoaderPosition,
    disabled: false,
    leftElement: false,
    rightElement: false,
  },
  argTypes: {
    variant: {
      options: ButtonVariantEnum,
      control: {
        type: "select",
      },
    },
    width: {
      options: ButtonWidthEnum,
      control: {
        type: "select",
      },
      defaultValue: ButtonWidthEnum.m,
    },
    size: {
      options: ButtonSizeEnum,
      control: {
        type: "select",
      },
      defaultValue: ButtonSizeEnum.default,
    },
    loading: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    leftElement: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    rightElement: {
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
    loaderPosition: {
      options: LoaderPositionEnum,
      control: {
        type: "select",
      },
      defaultValue: LoaderPositionEnum.left,
    },
  },
};

export default meta;

export const Button = {
  render: (args: ButtonProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    const variant = args.variant || "primary";

    if (!theme || !theme?.buttonVariants[variant]) {
      return null;
    }

    return (
      <Box alignItems="center">
        <ButtonComponent
          variant={args.variant}
          width={args.width}
          size={args.size}
          disabled={args.disabled}
          label={args.label}
          onPress={() => null}
          loading={args.loading}
          loaderPosition={args.loaderPosition}
          leftElement={args.leftElement ? <InfoIcon /> : undefined}
          rightElement={args.rightElement ? <InfoIcon /> : undefined}
        />
      </Box>
    );
  },
};
