import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import GaggleLogoIcon from "@/assets/icons/GaggleLogoIcon";
import KeyIcon from "@/assets/icons/KeyIcon";

import Box from "../Box";
import Modal from "./Modal";
import { ImageOkayModalContent } from "./ModalContent";

interface LoginNudgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginNudgeModal = ({ isOpen, onClose }: LoginNudgeModalProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/sign-in");
  };

  const Icon = () => (
    <Box>
      <GaggleLogoIcon
        width={65}
        height={65}
      />
      <Box
        backgroundColor={"elevation-background"}
        borderRadius={"full"}
        padding={"2"}
        position={"absolute"}
        bottom={-10}
        right={-22}
        style={styles.headerIcon}
      >
        <KeyIcon
          width={24}
          height={24}
        />
      </Box>
    </Box>
  );

  return (
    <Modal
      visible={isOpen}
      onClose={onClose}
    >
      <ImageOkayModalContent
        title="Ready to log in?"
        text="Log in to save your faves, settings, and unlock cool stuff!"
        icon={<Icon />}
        primaryButtonText="LOG IN"
        onPrimaryButtonPress={handleLogin}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    boxShadow: "0px 1px 7px 2px rgba(0, 0, 0, 0.1)",
  },
});
