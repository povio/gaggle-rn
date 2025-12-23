import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import CloseIcon from "@/assets/icons/CloseIcon";
import Box from "@/components/Box";
import Image from "@/components/Image";
import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";
import type { UserModels } from "@/openapi/user/user.models";

import IconButton from "../buttons/IconButton";

interface ActivityCardProps {
  data: UserModels.FollowedProviderDTO;
}

export const ProviderFollowCard = ({ data }: ActivityCardProps) => {
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
            gap="2"
          >
            <Image
              source={data.logoUrl}
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
                {data.name}
              </Text>
            </Box>
          </Box>
          {/* <IconButton
            variant="transparent"
            onPress={() => handleUnfollow()}
            style={styles.heartIcon}
            iconColor={"interactive-active"}
            icon={
              <CloseIcon
                width={25}
                height={22}
              />
            }
          /> */}
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
