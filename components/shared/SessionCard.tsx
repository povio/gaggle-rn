import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import HeartIcon from "@/assets/icons/HeartIcon";
import Box from "@/components/Box";
import Image from "@/components/Image";
import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";
import { MockIcons } from "@/data/mock/activities";
import { FavoriteQueries } from "@/openapi/favorite/favorite.queries";
import type { ProgramModels } from "@/openapi/program/program.models";
import { DateUtils } from "@/utils/date.utils";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

import IconButton from "../buttons/IconButton";
import PillButton from "../buttons/PillButton";

interface SessionCardProps {
  data: ProgramModels.SessionInputDTO;
  callback?: (id: string | number) => void;
  isFavored: boolean;
  programId: string;
}

export const SessionCard = ({ data, callback, isFavored, programId }: SessionCardProps) => {
  const router = useRouter();

  const unfavoriteMutation = FavoriteQueries.useUnProgram();
  const favoriteMutation = FavoriteQueries.useProgram();

  const handleFavoriteSession = (sessionId: string | undefined | null) => {
    if (!sessionId) return;

    const data = {
      programId,
      sessionId,
    };

    if (isFavored) {
      unfavoriteMutation.mutate(
        { data },
        {
          onSuccess: async () => {},
          onError: (error) => {
            const errorMessage = RestUtils.extractServerErrorMessage(error);
            showToast({
              variant: "error",
              message: errorMessage || "Failed to unfollow",
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

  const handleCardPress = () => {
    router.push(`/program-details?id=${data.id}`);
  };

  return (
    <Pressable
      onPress={handleCardPress}
      width={"100%"}
    >
      <Box
        flexDirection="column"
        gap="4"
        justifyContent="center"
        alignItems="center"
        style={styles.containerSession}
        borderRadius="l"
        width="100%"
        paddingHorizontal="3"
        paddingVertical="4"
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Box
            flexDirection="row"
            gap="2"
          >
            <Image
              source={MockIcons[Math.floor(Math.random() * 10)]}
              style={styles.activityIcon}
              contentFit="contain"
            />
            <Box
              flexDirection="column"
              gap="1"
            >
              <Text
                variant="variant-3-prominent"
                numberOfLines={1}
                ellipsizeMode="tail"
                maxWidth={250}
              >
                {data.name}
              </Text>
              <Box
                flexDirection="row"
                gap="2"
              >
                {data?.startDate && data?.endDate && (
                  <Text variant="variant-4">{`${DateUtils.formatIsoDate(data.startDate, "MMM d")} - ${DateUtils.formatIsoDate(data.endDate, "MMM d")}`}</Text>
                )}
                {data.location && (
                  <Text
                    variant="variant-4"
                    color="text-disabled"
                    numberOfLines={1}
                    maxWidth={170}
                    ellipsizeMode="tail"
                  >{`| ${data.location}`}</Text>
                )}
              </Box>
              {data.startDate && data.endDate && (
                <Box
                  flexDirection="row"
                  gap="1"
                >
                  <Text
                    variant="variant-4"
                    color="text-disabled"
                  >
                    Start:{" "}
                    <Text
                      color="button-text-color"
                      variant="variant-4"
                    >
                      {DateUtils.formatIsoDate(data.startDate, "HH:mm a")}
                    </Text>
                  </Text>
                  <Text
                    variant="variant-4"
                    color="text-disabled"
                  >
                    |
                  </Text>
                  <Text
                    variant="variant-4"
                    color="text-disabled"
                  >
                    End:{" "}
                    <Text
                      color="button-text-color"
                      variant="variant-4"
                    >
                      {DateUtils.formatIsoDate(data.endDate, "HH:mm a")}
                    </Text>
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
          <IconButton
            variant="transparent"
            onPress={() => handleFavoriteSession(data.id)}
            style={styles.heartIcon}
            iconColor={isFavored ? "interactive-active" : "interactive-icon-inactive"}
            icon={
              <HeartIcon
                width={25}
                height={22}
              />
            }
          />
        </Box>
        <Box
          flexDirection="row"
          gap="2"
          width="100%"
          justifyContent="space-between"
        >
          {data?.tags?.length > 0 && (
            <Box
              flexDirection="row"
              gap="2"
            >
              {data.tags.map((tag) => {
                return (
                  <PillButton
                    label={tag}
                    onPress={() => {}}
                  />
                );
              })}
            </Box>
          )}
          {data.priceAmount && (
            <PillButton
              label={`${data.priceCurrency}${data.priceAmount}`}
              onPress={() => {}}
              variant="active"
            />
          )}
        </Box>
      </Box>
    </Pressable>
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
  heartIcon: {
    padding: 0,
  },
  containerActivity: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 15px 1px",
  },
  containerSession: {
    borderWidth: 1,
    borderColor: "#EFF0F6",
  },
});
