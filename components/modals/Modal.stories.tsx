import React, { useState } from "react";

import { type ModalContentVariant, ModalContentVariantEnum } from "@/types";

import Box from "../Box";
import Button from "../buttons/Button";
import ModalComponent from "./Modal";
import { ImageOkayModalContent, InputModalContent, TextImageModalContent, TextOnlyModalContent } from "./ModalContent";

const meta = {
  title: "Modals & Drawers/Modal",
  component: Box,
  decorators: [],
  args: {
    variant: "textOnly" as ModalContentVariant,
  },
  argTypes: {
    variant: {
      options: ModalContentVariantEnum,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

const WrappedModal = ({ variant }: { variant: ModalContentVariant }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
    case "imageOkay":
      content = (
        <ImageOkayModalContent
          title="Hey There!"
          text="Space is big. You just won't believe how vastly, hugely, mind-bogglingly
      big it is. I mean, you may think it's a long way down the road to the
      chemist's."
          imageUrl="https://picsum.photos/seed/200/3000/2000"
          primaryButtonText="Primary Action"
          onPrimaryButtonPress={() => null}
        />
      );
      break;
    case "input":
      content = (
        <InputModalContent
          title="An input field!"
          text="Space is big. You just won't believe how vastly, hugely,
      mind-bogglingly big it is."
          primaryButtonText="Primary Action"
          onPrimaryButtonPress={() => null}
          checkboxLabel="Don’t show me this again"
          onCheckboxChange={() => null}
          checkboxValue={false}
        />
      );
      break;
    case "textImage":
      content = (
        <TextImageModalContent
          title="Message with image!"
          text="Space is big. You just won't believe how vastly, hugely, mind-bogglingly
        big it is. I mean, you may think it's a long way down the road to the
        chemist."
          imageUrl="https://picsum.photos/seed/200/3000/2000"
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
        label="Open modal"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        {content}
      </ModalComponent>
    </Box>
  );
};

export const Modal = {
  render: (args: { variant: ModalContentVariant }) => {
    return (
      <Box alignItems="center">
        <WrappedModal variant={args.variant} />
      </Box>
    );
  },
};
