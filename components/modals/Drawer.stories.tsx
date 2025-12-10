import React, { useState } from "react";

import { type DrawerContentVariant, DrawerContentVariantEnum } from "@/types";

import Box from "../Box";
import Button from "../buttons/Button";
import DrawerComponent, { type DrawerProps } from "./Drawer";
import { TextOnlyModalContent } from "./ModalContent";

const meta = {
  title: "Modals & Drawers/Drawer",
  component: Box,
  decorators: [],
  args: {
    variant: "textOnly" as DrawerContentVariant,
    primaryActionLabel: "Action",
    secondaryActionLabel: "Cancel",
  },
  argTypes: {
    variant: {
      options: DrawerContentVariantEnum,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

const WrappedDrawer = ({
  variant,
  primaryActionLabel,
  secondaryActionLabel,
}: DrawerProps & { variant: DrawerContentVariant }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  let content = null;
  switch (variant) {
    case "textOnly":
      content = (
        <TextOnlyModalContent
          title="Text only message!"
          text="Space is big. You just won't believe how vastly, hugely, mind-bogglingly
    big it is. I mean, you may think it's a long way down the road to the
    chemist's, but that's just peanuts to space."
          primaryButtonText="Primary Action"
          secondaryButtonText="Secondary Action"
          onPrimaryButtonPress={() => null}
          onSecondaryButtonPress={() => null}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Button
        variant="primary"
        label="Open drawer"
        onPress={() => {
          setDrawerVisible(true);
        }}
      />
      <DrawerComponent
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        primaryActionLabel={primaryActionLabel}
        secondaryActionLabel={secondaryActionLabel}
      >
        {content}
      </DrawerComponent>
    </Box>
  );
};

export const Drawer = {
  render: (args: DrawerProps & { variant: DrawerContentVariant }) => {
    return (
      <Box alignItems="center">
        <WrappedDrawer
          variant={args.variant}
          primaryActionLabel={args.primaryActionLabel}
          secondaryActionLabel={args.secondaryActionLabel}
          visible={false}
          onClose={() => null}
        />
      </Box>
    );
  },
};
