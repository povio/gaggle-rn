import { Link } from "expo-router";

import Pressable from "@/components/Pressable";
import Text from "@/components/text/Text";

type FlowerListItemProps = {
  name: string;
  sightings: number;
};

export const FlowerListItem = ({ name, sightings }: FlowerListItemProps) => {
  return (
    <Link
      href={`/(app)/(tabs)/flowers/${name}`}
      asChild
    >
      <Pressable
        paddingHorizontal="2"
        paddingVertical="4"
        flexDirection="row"
        gap="2"
        alignItems="center"
      >
        <Text
          variant="body-3-prominent-2"
          textTransform="capitalize"
        >
          {name}
        </Text>
        <Text variant="body-4-default-italic">•</Text>
        <Text variant="body-4-default-italic">Sightings: {sightings}</Text>
      </Pressable>
    </Link>
  );
};
