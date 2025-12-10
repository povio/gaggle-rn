import { ScrollView } from "react-native";

import Box from "../Box";
import TooltipComponent from "../messages/Tooltip";
import Text from "../text/Text";

const meta = {
  title: "Messages/Tooltip",
  component: Box,
  decorators: [],
};

export default meta;

export const Tooltip = {
  render: () => {
    return (
      <ScrollView>
        <Box
          height="100%"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            mt="2"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="100%"
            px="3"
          >
            <TooltipComponent
              position="bottom"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <Box
                justifyContent="center"
                alignItems="center"
              >
                <Text>Bottom tooltip</Text>
              </Box>
            </TooltipComponent>
          </Box>

          <Box
            mt="2"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="100%"
            px="3"
          >
            <TooltipComponent
              position="top"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <Box
                justifyContent="center"
                alignItems="center"
              >
                <Text>Top tooltip</Text>
              </Box>
            </TooltipComponent>
          </Box>

          <Box
            mt="2"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="100%"
            px="3"
          >
            <TooltipComponent
              position="right"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <Box
                justifyContent="center"
                alignItems="center"
              >
                <Text>Right tooltip</Text>
              </Box>
            </TooltipComponent>
          </Box>

          <Box
            mt="2"
            justifyContent="flex-start"
            alignItems="flex-end"
            width="100%"
            px="3"
          >
            <TooltipComponent
              position="left"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            >
              <Box
                justifyContent="center"
                alignItems="center"
              >
                <Text>Left tooltip</Text>
              </Box>
            </TooltipComponent>
          </Box>
        </Box>
      </ScrollView>
    );
  },
};
