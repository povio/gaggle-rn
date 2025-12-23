import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import CogIcon from "@/assets/icons/CogIcon";
import EditIcon from "@/assets/icons/EditIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import Image from "@/components/Image";
import LoadingScreen from "@/components/LoadingScreen";
import { ActivityCard } from "@/components/shared/ActivityCard";
import type { Card } from "@/components/shared/FavoritesList";
import { SmallProviderCard } from "@/components/shared/SmallProviderCard";
import Text from "@/components/text/Text";
import { cards } from "@/data/mock/activities";
import { useUserStore } from "@/modules/user/userStore";
import { UserQueries } from "@/openapi/user/user.queries";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState<Card[] | null>(null);
  const { user, settings } = useUserStore();

  const { data: userData } = UserQueries.useGetMyProfile();

  useEffect(() => {
    setData(cards.filter((_, index) => index < 4));
  }, []);

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleProfileSettings = () => {
    router.push("/profile-settings");
  };

  if (!data) {
    return <LoadingScreen />;
  }

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
                  icon={
                    <CogIcon
                      width={20}
                      height={20}
                    />
                  }
                  onPress={handleProfileSettings}
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
                  source={userData?.profileImageUrl || require("@/assets/illustrations/basketball.svg")}
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
                  icon={
                    <EditIcon
                      width={20}
                      height={20}
                    />
                  }
                  onPress={handleEditProfile}
                  variant="transparent"
                  style={styles.headerIcon}
                />
              </Box>
            </Box>
            <Text
              variant="variant-5-prominent"
              textAlign="center"
            >
              {settings?.nickname}
            </Text>
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap="4"
              paddingTop="3"
            >
              <Box
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2"
              >
                <Text
                  variant="variant-14"
                  textAlign="center"
                >
                  {userData?.followedProviders?.length || "0"}
                </Text>
                <Text textAlign="center">Following</Text>
              </Box>
            </Box>
          </Box>
        </View>
        <Box
          paddingHorizontal="5"
          paddingTop="4"
          paddingBottom="4"
          gap="2"
        >
          <Box
            flexDirection={"column"}
            width={"100%"}
            paddingBottom={"4"}
            gap="4"
          >
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Following
            </Text>
            {userData?.followedProviders ? (
              userData?.followedProviders?.map((card) => (
                <SmallProviderCard
                  data={card}
                  key={card.id}
                />
              ))
            ) : (
              <Text
                textAlign="left"
                color={"text-disabled"}
              >
                Currently you do not have any providers you follow.
              </Text>
            )}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

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

export default ProfilePage;
