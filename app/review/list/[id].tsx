import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import Image from "@/components/Image";
import { ReviewComment } from "@/components/shared/ReviewComment";
import Text from "@/components/text/Text";
import { ProgramQueries } from "@/openapi/program/program.queries";
import { ProgramReviewQueries } from "@/openapi/programReview/programReview.queries";

export default function ReviewList() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleBack = () => {
    router.push(`/program-details?id=${id}`);
  };

  const { data: programData, isLoading: isProgramDataLoading } = ProgramQueries.useGetDetails(
    {
      programId: id,
    },
    {
      enabled: !!id,
    },
  );

  const { data: reviewsList, isLoading } = ProgramReviewQueries.useList(
    {
      programId: id,
      limit: 20,
    },
    { enabled: !!id },
  );

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
            alignItems="flex-start"
            marginTop="4"
            gap="5"
          >
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-start"
              position="relative"
              width="100%"
            >
              <Box
                justifyContent="center"
                alignContent="center"
                backgroundColor="elevation-background"
                width={38}
                height={38}
                borderRadius="full"
                style={styles.headerContainer}
              >
                <IconButton
                  icon={<ArrowLeftIcon />}
                  onPress={handleBack}
                  variant="transparent"
                  style={styles.headerIcon}
                />
              </Box>
            </Box>
            <Text
              variant="variant-15-prominent"
              textAlign="left"
            >
              {programData?.name}
            </Text>
            <Text
              variant="variant-8"
              textAlign="left"
              marginBottom="2"
            >
              {programData?.providerName}
            </Text>
            <Text
              variant="variant-13-prominent"
              textAlign="left"
              marginBottom="1"
            >
              Reviews
            </Text>
            <Box
              flex={1}
              width={"100%"}
              paddingTop={"2"}
            >
              {reviewsList && reviewsList?.totalItems > 0 ? (
                reviewsList?.items?.map((review) => <ReviewComment data={review} />)
              ) : (
                <Text
                  textAlign="left"
                  marginBottom="1"
                >
                  This program has no reviews yet.
                </Text>
              )}
            </Box>
          </Box>
        </View>
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
  headerIcon: {
    backgroundColor: "#fff",
  },
  headerContainer: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px 3px",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
});
