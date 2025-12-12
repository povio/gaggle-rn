import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import GroupIcon from "@/assets/icons/GroupIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import Input from "@/components/input/Input";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Card } from "@/components/shared/FavoritesList";
import { SearchPills } from "@/components/shared/SearchPills";
import { cards } from "@/data/mock/activities";
import { useDebounce } from "@/hooks/useDebounce";
import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";

const searchActivities = (searchQuery: string, data: Card[]): Card[] => {
  if (!searchQuery.trim()) {
    return data;
  }

  const query = searchQuery.toLowerCase();

  return data.filter((item) => {
    const providerMatch = item.provider.toLowerCase().includes(query);
    const labelMatch = item.label.toLowerCase().includes(query);
    const locationMatch = item.location?.toLowerCase().includes(query);

    return providerMatch || labelMatch || locationMatch;
  });
};

export default function SearchResults() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();
  const { data: currentUser } = UsersQueries.useGetCurrentUser();
  const [value, setValue] = useState<string>("");
  const [activitiesData, setActivitiesData] = useState<Card[] | null>(null);
  const { filter } = useSearchStore();

  const debouncedSearchQuery = useDebounce(value, 300);

  useEffect(() => {
    if (query) {
      setValue(query);
    }
  }, [query]);

  useEffect(() => {
    setActivitiesData(cards);
  }, []);

  useEffect(() => {
    const filteredData = searchActivities(debouncedSearchQuery, cards);
    setActivitiesData(filteredData);
  }, [debouncedSearchQuery]);

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
          <SearchPills results={activitiesData} />
        </Box>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!activitiesData || activitiesData.length === 0 || filter !== FilterId.ALL ? (
          <EmptyState callback={handleBack} />
        ) : (
          <Box
            flexDirection="column"
            gap="3"
            paddingHorizontal="5"
            paddingVertical="4"
          >
            {activitiesData.map((item) => (
              <ActivityCard
                key={item.id}
                data={item}
                isFavored={false}
              />
            ))}
          </Box>
        )}
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
