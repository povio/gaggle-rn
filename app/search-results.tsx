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
import { Loader } from "@/components/shared/Loader";
import { ProgramCard } from "@/components/shared/ProgramCard";
import { SearchFilterDrawer } from "@/components/shared/SearchFilterDrawer";
import { SearchPills } from "@/components/shared/SearchPills";
import { useDebounce } from "@/hooks/useDebounce";
import { useProgramFavorite } from "@/hooks/useProgramFavorite";
import { type FilterValues, SearchFiltersEnum, useFilterStore } from "@/modules/search/stores/filterStore";
import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";
import type { ProgramModels } from "@/openapi/program/program.models";
import { ProgramQueries } from "@/openapi/program/program.queries";

const transformFiltersForAPI = (filters: FilterValues): Partial<ProgramModels.SearchProgramsFilterDto> => {
  const apiFilters: Partial<ProgramModels.SearchProgramsFilterDto> = {};

  // Transform price (single value) to priceMax
  if (filters.price) {
    apiFilters.priceMax = filters.price as number;
  }

  // Transform rating (array of checkbox values) to single number (highest rating selected)
  if (filters.rating && Array.isArray(filters.rating)) {
    const ratings = filters.rating.map((r) => parseInt(r)).filter((r) => !isNaN(r));
    if (ratings.length > 0) {
      apiFilters.rating = Math.max(...ratings);
    }
  }

  // Transform dayOfWeek (already an array of strings)
  if (filters.dayOfWeek && Array.isArray(filters.dayOfWeek)) {
    apiFilters.dayOfWeek = filters.dayOfWeek as string[];
  }

  // Transform startDate (Date to ISO string)
  if (filters.startDate) {
    apiFilters.startDate =
      filters.startDate instanceof Date ? filters.startDate.toISOString() : (filters.startDate as string);
  }

  // Transform duration (string to number)
  if (filters.duration) {
    const durationNum = parseInt(filters.duration as string);
    if (!isNaN(durationNum)) {
      apiFilters.duration = durationNum;
    }
  }

  return apiFilters;
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

export default function SearchResults() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();
  const [value, setValue] = useState<string>("");
  const { filter } = useSearchStore();
  const { getSelectedFilters } = useFilterStore();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
  const debouncedSearchQuery = useDebounce(value, 400);

  useEffect(() => {
    if (query) {
      setValue(query);
    }
  }, [query]);

  const { toggleFavorite, favoritedProgramsList } = useProgramFavorite();

  const { data: searchResults, isLoading } = ProgramQueries.useSearch(
    {
      limit: 20,
      filter: {
        q: debouncedSearchQuery,
        ...transformFiltersForAPI(appliedFilters),
      },
    },
    {
      enabled: true,
      placeholderData: (previousData) => previousData,
    },
  );

  const handleSearch = () => {
    const currentFilters = getSelectedFilters();
    setAppliedFilters(currentFilters as FilterValues);
    setDrawerVisible(false);
  };

  const handleBack = () => {
    router.push("/(app)/(tabs)");
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
                onChangeText={(e) => setValue(e)}
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
          <SearchPills results={searchResults?.items} />
        </Box>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading && (
          <Box
            width={"100%"}
            height={"100%"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Loader
              width={45}
              height={45}
            />
          </Box>
        )}
        {!isLoading && (!searchResults?.items || searchResults.items.length === 0 || filter !== FilterId.ALL) ? (
          <EmptyState callback={handleBack} />
        ) : (
          <Box
            flexDirection="column"
            gap="3"
            paddingHorizontal="5"
            paddingVertical="4"
          >
            {searchResults?.items?.map((item) => (
              <ProgramCard
                key={item.programId}
                data={item}
                callback={() => toggleFavorite({ programId: item.programId })}
                isFavored={favoritedProgramsList.includes(item.programId) ?? false}
              />
            ))}
          </Box>
        )}
        <SearchFilterDrawer
          isOpen={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          filters={getFilterList()}
          onCallback={handleSearch}
        />
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
