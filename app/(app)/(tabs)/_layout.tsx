import { useTheme } from "@shopify/restyle";
import { Tabs } from "expo-router";
import React from "react";

import BookingsIcon from "@/assets/icons/BookingsIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import UserIcon from "@/assets/icons/UserIcon";
import type { Theme } from "@/utils/theme/restyleTheme";

export default function TabLayout() {
  const theme = useTheme<Theme>();

  return (
    <Tabs
      screenOptions={{
        animation: "fade",
        headerShown: false,
        tabBarActiveTintColor: theme.colors["interactive-active"],
        tabBarInactiveTintColor: "#E5E3EC",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 78,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius: 10,
          borderColor: "transparent",
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon
              fill={color}
              width={25}
              height={25}
            />
          ),
        }}
      />
      {/* tmp disabled for MVP
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => (
            <BookingsIcon
              fill={color}
              width={25}
              height={25}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <HeartIcon
              fill={color}
              width={25}
              height={25}
            />
          ),
        }}
      />
      {/* tmp disabled for MVP
       <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <MessageIcon
              fill={color}
              width={25}
              height={25}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <UserIcon
              fill={color}
              width={25}
              height={25}
            />
          ),
        }}
      />
    </Tabs>
  );
}
