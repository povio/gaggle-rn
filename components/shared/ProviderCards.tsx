import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import Box from "@/components/Box";
import Image from "@/components/Image";
import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";
import { MockIcons } from "@/data/mock/activities";
import type { HomeModels } from "@/openapi/home/home.models";
import { HomeQueries } from "@/openapi/home/home.queries";

interface ProviderCardsData {
  data: HomeModels.GetHomeInformationResponseDTO["featuredProviders"] | undefined;
}

export const ProviderCards = ({ data }: ProviderCardsData) => {
  const router = useRouter();

  const { data: providerData, isLoading } = HomeQueries.useGetInformation();

  const handleCardPress = (id: string) => {
    router.push(`/provider-details?id=${id}`);
  };
  console.log("providerData", providerData);
  if (isLoading) {
    return null;
  }

  return (
    <Box padding="2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {providerData?.featuredProviders?.map((item) => {
          return (
            <Pressable
              key={item.id}
              onPress={() => handleCardPress(item.id)}
            >
              <Box
                flexDirection="column"
                gap="4"
                justifyContent="flex-start"
                alignItems="center"
                style={styles.activityContainer}
                borderRadius="l"
                marginRight="4"
                paddingVertical="2"
                width={220}
                height={300}
              >
                <Text
                  variant="variant-13-prominent"
                  padding="2"
                  textAlign={"center"}
                >
                  {item.name}
                </Text>
                <Box
                  width="100%"
                  height={150}
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={styles.activityIconContainer}
                >
                  <Image
                    source={item.logoUrl ? item.logoUrl : MockIcons[Math.floor(Math.random() * 10)]}
                    style={styles.activityIcon}
                    contentFit="cover"
                    contentPosition="center"
                  />
                </Box>
                <Text
                  variant="variant-10-prominent"
                  textAlign={"center"}
                >
                  {item.name}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  activityIcon: {
    width: 75,
    height: 75,
  },
  activityContainer: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 15px 1px",
  },
  activityIconContainer: {
    //  boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 10px 2px",
  },
});
