import { ScrollView, StyleSheet } from "react-native";

import Box from "@/components/Box";
import Image from "@/components/Image";
import Text from "@/components/text/Text";

const iconMap: Record<string, any> = {
  "basketball.svg": require("@/assets/illustrations/basketball.svg"),
  "dance.svg": require("@/assets/illustrations/dance.svg"),
  "culinary.svg": require("@/assets/illustrations/culinary.svg"),
  "equstrian.svg": require("@/assets/illustrations/equestrian.svg"),
  "camp.svg": require("@/assets/illustrations/camp.svg"),
  "gymnastics.svg": require("@/assets/illustrations/gymnastics.svg"),
  "knowledge.svg": require("@/assets/illustrations/knowledge_1.svg"),
  "lacrosee.svg": require("@/assets/illustrations/lacrosse.svg"),
  "martial_arts.svg": require("@/assets/illustrations/martial_arts.svg"),
  "swimming.svg": require("@/assets/illustrations/swimming.svg"),
};

export const Activities = [
  {
    label: "Basketball",
    icon: "basketball.svg",
  },
  {
    label: "Dancing",
    icon: "dance.svg",
  },
  {
    label: "Culinary",
    icon: "culinary.svg",
  },
  {
    label: "Equestrian",
    icon: "equstrian.svg",
  },
  {
    label: "Camping",
    icon: "camp.svg",
  },
  {
    label: "Gymnastics",
    icon: "gymnastics.svg",
  },
  {
    label: "Learning",
    icon: "knowledge.svg",
  },
  {
    label: "Lacrosse",
    icon: "lacrosee.svg",
  },
  {
    label: "Martial Arts",
    icon: "martial_arts.svg",
  },
  {
    label: "Swimming",
    icon: "swimming.svg",
  },
];

export const ActivityPreviews = () => {
  return (
    <Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Activities.map((item, index) => {
          return (
            <Box
              key={index}
              flexDirection="row"
              gap="4"
              justifyContent="center"
              alignItems="center"
              padding="2"
              style={styles.activityContainer}
              borderRadius="l"
              paddingRight="10"
              marginRight="4"
            >
              <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                width={50}
                height={50}
                style={styles.activityIconContainer}
                borderRadius="full"
              >
                <Image
                  source={iconMap[item.icon]}
                  style={styles.activityIcon}
                  contentFit="contain"
                />
              </Box>
              <Text variant="variant-11">{item.label}</Text>
            </Box>
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
    //padding: 8,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  activityIcon: {
    width: 35,
    height: 35,
  },
  activityContainer: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 15px 1px",
  },
  activityIconContainer: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 10px 2px",
  },
});
