import { useTheme } from "@shopify/restyle";
import { ScrollView, StyleSheet } from "react-native";

import HeartIcon from "@/assets/icons/HeartIcon";
import Box from "@/components/Box";
import Image from "@/components/Image";
import Text from "@/components/text/Text";
import type { Theme } from "@/utils/theme/restyleTheme";

import IconButton from "../buttons/IconButton";
import PillButton from "../buttons/PillButton";
import type { Card } from "./FavoritesList";

interface ActivityCardProps {
  data: Card;
  callback?: (id: string | number) => void;
}

export const ActivityCard = ({ data, callback }: ActivityCardProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box
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
          {/* <Image
            source={require(data.icon)}
            style={styles.activityIcon}
            contentFit="contain"
          /> */}
          <Box
            flexDirection="column"
            gap="1"
          >
            <Text variant="variant-3-prominent">{data.label}</Text>
            <Box
              flexDirection="row"
              gap="2"
            >
              <Text variant="variant-4">{data.provider}</Text>
              {data.location && (
                <Text
                  variant="variant-4"
                  color="text-disabled"
                >{`| ${data.location}`}</Text>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <IconButton
            variant="transparent"
            onPress={() => callback?.(data.id)}
            iconColor="interactive-active"
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
        {data.tags.length > 0 && (
          <Box
            flexDirection="row"
            gap="2"
          >
            {data.tags.map((tag) => {
              return (
                <PillButton
                  label={tag}
                  onPress={() => {}}
                />
              );
            })}
          </Box>
        )}
        {data.price && (
          <PillButton
            label={data.price}
            onPress={() => {}}
            variant="active"
          />
        )}
      </Box>
    </Box>
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
