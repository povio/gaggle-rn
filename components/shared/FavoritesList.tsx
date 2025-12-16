import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { cards } from "@/data/mock/activities";

import LoadingScreen from "../LoadingScreen";
import { ActivityCard } from "./ActivityCard";

// const iconMap: Record<string, any> = {
//   "basketball.svg": require("@/assets/illustrations/basketball.svg"),
//   "dance.svg": require("@/assets/illustrations/dance.svg"),
//   "culinary.svg": require("@/assets/illustrations/culinary.svg"),
//   "equstrian.svg": require("@/assets/illustrations/equestrian.svg"),
//   "camp.svg": require("@/assets/illustrations/camp.svg"),
//   "gymnastics.svg": require("@/assets/illustrations/gymnastics.svg"),
//   "knowledge.svg": require("@/assets/illustrations/knowledge_1.svg"),
//   "lacrosee.svg": require("@/assets/illustrations/lacrosse.svg"),
//   "martial_arts.svg": require("@/assets/illustrations/martial_arts.svg"),
//   "swimming.svg": require("@/assets/illustrations/swimming.svg"),
// };

export interface Card {
  provider: string;
  location?: string;
  price?: string;
  icon: string;
  label: string;
  tags: string[];
  id: number | string;
  startDate?: string;
  endDate?: string;
}

export const FavoritesList = () => {
  const [data, setData] = useState<Card[] | null>(null);

  const handleRemoveFavorites = (id: number) => {
    setData((state) => [...state.filter((item) => item.id !== id)]);
  };

  useEffect(() => {
    setData(cards);
  }, []);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {data?.map((item) => {
        return (
          <ActivityCard
            data={item}
            key={item.id}
            callback={handleRemoveFavorites}
            isFavored
          />
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
