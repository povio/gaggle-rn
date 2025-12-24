import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import CampIcon from "@/assets/icons/CampIcon";
import Box from "@/components/Box";
import Image from "@/components/Image";
import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";
import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";

export const IndexTopMenu = () => {
  const router = useRouter();
  const { setFilter } = useSearchStore();

  const handleFilterClick = (filterId: FilterId) => {
    setFilter(filterId);
    router.push("/search-results");
  };

  return (
    <Box
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height={120}
      gap={"4"}
    >
      <Pressable
        alignSelf={"flex-start"}
        onPress={() => handleFilterClick(FilterId.CAMPS)}
      >
        <Box
          justifyContent="center"
          alignItems="center"
          // marginRight="4"
        >
          <Box
            justifyContent="center"
            alignItems="center"
            backgroundColor="elevation-background"
            borderRadius="full"
            style={styles.iconButton}
          >
            <CampIcon
              width={28}
              height={28}
            />
          </Box>
          <Text
            variant="variant-12"
            color="interactive-primary-idle"
            textAlign="center"
            marginTop="2"
          >
            Camps
          </Text>
        </Box>
      </Pressable>

      <Pressable
        onPress={() => handleFilterClick(FilterId.CLASSES)}
        alignSelf="center"
      >
        <Box
          justifyContent="center"
          alignItems="center"
          // marginRight="4"
          alignSelf="flex-end"
        >
          <Box
            justifyContent="center"
            alignItems="center"
            backgroundColor="elevation-background"
            borderRadius="full"
            style={styles.iconButton}
          >
            <Image
              source={require("@/assets/illustrations/knowledge_1.svg")}
              style={styles.topIcon}
              contentFit="contain"
            />
          </Box>
          <Text
            variant="variant-12"
            color="interactive-primary-idle"
            textAlign="center"
            marginTop="2"
          >
            Classes
          </Text>
        </Box>
      </Pressable>

      <Pressable
        alignSelf="flex-end"
        onPress={() => handleFilterClick(FilterId.SPORTS)}
      >
        <Box
          justifyContent="center"
          alignItems="center"
          // marginRight="4"
          alignSelf="flex-end"
        >
          <Box
            justifyContent="center"
            alignItems="center"
            backgroundColor="elevation-background"
            borderRadius="full"
            style={styles.iconButton}
          >
            <Image
              source={require("@/assets/illustrations/basketball.svg")}
              style={styles.topIcon}
              contentFit="contain"
            />
          </Box>
          <Text
            variant="variant-12"
            color="interactive-primary-idle"
            textAlign="center"
            marginTop="2"
          >
            Sports
          </Text>
        </Box>
      </Pressable>

      <Pressable
        alignSelf="center"
        onPress={() => handleFilterClick(FilterId.PARTY)}
      >
        <Box
          justifyContent="center"
          alignItems="center"
        >
          <Box
            justifyContent="center"
            alignItems="center"
            backgroundColor="elevation-background"
            borderRadius="full"
            style={styles.iconButton}
          >
            <Image
              source={require("@/assets/illustrations/party.svg")}
              style={styles.topIcon}
              contentFit="contain"
            />
          </Box>
          <Text
            variant="variant-12"
            color="interactive-primary-idle"
            textAlign="center"
            marginTop="2"
          >
            Party
          </Text>
        </Box>
      </Pressable>

      <Pressable
        alignSelf={"flex-start"}
        onPress={() => handleFilterClick(FilterId.PHOTOGRAPHY)}
      >
        <Box
          justifyContent="center"
          alignItems="center"
        >
          <Box
            justifyContent="center"
            alignItems="center"
            backgroundColor="elevation-background"
            borderRadius="full"
            style={styles.iconButton}
          >
            <Image
              source={require("@/assets/illustrations/camera.svg")}
              style={styles.topIcon}
              contentFit="contain"
            />
          </Box>
          <Text
            variant="variant-12"
            color="interactive-primary-idle"
            textAlign="center"
            marginTop="2"
          >
            Party
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: {
    cursor: "pointer",
  },
  iconButton: {
    minHeight: 60,
    width: 60,
    boxShadow: "0px 3px 9px 9px rgba(0,0,0,0.1)",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  topIcon: {
    width: 28,
    height: 28,
  },
});
