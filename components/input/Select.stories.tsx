import { useTheme } from "@shopify/restyle";
import { useState } from "react";

import { type InputVariant, InputVariantEnum, type SelectType, SelectTypeEnum } from "@/types";
import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import SelectComponent, { type SelectProps } from "./Select";

const meta = {
  title: "Input Fields/Select",
  component: Box,
  decorators: [withPadding()],
  args: {
    variant: "outlined" as InputVariant,
    type: "single" as SelectType,
    label: "First name ",
    disabled: false,
    error: "",
    placeholder: "Select an option",
    primaryActionLabel: "",
    secondaryActionLabel: "",
    filterable: false,
    numberOfItems: 4,
  },
  argTypes: {
    variant: {
      options: InputVariantEnum,
      control: {
        type: "select",
      },
    },
    type: {
      options: SelectTypeEnum,
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
    filterable: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
};

export default meta;

const WrappedSelect = ({
  args,
}: {
  args: SelectProps & {
    numberOfItems: number;
  };
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueMultiple, setSelectedValueMultiple] = useState("");

  const items = [
    {
      label: "First option",
      sublabel: "This is the first option",
      value: "first",
    },
    {
      label: "Second option",
      sublabel: "This is the second option",
      value: "second",
    },
    {
      label: "Third option",
      sublabel: "This is the third option",
      value: "third",
    },
    {
      label: "Fourth option",
      sublabel: "This is the fourth option",
      value: "fourth",
    },
    {
      label: "Fifth option",
      sublabel: "This is the fifth option",
      value: "fifth",
    },
    {
      label: "Sixth option",
      sublabel: "This is the sixth option",
      value: "sixth",
    },
    {
      label: "Seventh option",
      sublabel: "This is the seventh option",
      value: "seventh",
    },
    {
      label: "Eighth option",
      sublabel: "This is the eighth option",
      value: "eighth",
    },
    {
      label: "Ninth option",
      sublabel: "This is the ninth option",
      value: "ninth",
    },
    {
      label: "Tenth option",
      sublabel: "This is the tenth option",
      value: "tenth",
    },
    {
      label: "Eleventh option",
      sublabel: "This is the eleventh option",
      value: "eleventh",
    },
    {
      label: "Twelfth option",
      sublabel: "This is the twelfth option",
      value: "twelfth",
    },
    {
      label: "Thirteenth option",
      sublabel: "This is the thirteenth option",
      value: "thirteenth",
    },
    {
      label: "Fourteenth option",
      sublabel: "This is the fourteenth option",
      value: "fourteenth",
    },
    {
      label: "Fifteenth option",
      sublabel: "This is the fifteenth option",
      value: "fifteenth",
    },
    {
      label: "Sixteenth option",
      sublabel: "This is the sixteenth option",
      value: "sixteenth",
    },
  ];

  const handleSelect = (value: string | string[]) => {
    if (args.type === "single") {
      // oxlint-disable-next-line no-unsafe-type-assertion
      setSelectedValue(value as string);
    } else {
      // oxlint-disable-next-line no-unsafe-type-assertion
      setSelectedValueMultiple(value as any);
    }
  };

  return (
    <SelectComponent
      variant={args.variant}
      type={args.type}
      label={args.label}
      disabled={args.disabled}
      error={args.error}
      placeholder={args.placeholder}
      selectedValue={args.type === "single" ? selectedValue : selectedValueMultiple}
      primaryActionLabel={args.primaryActionLabel}
      secondaryActionLabel={args.secondaryActionLabel}
      items={items.slice(0, args.numberOfItems)}
      onSelect={handleSelect}
      filterable={args.filterable}
    />
  );
};

export const Select = {
  render: (
    args: SelectProps & {
      numberOfItems: number;
    },
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    const variant = args.variant || "outlined";

    if (!theme || !theme?.inputVariants[variant]) {
      return null;
    }

    return (
      <Box alignItems="center">
        <WrappedSelect args={args} />
      </Box>
    );
  },
};
