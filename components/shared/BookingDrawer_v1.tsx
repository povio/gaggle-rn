import { useState } from "react";

import { type DrawerContentVariant, DrawerContentVariantEnum } from "@/types";

import Box from "../Box";
import Button from "../buttons/Button";
import Drawer, { type DrawerProps } from "../modals/Drawer";
import { TextOnlyModalContent } from "../modals/ModalContent";

export const BookingDrawerV1 = () => {
  const [drawerVisible, setDrawerVisible] = useState(true);

  return (
    <Box alignItems="center">
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
        <Drawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          primaryActionLabel={"primay"}
          secondaryActionLabel={"secondary"}
        >
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
        </Drawer>
      </Box>
    </Box>
  );
};
