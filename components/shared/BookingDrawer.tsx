import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";

import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import LetterIcon from "@/assets/icons/LetterIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";

import Box from "../Box";
import Accordion from "../buttons/Accordion";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Text from "../text/Text";

const Trigger = () => {
  return (
    <Box
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      paddingHorizontal={"5"}
      paddingVertical={"3"}
      borderColor={"text-disabled"}
      borderRadius={"m"}
      borderWidth={1}
    >
      <Text
        flexGrow={1}
        variant={"variant-11"}
      >
        Choose a Session
      </Text>
      <Box
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"3"}
      >
        <Text
          variant={"variant-11"}
          color="text-disabled"
        >
          3
        </Text>
        <Box
          backgroundColor={"main-theme-active"}
          width={23}
          height={23}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          flexGrow={0}
          borderRadius={"full"}
        >
          <ChevronDown width={16} />
        </Box>
      </Box>
    </Box>
  );
};

export const BookingDrawer = () => {
  const [drawerVisible, setDrawerVisible] = useState(true);

  return (
    <Box alignItems="center">
      <Box
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
        padding={"5"}
        width={"100%"}
        gap="4"
        backgroundColor={"elevation-background"}
        borderRadius="m"
        style={styles.container}
      >
        <Accordion trigger={<Trigger />}>
          <Box
            alignItems="center"
            justifyContent="center"
            flexDirection={"row"}
            width={"100%"}
            gap="2"
          >
            asdasdasda
          </Box>
        </Accordion>
        <Box
          alignItems="center"
          justifyContent="center"
          flexDirection={"row"}
          width={"100%"}
          gap="2"
        >
          <Button
            variant="tertiary"
            label="BOOK"
            textVariant="variant-2-prominent"
            onPress={() => {
              setDrawerVisible(true);
            }}
            style={styles.bookBtn}
          />
          <IconButton
            icon={<PhoneIcon />}
            iconColor="interactive-primary-on"
            variant="transparent"
            style={styles.bookingIcon}
            onPress={() => {}}
            size={"l"}
          />
          <IconButton
            icon={<LetterIcon />}
            iconColor="interactive-primary-on"
            variant="transparent"
            style={styles.bookingIcon}
            onPress={() => {}}
            size={"m"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    boxShadow: "0 -6px 15px 0px rgba(0,0,0,0.1)",
  },
  bookingIcon: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#2B2B2B",
  },
  bookBtn: {
    flexGrow: 1,
  },
});
