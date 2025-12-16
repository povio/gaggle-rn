import { InfoIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import CheckCircleIcon from "@/assets/icons/CheckCircleIcon";
import CopyIcon from "@/assets/icons/CopyIcon";
import LetterIcon from "@/assets/icons/LetterIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import { cards } from "@/data/mock/activities";

import Box from "../Box";
import Accordion from "../buttons/Accordion";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Modal from "../modals/Modal";
import { IconTextModalContent } from "../modals/ModalContent";
import { ActivityCard, ActivityCardVariant } from "./ActivityCard";
import type { Card } from "./FavoritesList";

export const BookingDrawer = () => {
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [data, setData] = useState<Card[] | null>(null);
  const [modalBooking, setModalBooking] = useState(false);
  const [modalBookingClosed, setModalBookingClosed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setData(cards.filter((_, index) => index < 3));
  }, []);

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
        <Accordion
          trigger="Choose a session"
          helperText="3"
        >
          <Box
            alignItems="center"
            justifyContent="center"
            flexDirection={"column"}
            width={"100%"}
            gap="2"
          >
            {data &&
              data?.map((card) => (
                <ActivityCard
                  isFavored={false}
                  data={card}
                  variant={ActivityCardVariant.SESSION}
                  key={card.id}
                />
              ))}
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
            onPress={() => setModalBooking(true)}
            size={"l"}
          />
          <IconButton
            icon={<LetterIcon />}
            iconColor="interactive-primary-on"
            variant="transparent"
            style={styles.bookingIcon}
            onPress={() => setModalBookingClosed(true)}
            size={"m"}
          />
        </Box>
      </Box>
      <Modal
        visible={modalBooking}
        onClose={() => setModalBooking(false)}
      >
        <IconTextModalContent
          title="Lorem Ipsum Text"
          text="(301) 280-1660"
          icon={<PhoneIcon />}
          primaryButtonText="COPY PHONE"
          btnIcon={copied ? <CheckCircleIcon /> : <CopyIcon />}
          onPrimaryButtonPress={() => setCopied(true)}
        />
      </Modal>
      <Modal
        visible={modalBookingClosed}
        onClose={() => setModalBookingClosed(false)}
      >
        <IconTextModalContent
          title="Imagination Stage does not currently support direct booking"
          icon={<InfoIcon />}
          primaryButtonText="GOT IT"
          onPrimaryButtonPress={() => setModalBookingClosed(false)}
        />
      </Modal>
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
