import { useTheme } from "@shopify/restyle";

import { type ToastVariant, ToastVariantEnum } from "@/types";
import type { Theme } from "@/utils/theme/restyleTheme";
import { showToast } from "@/utils/toast";

import Box from "../Box";
import Button from "../buttons/Button";
import type { ToastContentProps } from "./ToastContent";

const meta = {
  title: "Messages/Toast",
  component: Box,
  decorators: [],
  args: {
    message: "This is a default sample of text, in order to display a recommended maximum of two lines.",
    variant: "neutral" as ToastVariant,
    primaryActionLabel: "Primary",
    secondaryActionLabel: "Secondary",
    icon: false,
    showCloseButton: false,
  },
  argTypes: {
    variant: {
      options: ToastVariantEnum,
      control: {
        type: "select",
      },
      defaultValue: ToastVariantEnum.neutral,
    },
    icon: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    showCloseButton: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
};

export default meta;

export const ToastComponent = {
  render: (args: ToastContentProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box
        p="2"
        mt="40"
      >
        <Button
          label="Show Toast"
          onPress={() =>
            showToast({
              message: args.message,
              variant: args.variant,
              primaryActionLabel: args.primaryActionLabel,
              secondaryActionLabel: args.secondaryActionLabel,
              onPrimaryActionPress: () => null,
              onSecondaryActionPress: () => null,
              offset: 0,
              showCloseButton: args.showCloseButton,
              onClosePress: () => null,
            })
          }
        />
      </Box>
    );
  },
};
