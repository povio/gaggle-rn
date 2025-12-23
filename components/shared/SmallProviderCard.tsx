import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import Box from "@/components/Box";
import Image from "@/components/Image";
import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";
import { MockIcons } from "@/data/mock/activities";
import type { UserModels } from "@/openapi/user/user.models";

interface SmallProviderCardProps {
  data: UserModels.FollowedProviderDTO;
}

export const SmallProviderCard = ({ data }: SmallProviderCardProps) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push(`/provider-details?id=${data.id}`);
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
            gap="4"
          >
            <Image
              source={data.logoUrl ? data.logoUrl : MockIcons[Math.floor(Math.random() * 10)]}
              style={styles.activityIcon}
              contentFit="contain"
            />
            <Box
              flexDirection="row"
              alignItems={"center"}
            >
              <Text
                variant="variant-3-prominent"
                numberOfLines={1}
                ellipsizeMode="tail"
                maxWidth={250}
              >
                {data.name}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  activityIcon: {
    width: 45,
    height: 45,
  },
  containerActivity: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 15px 1px",
  },
});
