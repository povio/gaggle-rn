import { StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Image from "@/components/Image";
import Text from "@/components/text/Text";
import { FilterId, useSearchStore } from "@/modules/search/stores/searchStore";

interface EmptyStateProps {
  callback: () => void;
  type?: FilterId;
}

const NoResults = ({ callback }: EmptyStateProps) => {
  return (
    <Box
      paddingHorizontal="6"
      marginTop="6"
      marginBottom="2"
      width={280}
      flex={1}
      alignItems="center"
      paddingTop="10"
      alignSelf="center"
    >
      <Box
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"4"}
      >
        <Image
          source={require("@/assets/illustrations/NoResults.svg")}
          style={styles.illustration}
          contentFit="contain"
        />
        <Text
          variant="variant-6-prominent"
          style={styles.heading}
        >
          We didn’t find results
        </Text>
      </Box>
      <Text
        textAlign="center"
        style={styles.description}
      >
        Please try to enter more precise information
      </Text>
      <Button
        label="GO TO HOME"
        onPress={callback}
        width="l"
        textVariant="variant-2-prominent"
        variant="secondary"
      />
    </Box>
  );
};

const CommingSoon = ({ callback, type }: EmptyStateProps) => {
  const iconMap: Record<FilterId, any> = {
    camps: require("@/assets/illustrations/camp.svg"),
    classes: require("@/assets/illustrations/knowledge_1.svg"),
    party: require("@/assets/illustrations/party.svg"),
    sports: require("@/assets/illustrations/basketball.svg"),
    all: "", // fallback ignore
  };

  return (
    <Box
      paddingHorizontal="6"
      marginTop="6"
      marginBottom="2"
      width={280}
      flex={1}
      alignItems="center"
      paddingTop="10"
      alignSelf="center"
    >
      <Box
        borderRadius="full"
        backgroundColor="elevation-background"
        style={styles.iconBg}
        width={88}
        height={88}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          source={iconMap[type]}
          style={styles.illustrationCommingSoon}
          contentFit="contain"
        />
      </Box>
      <Text
        variant="variant-6-prominent"
        style={styles.heading}
        textAlign="center"
      >
        This page is coming soon!
      </Text>
      <Text
        textAlign="center"
        style={styles.description}
      >
        Stay updated with us
      </Text>
      <Button
        label="KEEP EXPLORING"
        onPress={callback}
        width="l"
        textVariant="variant-2-prominent"
        variant="secondary"
      />
    </Box>
  );
};

export const EmptyState = ({ callback }: EmptyStateProps) => {
  const { filter } = useSearchStore();

  return filter === FilterId.ALL ? (
    <NoResults callback={callback} />
  ) : (
    <CommingSoon
      callback={callback}
      type={filter}
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 30,
  },
  backBtn: {
    marginTop: 5,
    paddingRight: 8,
    paddingLeft: 2,
  },
  iconBg: {
    boxShadow: "0px 2px 2px 2px rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  illustrationCommingSoon: {
    width: 36,
    height: 36,
  },
  illustration: {
    width: 183,
    height: 183,
  },
});
