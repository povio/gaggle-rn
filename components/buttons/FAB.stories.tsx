import { useTheme } from "@shopify/restyle";

import InfoIcon from "@/assets/icons/InfoIcon";
import { type FABVariant, FABVariantEnum } from "@/types";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import FABComponent, { type FABProps } from "./FAB";

const meta = {
  title: "Buttons/FAB",
  component: Box,
  decorators: [],
  args: {
    variant: "primary" as FABVariant,
    disabled: false,
  },
  argTypes: {
    variant: {
      options: FABVariantEnum,
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
  },
};

export default meta;

export const FAB = {
  render: (args: FABProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme || !theme?.iconButtonVariants[args.variant]) {
      return null;
    }

    return (
      <Box
        alignItems="center"
        height="100%"
      >
        <FABComponent
          variant={args.variant}
          disabled={args.disabled}
          onPress={() => null}
          icon={<InfoIcon />}
        />
      </Box>
    );
  },
};
