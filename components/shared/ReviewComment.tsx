import { StyleSheet } from "react-native";

import Image from "@/components/Image";
import Text from "@/components/text/Text";
import type { ProgramReviewModels } from "@/openapi/programReview/programReview.models";
import { DateUtils } from "@/utils/date.utils";

import Box from "../Box";
import { ReviewStars } from "./ReviewStars";

interface ReviewCommentProps {
  data: ProgramReviewModels.ListProgramReviewsResponseDTO;
}

export const ReviewComment = ({ data }: ReviewCommentProps) => {
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
              {data.nickname || data.userId}
            </Text>

            <ReviewStars
              color="#FFD035"
              width={24}
              height={24}
              rating={data.rating}
            />
          </Box>
          <Text
            variant="variant-11"
            textAlign="left"
            color={"text-disabled"}
          >
            {DateUtils.formatDateWithTime(data.createdAt)}
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
          {data.content}
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
