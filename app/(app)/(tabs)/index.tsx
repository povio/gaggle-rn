import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import GroupIcon from "@/assets/icons/GroupIcon";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import Input from "@/components/input/Input";
import { ActivityPreviews } from "@/components/shared/ActivityPreview";
import { IndexTopMenu } from "@/components/shared/IndexTopMenu";
import { ProviderCards } from "@/components/shared/ProviderCards";
import { SearchFilterDrawer } from "@/components/shared/SearchFilterDrawer";
import Text from "@/components/text/Text";
import { SearchFiltersEnum } from "@/modules/search/stores/filterStore";
import { useUserStore } from "@/modules/user/userStore";

export default function Home() {
  const router = useRouter();
  const { settings } = useUserStore();
  const [value, setValue] = useState<string>("");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleSearch = () => {
    if (value.trim()) {
      router.push(`/search-results?query=${encodeURIComponent(value)}`);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const getFilterList = () => {
    return [
      SearchFiltersEnum.enum.dayOfWeek,
      SearchFiltersEnum.enum.price,
      SearchFiltersEnum.enum.rating,
      SearchFiltersEnum.enum.startTime,
      SearchFiltersEnum.enum.endDate,
      SearchFiltersEnum.enum.duration,
      SearchFiltersEnum.enum.toggleTester,
      SearchFiltersEnum.enum["embeded-toggle"],
    ];
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
              variant="variant-5-prominent"
              color="interactive-primary-idle"
              textAlign="center"
            >
              Hi there, {settings?.nickname || "unknown"}!
            </Text>
            <Box
              position="absolute"
              right={20}
              top={-15}
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
              textVariant="variant-11"
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
              onSubmitEditing={handleSearch}
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
                onPress={() => setDrawerVisible(true)}
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
          <Text variant="variant-6-prominent">Quick Search</Text>
        </Box>
        <Box paddingLeft="2">
          <ActivityPreviews />
        </Box>

        <Box
          paddingHorizontal="6"
          marginTop="6"
          marginBottom="2"
        >
          <Text variant="variant-6-prominent">Featured Providers</Text>
        </Box>
        <ProviderCards />
      </ScrollView>

      <SearchFilterDrawer
        isOpen={drawerVisible}
        onClose={handleCloseDrawer}
        filters={getFilterList()}
        onCallback={handleSearch}
      />
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
    borderRadius: 325,
  },
  notificationButton: {
    backgroundColor: "#ffffff",
    padding: 0,
    width: 38,
    height: 38,
  },
  settingsButton: {
    backgroundColor: "#FFD035",
    padding: 8,
    marginTop: 6,
    marginRight: -2,
  },
  topIcon: {
    width: 28,
    height: 28,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
