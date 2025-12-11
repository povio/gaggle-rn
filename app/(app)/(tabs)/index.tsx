import { Bell } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import CalendarIcon from "@/assets/icons/CalendarIcon";
import CampIcon from "@/assets/icons/CampIcon";
import GroupIcon from "@/assets/icons/GroupIcon";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import { ActivityPreviews } from "@/components/shared/ActivityPreview";
import { IndexTopMenu } from "@/components/shared/IndexTopMenu";
import { ProviderCards } from "@/components/shared/ProviderCards";
import Text from "@/components/text/Text";
import { UsersQueries } from "@/data/users";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Home() {
  const { data: currentUser } = UsersQueries.useGetCurrentUser();
  const [value, setValue] = useState<string>("");

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleActivitySwitch = (activity: string) => {
    console.log(activity);
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
    >
      <View style={styles.topElipsis} />
      <View style={styles.header}>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          marginTop="4"
          paddingTop="10"
          gap="4"
        >
          <Box
            flexDirection="row"
            width="100%"
            justifyContent="center"
            position="relative"
          >
            <Text
              variant="title-2-default"
              color="interactive-primary-idle"
              textAlign="center"
            >
              Hi there, {currentUser?.user_name || "there"}!
            </Text>
            <Box
              position="absolute"
              right={20}
              top={4}
            >
              <IconButton
                variant="secondary"
                iconColor="button-tertiary-text"
                icon={
                  <NotificationIcon
                    width={24}
                    height={24}
                  />
                }
                onPress={() => {}}
                style={styles.notificationButton}
              />
            </Box>
          </Box>
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Input
              label=""
              leftElement={
                <SearchIcon
                  width={21}
                  height={21}
                />
              }
              placeholder="Search activity"
              variant="default"
              value={value}
              onChangeText={onChange}
            />
            <Box
              position="absolute"
              right={10}
              top={4}
            >
              <IconButton
                variant="secondary"
                iconColor="button-tertiary-text"
                icon={
                  <GroupIcon
                    width={24}
                    height={24}
                  />
                }
                onPress={() => {}}
                style={styles.settingsButton}
              />
            </Box>
          </Box>
        </Box>

        <IndexTopMenu />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Box
          paddingHorizontal="6"
          marginTop="6"
          marginBottom="2"
        >
          <Text variant="display-3-prominent-1">Quick Search</Text>
        </Box>
        <ActivityPreviews />

        <Box
          paddingHorizontal="6"
          marginTop="6"
          marginBottom="2"
        >
          <Text variant="display-3-prominent-1">Featured Providers</Text>
        </Box>
        <ProviderCards />
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    zIndex: 1,
  },
  topElipsis: {
    position: "absolute",
    top: -300,
    left: -68,
    width: 550,
    height: 535,
    backgroundColor: "#F5C344",
    borderRadius: 325, // height / 2 for a proper ellipse
  },
  notificationButton: {
    backgroundColor: "#ffffff",
    padding: 0,
    width: 38,
    height: 38,
  },
  settingsButton: {
    backgroundColor: "#FFD035",
    padding: 6,
    marginTop: 5,
    marginRight: -2,
  },
  topIcon: {
    width: 28,
    height: 28,
  },
  scrollContent: {
    flexGrow: 1,
  },
  horizontalScrollContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  iconButtonContainer: {
    cursor: "pointer",
  },
  iconButton: {
    minHeight: 66,
    width: 66,
    boxShadow: "0px 3px 9px 9px rgba(0,0,0,0.1)",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
