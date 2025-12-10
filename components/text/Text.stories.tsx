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
          <TextComponent variant="display-1-default">display-1-default</TextComponent>
          <TextComponent variant="display-1-prominent-1">display-1-prominent-1</TextComponent>
          <TextComponent variant="display-2-default">display-2-default</TextComponent>
          <TextComponent variant="display-2-prominent-1">display-2-prominent-1</TextComponent>
          <TextComponent variant="display-3-default">display-3-default</TextComponent>
          <TextComponent variant="display-3-prominent-1">display-3-prominent-1</TextComponent>
          <TextComponent variant="display-4-default">display-4-default</TextComponent>
          <TextComponent variant="display-4-prominent-1">display-4-prominent-1</TextComponent>
        </Box>
        <Box
          gap="1"
          mt="8"
        >
          <TextComponent variant="title-1-default">title-1-default</TextComponent>
          <TextComponent variant="title-1-prominent-1">title-1-prominent-1</TextComponent>
          <TextComponent variant="title-2-default">title-2-default</TextComponent>
          <TextComponent variant="title-2-prominent-1">title-2-prominent-1</TextComponent>
          <TextComponent variant="title-3-default">title-3-default</TextComponent>
          <TextComponent variant="title-3-prominent-1">title-3-prominent-1</TextComponent>
          <TextComponent variant="title-4-default">title-4-default</TextComponent>
          <TextComponent variant="title-4-prominent-1">title-4-prominent-1</TextComponent>
        </Box>
        <Box
          gap="1"
          mt="8"
        >
          <TextComponent variant="body-1-default">body-1-default</TextComponent>
          <TextComponent variant="body-1-default-italic">body-1-default-italic</TextComponent>
          <TextComponent variant="body-1-prominent-1">body-1-prominent-1</TextComponent>
          <TextComponent variant="body-1-prominent-1-italic">body-1-prominent-1-italic</TextComponent>
          <TextComponent variant="body-1-prominent-2">body-1-prominent-2</TextComponent>
          <TextComponent variant="body-1-prominent-2-italic">body-1-prominent-2-italic</TextComponent>
          <TextComponent variant="body-2-default">body-2-default</TextComponent>
          <TextComponent variant="body-2-default-italic">body-2-default-italic</TextComponent>
          <TextComponent variant="body-2-prominent-1">body-2-prominent-1</TextComponent>
          <TextComponent variant="body-2-prominent-1-italic">body-2-prominent-1-italic</TextComponent>
          <TextComponent variant="body-2-prominent-2">body-2-prominent-2</TextComponent>
          <TextComponent variant="body-2-prominent-2-italic">body-2-prominent-2-italic</TextComponent>
          <TextComponent variant="body-3-default">body-3-default</TextComponent>
          <TextComponent variant="body-3-default-italic">body-3-default-italic</TextComponent>
          <TextComponent variant="body-3-prominent-1">body-3-prominent-1</TextComponent>
          <TextComponent variant="body-3-prominent-1-italic">body-3-prominent-1-italic</TextComponent>
          <TextComponent variant="body-3-prominent-2">body-3-prominent-2</TextComponent>
          <TextComponent variant="body-3-prominent-2-italic">body-3-prominent-2-italic</TextComponent>
          <TextComponent variant="body-4-default">body-4-default</TextComponent>
          <TextComponent variant="body-4-default-italic">body-4-default-italic</TextComponent>
          <TextComponent variant="body-4-prominent-1">body-4-prominent-1</TextComponent>
          <TextComponent variant="body-4-prominent-1-italic">body-4-prominent-1-italic</TextComponent>
          <TextComponent variant="body-4-prominent-2">body-4-prominent-2</TextComponent>
          <TextComponent variant="body-4-prominent-2-italic">body-4-prominent-2-italic</TextComponent>
        </Box>
        <Box
          gap="1"
          mt="8"
        >
          <TextComponent variant="label-1-default">label-1-default</TextComponent>
          <TextComponent variant="label-1-prominent-1">label-1-prominent-1</TextComponent>
          <TextComponent variant="label-2-default">label-2-default</TextComponent>
          <TextComponent variant="label-2-prominent-1">label-2-prominent-1</TextComponent>
          <TextComponent variant="label-3-default">label-3-default</TextComponent>
          <TextComponent variant="label-3-prominent-1">label-3-prominent-1</TextComponent>
        </Box>
      </ScrollView>
    );
  },
};
