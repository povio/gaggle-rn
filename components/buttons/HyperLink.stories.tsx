import { ScrollView } from "react-native";

import Box from "../Box";
import Text from "../text/Text";
import HyperLinkComponent from "./HyperLink";

const meta = {
  title: "Buttons/Hyper Link",
  decorators: [],
  component: Box,
};

export default meta;

export const HyperLink = {
  render: () => {
    return (
      <ScrollView>
        <Box
          p="2"
          gap="2"
        >
          <Text>
            Space is big. You just won't believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think
            it's a long way down the road to the chemist's, but that's just{" "}
            <HyperLinkComponent url="https://www.povio.com">peanuts</HyperLinkComponent> to space.
          </Text>
        </Box>
      </ScrollView>
    );
  },
};
