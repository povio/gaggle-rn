import type { FavoriteModels } from "@/openapi/favorite/favorite.models";
import { FavoriteQueries } from "@/openapi/favorite/favorite.queries";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

export const useProgramFavorite = (programId?: string) => {
  const unfavoriteMutation = FavoriteQueries.useUnProgram();
  const favoriteMutation = FavoriteQueries.useProgram();

  const { data: favoriteSessionList } = FavoriteQueries.useListUserIds();

  const favoritedList = favoriteSessionList?.items ?? [];
  const favoritedSessionsList = favoritedList?.filter((item) => item.sessionId).map((item) => item.sessionId) ?? [];
  const favoritedProgramsList = favoritedList
    .map(({ programId }) => programId)
    .filter((id, index, self) => self.indexOf(id) === index);

  const isFavorited = favoritedList?.some((item) => item.programId === programId) ?? false;

  const toggleFavorite = (data: FavoriteModels.UnfavoriteProgramRequestDTO) => {
    if (isFavorited) {
      unfavoriteMutation.mutate(
        { data },
        {
          onSuccess: async () => {},
          onError: (error) => {
            const errorMessage = RestUtils.extractServerErrorMessage(error);
            showToast({
              variant: "error",
              message: errorMessage || "Failed to unfavorite",
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
              message: errorMessage || "Failed to favorite",
            });
          },
        },
      );
    }
  };

  return {
    isFavorited,
    favoritedList,
    favoritedSessionsList,
    favoritedProgramsList,
    toggleFavorite,
    isLoading: unfavoriteMutation.isPending || favoriteMutation.isPending,
  };
};
