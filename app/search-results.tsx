import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import GroupIcon from "@/assets/icons/GroupIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import Input from "@/components/input/Input";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProgramCard } from "@/components/shared/ProgramCard";
import { SearchPills } from "@/components/shared/SearchPills";
import { useDebounce } from "@/hooks/useDebounce";
import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";
import { FavoriteQueries } from "@/openapi/favorite/favorite.queries";
import { ProgramQueries } from "@/openapi/program/program.queries";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

export default function SearchResults() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();
  const [value, setValue] = useState<string>("");
  const { filter } = useSearchStore();

  const debouncedSearchQuery = useDebounce(value, 300);
  const unfavoriteMutation = FavoriteQueries.useUnProgram();
  const favoriteMutation = FavoriteQueries.useProgram();

  useEffect(() => {
    if (query) {
      setValue(query);
    }
  }, [query]);

  const { data: favoritesData, isLoading: isFavoritesDataLoading } = FavoriteQueries.useListUserIds();

  const favIds = favoritesData?.items.map((item) => item.programId);

  const { data: searchResults, isLoading } = ProgramQueries.useSearch(
    {
      limit: 20,
      filter: debouncedSearchQuery ? { q: debouncedSearchQuery } : undefined,
    },
    {
      enabled: true,
      placeholderData: (previousData) => previousData,
    },
  );

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleBack = () => {
    router.push("/(app)/(tabs)");
  };

  const handleFavoriteSession = (programId: string) => {
    const data = {
      programId,
    };

    const isFav = favIds?.find((item) => item === programId);

    if (isFav !== undefined) {
      unfavoriteMutation.mutate(
        { data },
        {
          onSuccess: async () => {},
          onError: (error) => {
            const errorMessage = RestUtils.extractServerErrorMessage(error);
            showToast({
              variant: "error",
              message: errorMessage || "Failed to save to favorites",
            });
          },
        },
      );
    } else {
      favoriteMutation.mutate(
        { data },
        {
          onSuccess: async () => {},
          onError: (error) => {
            const errorMessage = RestUtils.extractServerErrorMessage(error);
            showToast({
              variant: "error",
              message: errorMessage || "Failed to save favorite",
            });
          },
        },
      );
    }
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
          <SearchPills results={searchResults?.items} />
        </Box>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!searchResults?.items || searchResults.items.length === 0 || filter !== FilterId.ALL ? (
          <EmptyState callback={handleBack} />
        ) : (
          <Box
            flexDirection="column"
            gap="3"
            paddingHorizontal="5"
            paddingVertical="4"
          >
            {searchResults.items.map((item) => (
              <ProgramCard
                key={item.programId}
                data={item}
                callback={handleFavoriteSession}
                isFavored={favIds?.includes(item.programId) ? true : false}
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
