import { useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import Text from "@/components/text/Text";
import { FavoriteQueries } from "@/openapi/favorite/favorite.queries";
import type { ProgramModels } from "@/openapi/program/program.models";

import Box from "../Box";
import LoadingScreen from "../LoadingScreen";
import { ProgramCard } from "./ProgramCard";

export const FavoritesList = () => {
  const {
    data: favoritesData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = FavoriteQueries.useListUserInfinite({ limit: 20 });

  const { mutate: unfavorite } = FavoriteQueries.useUnProgram({
    onSuccess: () => {
      void refetch();
    },
  });

  const allItems = useMemo(() => {
    return favoritesData?.pages.flatMap((page) => page.items) ?? [];
  }, [favoritesData]);

  // Use mock data if server returns no items
  const displayData = allItems.length > 0 ? allItems : [];

  const handleUnfavorite = (id: number | string) => {
    // Find the item to get programId and sessionId
    const item = allItems.find((favorite) => favorite.programId === id);
    if (item) {
      unfavorite({
        data: {
          programId: item.programId,
          sessionId: item.sessionId,
        },
      });
    }
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      {displayData.length > 0 ? (
        displayData?.map((item) => {
          return (
            <ProgramCard
              data={item as ProgramModels.SearchProgramsResponseDTO}
              key={item?.programId || item?.id}
              callback={handleUnfavorite}
              isFavored
            />
          );
        })
      ) : (
        <Text
          variant="variant-11"
          color={"text-disabled"}
        >
          You do not have any favorites
        </Text>
      )}
      {isFetchingNextPage && (
        <Box paddingVertical="4">
          <ActivityIndicator size="large" />
        </Box>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  activityIcon: {
    width: 45,
    height: 45,
  },
  container: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 15px 1px",
  },
});
