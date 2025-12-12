import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import GroupIcon from "@/assets/icons/GroupIcon";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import { EmptyState } from "@/components/shared/EmptyState";
import { SearchPills } from "@/components/shared/SearchPills";
import Text from "@/components/text/Text";
import { UsersQueries } from "@/data/users";
import { useSearchStore } from "@/modules/search/stores/searchStore";

export default function SearchResults() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();
  const { data: currentUser } = UsersQueries.useGetCurrentUser();
  const [value, setValue] = useState<string>("");
  const { filter, setFilter } = useSearchStore();

  useEffect(() => {
    if (query) {
      setValue(query);
    }
  }, [query]);

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleBack = () => {
    router.push("/(app)/(tabs)");
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
          marginTop="10"
          gap="4"
        >
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            position="relative"
            paddingHorizontal="5"
            width="100%"
          >
            <IconButton
              icon={<ArrowLeftIcon />}
              onPress={handleBack}
              variant="transparent"
              style={styles.backBtn}
            />
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
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
          <SearchPills />
        </Box>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <EmptyState callback={handleBack} />
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
    top: -150,
    left: -68,
    width: 300,
    height: 300,
    backgroundColor: "#F5C344",
    borderRadius: 325, // height / 2 for a proper ellipse
  },
  heading: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 30,
  },
  backBtn: {
    marginTop: 5,
    paddingRight: 8,
    paddingLeft: 2,
  },
  illustration: {
    width: 183,
    height: 183,
    marginBottom: 20,
  },
  settingsButton: {
    backgroundColor: "#FFD035",
    padding: 8,
    marginTop: 6,
    marginRight: -2,
  },
  scrollContent: {
    flexGrow: 1,
  },
  iconButton: {
    minHeight: 66,
    width: 66,
    boxShadow: "0px 3px 9px 9px rgba(0,0,0,0.1)",
  },
});
