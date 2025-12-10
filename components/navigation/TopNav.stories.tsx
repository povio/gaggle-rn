import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import SendIcon from "@/assets/icons/SendIcon";
import { type TopNavVariant, TopNavVariantEnum } from "@/types";

import Box from "../Box";
import Text from "../text/Text";
import TopNavComponent, { type TopNavProps } from "./TopNav";

enum ActionsTypeEnum {
  none = "none",
  one = "one",
  three = "three",
}

type ActionsType = keyof typeof ActionsTypeEnum;

const meta = {
  title: "Navigation/TopNav",
  component: Box,
  decorators: [],
  args: {
    variant: "center" as TopNavVariant,
    actionsType: "none" as ActionsType,
  },
  argTypes: {
    variant: {
      options: TopNavVariantEnum,
      control: {
        type: "select",
      },
    },
    actionsType: {
      options: ActionsTypeEnum,
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

const HomeScreen = () => {
  return (
    <Box>
      <Text variant="body-1-default">Home Screen</Text>
    </Box>
  );
};

const Stack = createNativeStackNavigator<{
  Home: undefined;
}>();

const getActions = (actions: ActionsType) => {
  switch (actions) {
    case "none":
      return [];
    case "one":
      return [
        {
          icon: <SendIcon />,
          onPress: () => null,
        },
      ];
    case "three":
      return [
        {
          icon: <SendIcon />,
          onPress: () => null,
        },
        {
          icon: <SendIcon />,
          onPress: () => null,
        },
        {
          icon: <SendIcon />,
          onPress: () => null,
        },
      ];
    default:
      return [];
  }
};

export const TopNav = {
  render: (args: TopNavProps & { actionsType: ActionsType }) => {
    const actions = getActions(args.actionsType);

    return (
      <NavigationContainer>
        <Stack.Navigator
          id="TopNavStory"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: true,
              header: (props) => (
                <TopNavComponent
                  variant={args.variant}
                  actions={actions}
                  {...props}
                  title="Home"
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
};
