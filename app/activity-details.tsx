import { useRouter } from "expo-router";
import { useState } from "react";
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

interface ActivityDetailsProps {
  id: string;
}

export default function ActivityDetails({ id }: ActivityDetailsProps) {
  const router = useRouter();
  const [fav, setFav] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean>(false);
  const [followCount, setFllowCount] = useState<number>(99);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleBack = () => {
    router.push("/(app)/(tabs)");
  };

  const handleFavorite = () => {
    setFav(!fav);
  };

  const handleFallowProvider = () => {
    setFllowCount((state) => {
      if (follow) {
        return state - 1;
      }

      return state + 1;
    });
    setFollow(!follow);
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
                  source={require("@/assets/illustrations/camp.svg")}
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
                  iconColor={!fav ? "interactive-icon-inactive" : "interactive-active"}
                  onPress={handleFavorite}
                  variant="transparent"
                  style={styles.headerIcon}
                />
              </Box>
            </Box>
            <Text
              variant="variant-5-prominent"
              textAlign="center"
            >
              Mock data activity page
            </Text>
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap="2"
            >
              <PillButton
                label="Test"
                onPress={() => {}}
                variant="primary"
                textVariant="variant-11"
              />
              <PillButton
                label="Kids 1-4"
                onPress={() => {}}
                variant="primary"
                textVariant="variant-11"
              />
              <PillButton
                label="Drawing"
                onPress={() => {}}
                variant="primary"
                textVariant="variant-11"
              />
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
                Some provider name
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
            flex={1}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae tempor ex. Suspendisse consequat sapien
              at laoreet blandit. Proin vel elit feugiat, tempus augue eget, vehicula metus. Proin vel nisl bibendum,
              laoreet ligula et, feugiat mauris. Integer volutpat volutpat est aliquam ultrices. Nulla molestie
              vulputate ullamcorper. {"\n\n"} Fusce non dolor venenatis mi venenatis eleifend. Etiam aliquam ornare
              felis, ac eleifend enim blandit sit amet. Phasellus auctor porttitor erat vel tempor. Praesent ultricies
              mi a placerat interdum. Donec nisl orci, finibus quis rhoncus dignissim, luctus ac nibh. Pellentesque quis
              consectetur ligula, a vestibulum sapien.
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

          <ReviewSegment />
        </Box>
        <BookingDrawer />
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
  iconButton: {
    minHeight: 66,
    width: 66,
    boxShadow: "0px 3px 9px 9px rgba(0,0,0,0.1)",
  },
});
