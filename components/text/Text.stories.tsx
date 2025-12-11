import { ScrollView } from "react-native";

import Box from "../Box";
import TextComponent from "./Text";

const meta = {
  title: "Typography/Text",
  component: Box,
  decorators: [],
};

export default meta;

export const Text = {
  render: () => {
    return (
      <ScrollView>
        <Box gap="1">
          <TextComponent variant="variant-5-prominent">display-1-default</TextComponent>
          <TextComponent variant="variant-5-prominent">display-1-prominent-1</TextComponent>
          <TextComponent variant="variant-5-prominent">display-2-default</TextComponent>
          <TextComponent variant="variant-5-prominent">display-2-prominent-1</TextComponent>
          <TextComponent variant="variant-6-prominent">display-3-default</TextComponent>
          <TextComponent variant="variant-6-prominent">display-3-prominent-1</TextComponent>
          <TextComponent variant="variant-6-prominent">display-4-default</TextComponent>
          <TextComponent variant="variant-6-prominent">display-4-prominent-1</TextComponent>
        </Box>
        <Box
          gap="1"
          mt="8"
        >
          <TextComponent variant="variant-6-prominent">title-1-default</TextComponent>
          <TextComponent variant="variant-6-prominent">title-1-prominent-1</TextComponent>
          <TextComponent variant="variant-8">title-2-default</TextComponent>
          <TextComponent variant="variant-3-prominent">title-2-prominent-1</TextComponent>
          <TextComponent variant="variant-8">title-3-default</TextComponent>
          <TextComponent variant="variant-3-prominent">title-3-prominent-1</TextComponent>
          <TextComponent variant="variant-10-prominent">title-4-default</TextComponent>
          <TextComponent variant="variant-10-prominent">title-4-prominent-1</TextComponent>
        </Box>
        <Box
          gap="1"
          mt="8"
        >
          <TextComponent variant="variant-8">body-1-default</TextComponent>
          <TextComponent variant="variant-8">body-1-default-italic</TextComponent>
          <TextComponent variant="variant-3-prominent">body-1-prominent-1</TextComponent>
          <TextComponent variant="variant-3-prominent">body-1-prominent-1-italic</TextComponent>
          <TextComponent variant="variant-3-prominent">body-1-prominent-2</TextComponent>
          <TextComponent variant="variant-3-prominent">body-1-prominent-2-italic</TextComponent>
          <TextComponent variant="variant-10-prominent">body-2-default</TextComponent>
          <TextComponent variant="variant-10-prominent">body-2-default-italic</TextComponent>
          <TextComponent variant="variant-10-prominent">body-2-prominent-1</TextComponent>
          <TextComponent variant="variant-10-prominent">body-2-prominent-1-italic</TextComponent>
          <TextComponent variant="variant-10-prominent">body-2-prominent-2</TextComponent>
          <TextComponent variant="variant-10-prominent">body-2-prominent-2-italic</TextComponent>
          <TextComponent variant="variant-7">body-3-default</TextComponent>
          <TextComponent variant="variant-7">body-3-default-italic</TextComponent>
          <TextComponent variant="variant-7">body-3-prominent-1</TextComponent>
          <TextComponent variant="variant-7">body-3-prominent-1-italic</TextComponent>
          <TextComponent variant="variant-7">body-3-prominent-2</TextComponent>
          <TextComponent variant="variant-7">body-3-prominent-2-italic</TextComponent>
          <TextComponent variant="variant-1">body-4-default</TextComponent>
          <TextComponent variant="variant-1">body-4-default-italic</TextComponent>
          <TextComponent variant="variant-1">body-4-prominent-1</TextComponent>
          <TextComponent variant="variant-1">body-4-prominent-1-italic</TextComponent>
          <TextComponent variant="variant-1">body-4-prominent-2</TextComponent>
          <TextComponent variant="variant-1">body-4-prominent-2-italic</TextComponent>
        </Box>
        <Box
          gap="1"
          mt="8"
        >
          <TextComponent variant="variant-10-prominent">label-1-default</TextComponent>
          <TextComponent variant="variant-10-prominent">label-1-prominent-1</TextComponent>
          <TextComponent variant="variant-1">label-2-default</TextComponent>
          <TextComponent variant="variant-1">label-2-prominent-1</TextComponent>
          <TextComponent variant="variant-9">label-3-default</TextComponent>
          <TextComponent variant="variant-9">label-3-prominent-1</TextComponent>
        </Box>
      </ScrollView>
    );
  },
};
