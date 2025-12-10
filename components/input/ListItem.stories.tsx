import { useTheme } from "@shopify/restyle";
import { FlatList } from "react-native";

import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import TextButton from "../buttons/TextButton";
import Text from "../text/Text";
import ListItemComponent from "./ListItem";

const meta = {
  title: "Input Fields/List components",
  component: Box,
  decorators: [],
  args: {},
  argTypes: {},
};

export default meta;

export const ListItem = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <FlatList
        ListHeaderComponent={
          <Box padding="5">
            <Text
              variant="body-2-prominent-1"
              mb="4"
            >
              List items
            </Text>
            <FlatList
              data={DATA_FLAT_LIST}
              renderItem={({ item }) => (
                <ListItemComponent
                  label={item.label}
                  selected={item.selected}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <Text
              variant="body-2-prominent-1"
              marginVertical="4"
            >
              List actions
            </Text>
            <FlatList
              data={DATA_FLAT_LIST}
              renderItem={({ item }) => (
                <Box mb="4">
                  <ListItemComponent
                    label={item.label}
                    selected={item.selected}
                    variant="action"
                    leftElement={
                      <TextButton
                        variant="primary"
                        label="Action"
                        onPress={() => null}
                      />
                    }
                    rightElement={
                      <TextButton
                        variant="secondary"
                        label="Action"
                        onPress={() => null}
                      />
                    }
                  />
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text
              variant="body-2-prominent-1"
              marginVertical="4"
            >
              Drawer single selection
            </Text>
            <FlatList
              data={DATA_DRAWER_SINGLE}
              renderItem={({ item }) => (
                <ListItemComponent
                  variant="single"
                  label={item.label}
                  selected={item.selected}
                  onPress={() => null}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <Text
              variant="body-2-prominent-1"
              marginVertical="4"
            >
              Drawer multiple selection
            </Text>
            <FlatList
              data={DATA_DRAWER_MULTIPLE}
              renderItem={({ item }) => (
                <ListItemComponent
                  variant="multiple"
                  label={item.label}
                  selected={item.selected}
                  onPress={() => null}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <Box mb="40" />
          </Box>
        }
        renderItem={() => null}
        data={[]}
      />
    );
  },
};

const DATA_FLAT_LIST = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    label: "First Item",
    selected: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    label: "Second Item",
    selected: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    label: "Third Item",
    selected: false,
  },
];

const DATA_DRAWER_SINGLE = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    label: "First Item",
    selected: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    label: "Second Item",
    selected: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    label: "Third Item",
    selected: true,
  },
];

const DATA_DRAWER_MULTIPLE = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    label: "First Item",
    selected: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    label: "Second Item",
    selected: true,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    label: "Third Item",
    selected: true,
  },
];
