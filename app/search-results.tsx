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
import {
  type FilterValues,
  type MinMaxFilter,
  SearchFiltersEnum,
  useFilterStore,
} from "@/modules/search/stores/filterStore";
import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";
import { ProgramQueries } from "@/openapi/program/program.queries";

const getFilterList = () => {
  return [
    SearchFiltersEnum.enum.dayOfWeek,
    SearchFiltersEnum.enum.price,
    SearchFiltersEnum.enum.rating,
    SearchFiltersEnum.enum.grades,
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
  const { getAllFilters } = useFilterStore();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const debouncedSearchQuery = useDebounce(value, 400);

  useEffect(() => {
    if (query) {
      setValue(query);
    }
  }, []);

  const { toggleFavorite, favoritedProgramsList } = useProgramFavorite();
  console.log("appliedFilters", appliedFilters);
  const { data: searchResults, isLoading } = ProgramQueries.useSearch(
    {
      limit: 20,
      filter: {
        q: debouncedSearchQuery,
        ...appliedFilters,
      },
    },
    {
      enabled: true,
      placeholderData: (previousData) => previousData,
    },
  );

  const handleSearch = () => {
    const currentFilters = getAllFilters();
    console.log("currentFilters", currentFilters);

    let formatedFilters = {
      ...currentFilters,
    };

    if (currentFilters.price) {
      const price = currentFilters.price as MinMaxFilter;
      const priceRange = {
        priceMin: price.min,
        priceMax: price.max,
      };

      delete formatedFilters.price;

      formatedFilters = {
        ...formatedFilters,
        ...priceRange,
      };
    }

    if (currentFilters.duration) {
      formatedFilters = {
        ...formatedFilters,
        duration: parseInt(currentFilters.duration as string, 10),
      };
    }

    if (currentFilters.dayOfWeek) {
      formatedFilters = {
        ...formatedFilters,
        dayOfWeek: [currentFilters.dayOfWeek as string],
      };
    }

    if (currentFilters.grades) {
      formatedFilters = {
        ...formatedFilters,
        grades: [currentFilters.grades as string],
      };
    }

    console.log("formatedFilters", formatedFilters);
    setAppliedFilters(formatedFilters as FilterValues);
    setDrawerVisible(false);
  };
  const { clearAllFilters } = useFilterStore();

  const handleBack = () => {
    clearAllFilters();
    router.push("/(app)/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topElipsis} />
      <View style={styles.header}>
        <Box
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
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
