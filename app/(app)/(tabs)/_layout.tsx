import { useTheme } from "@shopify/restyle";
import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import type { Theme } from "@/utils/theme/restyleTheme";

export default function TabLayout() {
  const theme = useTheme<Theme>();

  return (
    <Tabs
      screenOptions={{
        animation: "fade",
        tabBarActiveTintColor: theme.colors["interactive-primary-idle"],
        tabBarInactiveTintColor: theme.colors["interactive-icon-idle"],
        tabBarStyle: {
          backgroundColor: theme.colors["elevation-background"],
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="flowers"
        options={{
          title: "Flowers",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? "flower" : "flower-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
