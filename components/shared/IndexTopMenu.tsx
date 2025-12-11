import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";

import Box from "@/components/Box";
import Text from "@/components/text/Text";
import SearchIcon from "@/assets/icons/SearchIcon";
import GroupIcon from "@/assets/icons/GroupIcon";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import CampIcon from "@/assets/icons/CampIcon";
import Button from "@/components/buttons/Button";
import Image from "@/components/Image";

export const IndexTopMenu = () => {
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center" height={150}>
          <Box justifyContent="center" alignItems="center" marginRight="4">
            <Box justifyContent="center" alignItems="center" backgroundColor="elevation-background" borderRadius="full" style={styles.iconButton}>
              <CampIcon width={28} height={28} />
            </Box>
            <Text variant="body-4-prominent-2" color="interactive-primary-idle" textAlign="center" marginTop="2">
              Camps
            </Text>
          </Box>

          <Box justifyContent="center" alignItems="center" marginRight="4" alignSelf="flex-end">
            <Box justifyContent="center" alignItems="center" backgroundColor="elevation-background" borderRadius="full" style={styles.iconButton}>
              <Image
                source={require("@/assets/illustrations/knowledge_1.svg")}
                style={styles.topIcon}
                contentFit="contain"
              />
            </Box>
            <Text variant="body-4-prominent-2" color="interactive-primary-idle" textAlign="center" marginTop="2">
              Classes
            </Text>
          </Box>

          <Box justifyContent="center" alignItems="center" marginRight="4" alignSelf="flex-end">
            <Box justifyContent="center" alignItems="center" backgroundColor="elevation-background" borderRadius="full" style={styles.iconButton}>
              <Image
                source={require("@/assets/illustrations/basketball.svg")}
                style={styles.topIcon}
                contentFit="contain"
              />
            </Box>
            <Text variant="body-4-prominent-2" color="interactive-primary-idle" textAlign="center" marginTop="2">
              Sports
            </Text>
          </Box>

          <Box justifyContent="center" alignItems="center">
            <Box justifyContent="center" alignItems="center" backgroundColor="elevation-background" borderRadius="full" style={styles.iconButton}>
              <Image
                source={require("@/assets/illustrations/party.svg")}
                style={styles.topIcon}
                contentFit="contain"
              />
            </Box>
            <Text variant="body-4-prominent-2" color="interactive-primary-idle" textAlign="center" marginTop="2">
              Party
            </Text>
          </Box>
        </Box>
  )
}

const styles = StyleSheet.create({
  iconButtonContainer: {
    cursor: "pointer"
  },
  iconButton: {
    minHeight: 66,
    width: 66,
    boxShadow: "0px 3px 9px 9px rgba(0,0,0,0.1)"
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
