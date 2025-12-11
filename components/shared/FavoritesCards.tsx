import { useTheme } from "@shopify/restyle";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import HeartIcon from "@/assets/icons/HeartIcon";
import Box from "@/components/Box";
import Image from "@/components/Image";
import Text from "@/components/text/Text";
import type { Theme } from "@/utils/theme/restyleTheme";

import IconButton from "../buttons/IconButton";
import PillButton from "../buttons/PillButton";
import LoadingScreen from "../LoadingScreen";

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

interface FavoriteItem {
  provider: string;
  location?: string;
  price?: string;
  icon: string;
  label: string;
  tags: string[];
  id: number;
}

const FavoritesList: FavoriteItem[] = [
  {
    provider: "Provider details 1",
    location: "Location",
    price: "$345",
    icon: "basketball.svg",
    label: "Camping",
    tags: [],
    id: 1,
  },
  {
    label: "Camping",
    icon: "camp.svg",
    provider: "Provider details 2",
    location: "Location",
    price: "$345",
    tags: ["Fun", "Camp", "Nature"],
    id: 2,
  },
  {
    label: "Gymnastics",
    icon: "gymnastics.svg",
    provider: "Provider details 3",
    tags: ["Sport"],
    id: 3,
  },
  {
    label: "Learning",
    icon: "knowledge.svg",
    provider: "Provider details 4",
    tags: [],
    id: 4,
  },
  {
    label: "Lacrosse",
    icon: "lacrosee.svg",
    provider: "Provider details 5",
    location: "Location",
    price: "$99",
    tags: ["Cheap", "Lorem"],
    id: 5,
  },
  {
    label: "Martial Arts",
    icon: "martial_arts.svg",
    provider: "Provider details 6",
    location: "Somewhere",
    tags: ["Haya!"],
    id: 6,
  },
  {
    label: "Swimming",
    icon: "swimming.svg",
    price: "$123",
    provider: "Provider details 7",
    tags: ["Wet"],
    id: 7,
  },
];

export const FavoritesCards = () => {
  const theme = useTheme<Theme>();
  const [data, setData] = useState<FavoriteItem[] | null>(null);

  const handleRemoveFavorites = (id: number) => {
    setData((state) => [...state.filter((item) => item.id !== id)]);
  };

  useEffect(() => {
    if (!data) {
      setData(FavoritesList);
    }
  }, []);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {data?.map((item, index) => {
        return (
          <Box
            key={index}
            flexDirection="column"
            gap="4"
            justifyContent="center"
            alignItems="center"
            style={styles.container}
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
                  source={iconMap[item.icon]}
                  style={styles.activityIcon}
                  contentFit="contain"
                />
                <Box
                  flexDirection="column"
                  gap="1"
                >
                  <Text variant="body-4-default">{item.label}</Text>
                  <Box
                    flexDirection="row"
                    gap="2"
                  >
                    <Text variant="body-4-default">{item.provider}</Text>
                    {item.location && <Text variant="body-4-default">{`| ${item.location}`}</Text>}
                  </Box>
                </Box>
              </Box>
              <Box>
                <IconButton
                  variant="transparent"
                  onPress={() => handleRemoveFavorites(item.id)}
                  icon={
                    <HeartIcon
                      width={25}
                      height={22}
                      fill={theme.colors["interactive-active"]}
                    />
                  }
                />
              </Box>
            </Box>
            <Box
              flexDirection="row"
              gap="2"
              width="100%"
              justifyContent="space-between"
            >
              {item.tags.length > 0 && (
                <Box
                  flexDirection="row"
                  gap="2"
                >
                  {item.tags.map((tag) => {
                    return (
                      <PillButton
                        label={tag}
                        onPress={() => {}}
                      />
                    );
                  })}
                </Box>
              )}
              {item.price && (
                <PillButton
                  label={item.price}
                  onPress={() => {}}
                  variant="active"
                />
              )}
            </Box>
          </Box>
        );
      })}
    </ScrollView>
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
  container: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 15px 1px",
  },
});
