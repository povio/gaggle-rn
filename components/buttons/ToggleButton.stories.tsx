import { useTheme } from "@shopify/restyle";
import { useState } from "react";

import InfoIcon from "@/assets/icons/InfoIcon";
import { type ButtonWidth, ButtonWidthEnum, type LoaderPosition, LoaderPositionEnum } from "@/types";
import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import ToggleButtonComponent, { type ToggleButtonProps } from "./ToggleButton";

const meta = {
  title: "Buttons/ToggleButton",
  component: Box,
  decorators: [withPadding()],
  args: {
    label: "Log in!",
    width: "m" as ButtonWidth,
    loading: false,
    loaderPosition: "left" as LoaderPosition,
    disabled: false,
    leftElement: false,
    rightElement: false,
  },
  argTypes: {
    width: {
      options: ButtonWidthEnum,
      control: {
        type: "select",
      },
      defaultValue: ButtonWidthEnum.m,
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

const WrappedToggleButton = ({ args }: { args: ToggleButtonProps }) => {
  const [checked, setChecked] = useState(false);

  return (
    <ToggleButtonComponent
      checked={checked}
      disabled={args.disabled}
      width={args.width}
      label={args.label}
      onChange={() => setChecked(!checked)}
      loading={args.loading}
      loaderPosition={args.loaderPosition}
      leftElement={args.leftElement ? <InfoIcon /> : undefined}
      rightElement={args.rightElement ? <InfoIcon /> : undefined}
    />
  );
};

export const ToggleButton = {
  render: (args: ToggleButtonProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box alignItems="center">
        <WrappedToggleButton args={args} />
      </Box>
    );
  },
};
