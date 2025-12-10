import { useTheme } from "@shopify/restyle";
import { useState } from "react";

import InfoIcon from "@/assets/icons/InfoIcon";
import { type InputType, InputTypeEnum, type InputVariant, InputVariantEnum } from "@/types";
import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import InputComponent, { type InputProps } from "./Input";

const meta = {
  title: "Input Fields/Input",
  component: Box,
  decorators: [withPadding()],
  args: {
    label: "First name ",
    variant: "outlined" as InputVariant,
    type: "input" as InputType,
    required: false,
    placeholder: "John Doe",
    helperText: "",
    loading: false,
    disabled: false,
    leftElement: false,
    rightElement: false,
    error: "",
    secureTextEntry: false,
    tooltipText: "",
    limit: 0,
  },
  argTypes: {
    variant: {
      options: InputVariantEnum,
      control: {
        type: "select",
      },
    },
    type: {
      options: InputTypeEnum,
      control: {
        type: "select",
      },
    },
    required: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
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
    secureTextEntry: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
};

export default meta;

const WrappedInput = ({ args }: { args: InputProps }) => {
  const [value, setValue] = useState("");

  const getError = () => {
    if (args.error) {
      return args.error;
    } else if (args.limit && value.length > args.limit) {
      return `Max length is ${args.limit}`;
    }
  };

  const error = getError();

  return (
    <InputComponent
      type={args.type}
      placeholder={args.placeholder}
      variant={args.variant}
      leftElement={args.leftElement ? <InfoIcon /> : undefined}
      rightElement={args.rightElement ? <InfoIcon /> : undefined}
      label={args.label}
      required={args.required}
      helperText={args.helperText}
      loading={args.loading}
      value={value}
      error={error}
      disabled={args.disabled}
      tooltipText={args.tooltipText}
      onChangeText={(text) => setValue(text)}
      secureTextEntry={args.secureTextEntry}
      limit={args.limit}
    />
  );
};

export const Input = {
  render: (args: InputProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    const variant = args.variant || "outlined";

    if (!theme || !theme?.inputVariants[variant]) {
      return null;
    }

    return (
      <Box alignItems="center">
        <WrappedInput args={args} />
      </Box>
    );
  },
};
