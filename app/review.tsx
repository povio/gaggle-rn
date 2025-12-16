import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import StarIcon from "@/assets/icons/StarIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import PillButton from "@/components/buttons/PillButton";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import { ReviewComment } from "@/components/shared/ReviewComment";
import { ReviewStars } from "@/components/shared/ReviewStars";
import Text from "@/components/text/Text";

interface ReviewProps {
  id: string;
}

const details = ["Excellent", "Cheap", "Fun", "Value for Money", "Friendly", "Organized", "Kids love it!"];

export default function Review({ id }: ReviewProps) {
  const router = useRouter();
  const [starCount, setStarCount] = useState<number>(0);
  const [showReviewBtn, setShowReviewBtn] = useState(false);

  const handleBack = () => {
    router.push("/(app)/(tabs)");
  };

  const handleTextChange = (e) => {
    if (!showReviewBtn && e) {
      setShowReviewBtn(true);
      return;
    }

    if (!e) {
      setShowReviewBtn(false);
    }
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
              Musical Production Camp JR: Disney’s 101 Dalmations
            </Text>
            <Text
              variant="variant-8"
              textAlign="left"
              marginBottom="2"
            >
              Provider text goes here
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
                  5.0
                </Text>
                <ReviewStars
                  color="#FF6B00"
                  width={25}
                  height={20}
                />
              </Box>
              <Box
                flexDirection={"column"}
                flexGrow={1}
                gap="1"
              >
                <Box
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"2"}
                >
                  <Text textAlign="left">5</Text>
                  <Box
                    flexGrow={1}
                    backgroundColor={"pill-default-text"}
                    height={2}
                  />
                  <Text
                    width={25}
                    textAlign="left"
                  >
                    104
                  </Text>
                </Box>
                <Box
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"2"}
                >
                  <Text
                    color={"text-disabled"}
                    textAlign="left"
                  >
                    4
                  </Text>
                  <Box
                    flexGrow={1}
                    backgroundColor={"text-disabled"}
                    height={2}
                  />
                  <Text
                    width={25}
                    textAlign="left"
                    color={"text-disabled"}
                  >
                    0
                  </Text>
                </Box>
                <Box
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"2"}
                >
                  <Text
                    color={"text-disabled"}
                    textAlign="left"
                  >
                    3
                  </Text>
                  <Box
                    flexGrow={1}
                    backgroundColor={"text-disabled"}
                    height={2}
                  />
                  <Text
                    color={"text-disabled"}
                    textAlign="left"
                    width={25}
                  >
                    0
                  </Text>
                </Box>
                <Box
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"2"}
                >
                  <Text
                    color={"text-disabled"}
                    textAlign="left"
                  >
                    2
                  </Text>
                  <Box
                    flexGrow={1}
                    backgroundColor={"text-disabled"}
                    height={2}
                  />
                  <Text
                    color={"text-disabled"}
                    textAlign="left"
                    width={25}
                  >
                    0
                  </Text>
                </Box>
                <Box
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={"2"}
                >
                  <Text
                    color={"text-disabled"}
                    textAlign="left"
                  >
                    1
                  </Text>
                  <Box
                    flexGrow={1}
                    backgroundColor={"text-disabled"}
                    height={2}
                  />
                  <Text
                    color={"text-disabled"}
                    textAlign="left"
                    width={25}
                  >
                    0
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box width={"100%"}>
              <Input
                width={"100%"}
                type="textArea"
                label=""
                backgroundColor={"background-light-gray"}
                placeholder="Write a review"
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
                  onPress={() => {}}
                  variant="primary"
                  textVariant="variant-2-prominent"
                />
              )}
            </Box>

            <Box>
              <Text
                variant="variant-13-prominent"
                textAlign="left"
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
              <ReviewComment />
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
