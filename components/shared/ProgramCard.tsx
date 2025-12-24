import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import HeartIcon from "@/assets/icons/HeartIcon";
import Box from "@/components/Box";
import Image from "@/components/Image";
import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";
import { MockIcons } from "@/data/mock/activities";
import type { ProgramModels } from "@/openapi/program/program.models";
import { StringUtils } from "@/utils/string.utils";

import IconButton from "../buttons/IconButton";
import PillButton from "../buttons/PillButton";

interface ProgramCardProps {
  data: ProgramModels.SearchProgramsResponseDTO;
  callback?: (id: string | number) => void;
  isFavored: boolean;
}

export const ProgramCard = ({ data, callback, isFavored }: ProgramCardProps) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push(`/program-details?id=${data.programId}`);
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
        style={styles.containerActivity}
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
              source={data.iconImageUrl ? data.iconImageUrl : MockIcons[Math.floor(Math.random() * 10)]}
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
                {data.title}
              </Text>
              <Box
                flexDirection="row"
                gap="2"
              >
                <Text
                  numberOfLines={1}
                  maxWidth={140}
                  variant="variant-4"
                >
                  {data.providerName}
                </Text>
                {data.locationName && (
                  <Text
                    variant="variant-4"
                    color="text-disabled"
                    numberOfLines={1}
                    maxWidth={120}
                    ellipsizeMode="tail"
                  >{`| ${data.locationName}`}</Text>
                )}
              </Box>
            </Box>
          </Box>
          <IconButton
            variant="transparent"
            onPress={() => callback?.(data.programId)}
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
          {data?.grades?.length > 0 && (
            <Box
              flexDirection="row"
              gap="2"
              flexWrap={"wrap"}
              maxWidth={"80%"}
            >
              {StringUtils.compressGrades(data.grades).map((tag) => {
                return (
                  <PillButton
                    label={tag}
                    onPress={() => {}}
                  />
                );
              })}
            </Box>
          )}
          {data.priceAmount > 0 ? (
            <PillButton
              label={`${data.priceCurrency}${data.priceAmount}`}
              onPress={() => {}}
              variant="active"
            />
          ) : null}
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
