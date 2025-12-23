import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import StarIcon from "@/assets/icons/StarIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import PillButton from "@/components/buttons/PillButton";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import LoadingScreen from "@/components/LoadingScreen";
import { ReviewComment } from "@/components/shared/ReviewComment";
import { ReviewStars } from "@/components/shared/ReviewStars";
import Text from "@/components/text/Text";
import { useUserStore } from "@/modules/user/userStore";
import { ProgramQueries } from "@/openapi/program/program.queries";
import { ProgramReviewQueries } from "@/openapi/programReview/programReview.queries";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

const details = ["Excellent", "Cheap", "Fun", "Value for Money", "Friendly", "Organized", "Kids love it!"];

export default function Review() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [starCount, setStarCount] = useState<number>(0);
  const [showReviewBtn, setShowReviewBtn] = useState(false);
  const [reviewText, setReviewText] = useState<string>("");
  const { user } = useUserStore();

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
      limit: 5,
    },
    { enabled: !!id },
  );

  const reviewMutations = ProgramReviewQueries.useCreate();
  const leftReview = false; // reviewsList?.items?.filter((review) => review.userId === user?.id);

  // Calculate overall rating and rating counts
  const ratingStats = useMemo(() => {
    if (!reviewsList?.items || reviewsList.items.length === 0) {
      return {
        overallRating: 0,
        totalReviews: 0,
        counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    reviewsList.items.forEach((review) => {
      const rating = Math.round(review.rating);
      if (rating >= 1 && rating <= 5) {
        counts[rating as 1 | 2 | 3 | 4 | 5]++;
        totalRating += review.rating;
      }
    });

    return {
      overallRating: totalRating / reviewsList.items.length,
      totalReviews: reviewsList.items.length,
      counts,
    };
  }, [reviewsList]);

  const handleBack = () => {
    router.push("/(app)/(tabs)");
    isProgramDataLoading;
  };

  const handleTextChange = (e: string) => {
    setReviewText(e);

    if (!showReviewBtn && e) {
      setShowReviewBtn(true);
      return;
    }

    if (!e) {
      setShowReviewBtn(false);
    }
  };

  const handleSubmit = () => {
    reviewMutations.mutate(
      {
        programId: id,
        data: {
          rating: starCount,
          content: reviewText,
        },
      },
      {
        onSuccess: async () => {
          router.push("/review-submitted");
        },
        onError: (error) => {
          const errorMessage = RestUtils.extractServerErrorMessage(error);
          showToast({
            variant: "error",
            message: errorMessage || "Failed to submit review",
          });
        },
      },
    );
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
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
              gap={"8"}
            >
              <Box
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignContent={"flex-start"}
              >
                <Text
                  textAlign="left"
                  color={"text-disabled"}
                  marginBottom="1"
                >
                  Overal Rating
                </Text>
                <Text
                  textAlign="left"
                  variant={"variant-16"}
                  marginTop={"1"}
                >
                  {ratingStats.overallRating.toFixed(1)}
                </Text>
                <ReviewStars
                  color="#FF6B00"
                  width={25}
                  height={20}
                  rating={ratingStats.overallRating}
                  count={ratingStats.totalReviews}
                />
              </Box>
              <Box
                flexDirection={"column"}
                flexGrow={1}
                gap="1"
              >
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingStats.counts[rating as 1 | 2 | 3 | 4 | 5];
                  const hasRatings = count > 0;

                  return (
                    <Box
                      key={rating}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={"2"}
                    >
                      <Text
                        color={hasRatings ? "text-default-primary" : "text-disabled"}
                        textAlign="left"
                      >
                        {rating}
                      </Text>
                      <Box
                        flexGrow={1}
                        backgroundColor={hasRatings ? "pill-default-text" : "text-disabled"}
                        height={2}
                      />
                      <Text
                        width={25}
                        textAlign="left"
                        color={hasRatings ? "text-default-primary" : "text-disabled"}
                      >
                        {count}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {leftReview ? (
              <Text
                variant="variant-8"
                textAlign="left"
              >
                Thank you for leaving a review!
              </Text>
            ) : (
              <Box
                width={"100%"}
                flexDirection={"column"}
                gap="2"
              >
                <Box width={"100%"}>
                  <Input
                    width={"100%"}
                    type="textArea"
                    label=""
                    value={reviewText}
                    backgroundColor={"background-light-gray"}
                    borderRadius="2xl"
                    paddingTop={"2"}
                    placeholder="Write a review"
                    borderColor="transparent"
                    onChangeText={handleTextChange}
                  />
                </Box>

                <Box
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  gap={"4"}
                >
                  <Box
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Text
                      variant="variant-13-prominent"
                      textAlign="left"
                    >
                      Rate
                    </Text>
                    <Box
                      flexDirection={"row"}
                      alignItems={"center"}
                      gap="1"
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconButton
                          key={star}
                          icon={
                            <StarIcon
                              width={25}
                              height={20}
                            />
                          }
                          variant="transparent"
                          iconColor={star <= starCount ? "interactive-active" : "text-disabled"}
                          onPress={() => setStarCount(star)}
                          iconSize={undefined}
                          style={{ padding: 0 }}
                        />
                      ))}
                    </Box>
                  </Box>
                  {showReviewBtn && (
                    <Button
                      label="SUBMIT YOUR REVIEW"
                      onPress={handleSubmit}
                      variant="primary"
                      textVariant="variant-2-prominent"
                    />
                  )}
                </Box>
              </Box>
            )}

            <Box>
              <Text
                variant="variant-13-prominent"
                textAlign="left"
                paddingBottom={"2"}
              >
                Details
              </Text>
              <Box
                flexDirection={"row"}
                flexWrap={"wrap"}
                gap={"2"}
              >
                {details.map((item) => (
                  <PillButton
                    label={item}
                    onPress={() => {}}
                    variant="outlined"
                    textVariant="variant-11"
                  />
                ))}
              </Box>
            </Box>
            <Box
              flex={1}
              width={"100%"}
              paddingTop={"2"}
            >
              <Text
                variant="variant-13-prominent"
                textAlign="left"
                paddingBottom={"2"}
              >
                Latest Reviews
              </Text>
              {reviewsList && reviewsList?.totalItems > 0 ? (
                reviewsList?.items.map((review) => <ReviewComment data={review} />)
              ) : (
                <Text
                  textAlign="left"
                  paddingBottom={"2"}
                >
                  No reviews yet
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
