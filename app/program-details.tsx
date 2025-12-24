import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import PillButton from "@/components/buttons/PillButton";
import Image from "@/components/Image";
import { ActivityPreviews } from "@/components/shared/ActivityPreview";
import { BookingDrawer } from "@/components/shared/BookingDrawer";
import ReviewSegment from "@/components/shared/ReviewSegment";
import Text from "@/components/text/Text";
import { useProgramFavorite } from "@/hooks/useProgramFavorite";
import { ProgramQueries } from "@/openapi/program/program.queries";
import { StringUtils } from "@/utils/string.utils";

export default function ProgramDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const programId = id || "";

  const { isFavorited, toggleFavorite } = useProgramFavorite(programId);

  const { data: programData } = ProgramQueries.useGetDetails(
    {
      programId: id || "",
    },
    {
      enabled: !!id,
    },
  );

  const handleBack = () => {
    router.push("/(app)/(tabs)");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require("@/assets/backgrounds/elipse_top_1.svg")}
          style={styles.topElipsis}
          contentFit="contain"
        />
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
              justifyContent="space-between"
              alignItems="flex-start"
              position="relative"
              paddingHorizontal="5"
              width="100%"
              height={140}
            >
              <Box
                justifyContent="center"
                alignContent="center"
                backgroundColor="elevation-background"
                width={38}
                height={38}
                borderRadius="full"
                style={styles.iconContainer}
              >
                <IconButton
                  icon={<ArrowLeftIcon />}
                  onPress={handleBack}
                  variant="transparent"
                  style={styles.headerIcon}
                />
              </Box>
              <Box
                alignSelf="flex-end"
                style={styles.providerImageBg}
                borderRadius="full"
                overflow="hidden"
              >
                <Image
                  source={programData?.iconImageUrl || require("@/assets/illustrations/camp.svg")}
                  style={styles.providerImage}
                  contentFit="contain"
                />
              </Box>
              <Box
                justifyContent="center"
                alignContent="center"
                backgroundColor="elevation-background"
                width={38}
                height={38}
                borderRadius="full"
                style={styles.iconContainer}
              >
                <IconButton
                  icon={<HeartIcon />}
                  iconColor={isFavorited ? "interactive-active" : "interactive-icon-inactive"}
                  onPress={() =>
                    toggleFavorite({
                      programId,
                    })
                  }
                  variant="transparent"
                  style={styles.headerIcon}
                />
              </Box>
            </Box>
            <Text
              variant="variant-5-prominent"
              textAlign="center"
            >
              {programData?.name || "Mock data activity page"}
            </Text>
            <Box
              paddingHorizontal={"5"}
              width={"100%"}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tagsScrollContent}
              >
                {programData &&
                  programData?.tags.map((tag, index) => (
                    <PillButton
                      key={index}
                      label={StringUtils.capitalize(tag.name.replace("_", " "))}
                      onPress={() => {}}
                      variant="primary"
                      textVariant="variant-11"
                    />
                  ))}
              </ScrollView>
            </Box>
            <Box
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"1"}
            >
              <Text
                variant="variant-7"
                textAlign="center"
                color="interactive-icon-disabled"
              >
                Provider:
              </Text>
              <Text
                variant="variant-7"
                textAlign="center"
              >
                {programData?.providerName || "Some provider name"}
              </Text>
            </Box>
          </Box>
        </View>
        <Box
          paddingHorizontal="5"
          paddingTop="4"
          paddingBottom="10"
          gap="2"
        >
          <Box
            flexDirection={"column"}
            gap="2"
          >
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              About
            </Text>
            <Text
              variant="variant-7"
              textAlign="left"
            >
              {programData?.description}
            </Text>
          </Box>
          <Box
            flexDirection={"column"}
            gap="2"
          >
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Our take
            </Text>
            <Text
              variant="variant-7"
              textAlign="left"
            >
              {programData?.ourTake}
            </Text>
          </Box>
          <Box>
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Parents also choose
            </Text>
            <ActivityPreviews />
          </Box>

          {programData && (
            <ReviewSegment
              rating={programData?.avgRating}
              count={programData?.reviewCount}
              id={programData?.id}
            />
          )}
        </Box>
        {programData && <BookingDrawer programData={programData} />}
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
    top: -10,
    left: 0,
    width: "100%",
    height: 150,
  },
  reviewBtn: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    marginTop: 15,
    marginBottom: 20,
  },
  iconContainer: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px 3px",
  },
  headerIcon: {
    padding: 0,
    alignSelf: "center",
  },
  providerImage: {
    width: 113,
    height: 113,
  },
  providerImageBg: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 11px 20px 11px",
  },
  scrollContent: {
    flexGrow: 1,
  },
  tagsScrollContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconButton: {
    minHeight: 66,
    width: 66,
    boxShadow: "0px 3px 9px 9px rgba(0,0,0,0.1)",
  },
});
