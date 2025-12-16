import { StyleSheet } from "react-native";

import StarIcon from "@/assets/icons/StarIcon";
import Image from "@/components/Image";
import Text from "@/components/text/Text";

import Box from "../Box";

export const ReviewComment = () => {
  return (
    <Box
      flexDirection={"column"}
      gap={"4"}
      width={"100%"}
      paddingBottom={"4"}
    >
      <Box
        flexDirection={"row"}
        gap="2"
        justifyContent={"space-between"}
      >
        <Image
          source={require("@/assets/illustrations/swimming.svg")}
          style={styles.activityIcon}
          contentFit="contain"
        />
        <Box
          flexGrow={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box>
            <Text
              variant="variant-11"
              textAlign="left"
            >
              Firstname Lastname
            </Text>

            <Box
              flexDirection={"row"}
              alignItems={"center"}
              gap="1"
              marginTop={"2"}
            >
              <StarIcon
                color="#FF6B00"
                width={15}
                height={15}
              />
              <StarIcon
                color="#FF6B00"
                width={15}
                height={15}
              />
              <StarIcon
                color="#FF6B00"
                width={15}
                height={15}
              />
              <StarIcon
                color="#FF6B00"
                width={15}
                height={15}
              />
              <StarIcon
                color="#FF6B00"
                width={15}
                height={15}
              />
            </Box>
          </Box>
          <Text
            variant="variant-11"
            textAlign="left"
            color={"text-disabled"}
          >
            3days ago
          </Text>
        </Box>
      </Box>
      <Box
        backgroundColor={"background-light-gray"}
        width={"100%"}
        borderRadius={"l"}
        padding={"4"}
        flexDirection={"column"}
        gap="2"
      >
        <Text
          textAlign="left"
          variant={"variant-7"}
        >
          My seven-year-old daughter did this camp last summer. She LOVED it!!! And, I was impressed with the quality of
          the performance at the end of the camp - from the sets to the acting, it was a pro production.
        </Text>
        <Box
          flexDirection={"row"}
          gap={"2"}
        >
          <Image
            source={require("@/assets/illustrations/camp.svg")}
            style={styles.uploadedIcon}
            contentFit="contain"
          />
          <Image
            source={require("@/assets/illustrations/basketball.svg")}
            style={styles.uploadedIcon}
            contentFit="contain"
          />
          <Image
            source={require("@/assets/illustrations/music.svg")}
            style={styles.uploadedIcon}
            contentFit="contain"
          />
          <Box
            style={styles.uploadedIcon}
            backgroundColor={"interactive-icon-disabled"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              textAlign="left"
              color={"interactive-primary-on"}
              variant={"variant-10-prominent"}
            >
              +10
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  uploadedIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
  },
});
