import { ScrollView, StyleSheet } from "react-native";

import Box from "@/components/Box";
import Image from "@/components/Image";
import Text from "@/components/text/Text";

export const ProvidersList = [
  {
    label: "Disneyworld",
    icon: "https://placehold.co/300x200/000000/FFCF48/png",
    type: "Disneyworld",
  },
  {
    label: "Tramplines!",
    icon: "https://placehold.co/300x200/000000/FFCF48/png",
    type: "Rides for kids",
  },
  {
    label: "Go Kart Deluxe!",
    icon: "https://placehold.co/300x200/000000/FFCF48/png",
    type: "Fun park",
  },
  {
    label: "School of Painting",
    icon: "https://placehold.co/300x200/000000/FFCF48/png",
    type: "School of learning",
  },
  {
    label: "Lorem Ipsum",
    icon: "https://placehold.co/300x200/000000/FFCF48/png",
    type: "Other latin words",
  },
];

export const ProviderCards = () => {
  return (
    <Box padding="2">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {ProvidersList.map((item, index) => {
          return (
            <Box
              key={index}
              flexDirection="column"
              gap="4"
              justifyContent="space-between"
              alignItems="center"
              style={styles.activityContainer}
              borderRadius="l"
              marginRight="4"
              width={180}
              height={300}
            >
              <Text padding="4">{item.type}</Text>
              <Box
                width="100%"
                height={150}
                style={styles.activityIconContainer}
              >
                <Image
                  source={item.icon}
                  style={styles.activityIcon}
                  contentFit="cover"
                  contentPosition="center"
                />
              </Box>
              <Text>{item.label}</Text>
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
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  activityIcon: {
    width: "100%",
    height: "100%",
  },
  activityContainer: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 15px 1px",
  },
  activityIconContainer: {
    //  boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 10px 2px",
  },
});
