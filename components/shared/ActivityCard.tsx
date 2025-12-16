import { useTheme } from "@shopify/restyle";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import HeartIcon from "@/assets/icons/HeartIcon";
import Box from "@/components/Box";
import Image from "@/components/Image";
import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";
import { DateUtils } from "@/utils/date.utils";
import type { Theme } from "@/utils/theme/restyleTheme";

import IconButton from "../buttons/IconButton";
import PillButton from "../buttons/PillButton";
import type { Card } from "./FavoritesList";

export enum ActivityCardVariant {
  ACTIVITY = "activity",
  SESSION = "session",
}
interface ActivityCardProps {
  data: Card;
  callback?: (id: string | number) => void;
  isFavored: boolean;
  variant?: ActivityCardVariant;
}

export const ActivityCard = ({
  data,
  callback,
  isFavored,
  variant = ActivityCardVariant.ACTIVITY,
}: ActivityCardProps) => {
  const theme = useTheme<Theme>();
  const router = useRouter();
  const isSession = variant === ActivityCardVariant.SESSION;

  const handleCardPress = () => {
    router.push(`/activity-details?id=${data.id}`);
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
        style={variant === ActivityCardVariant.ACTIVITY ? styles.containerActivity : styles.containerSession}
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
              source={data.icon}
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
                {data.label}
              </Text>
              <Box
                flexDirection="row"
                gap="2"
              >
                {isSession && data.startDate && data.endDate && (
                  <Text variant="variant-4">{`${DateUtils.formatIsoDate(data.startDate, "MMM d")} - ${DateUtils.formatIsoDate(data.endDate, "MMM d")}`}</Text>
                )}
                {!isSession && <Text variant="variant-4">{data.provider}</Text>}
                {data.location && (
                  <Text
                    variant="variant-4"
                    color="text-disabled"
                  >{`| ${data.location}`}</Text>
                )}
              </Box>
              {isSession && data.startDate && data.endDate && (
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
            onPress={() => callback?.(data.id)}
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
          {data.tags.length > 0 && (
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
          {data.price && (
            <PillButton
              label={data.price}
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
