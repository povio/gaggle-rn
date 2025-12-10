import { useTheme } from "@shopify/restyle";
import React from "react";
import { Modal as RNModal, type ModalProps as RNModalProps, TouchableWithoutFeedback } from "react-native";

import CloseIcon from "@/assets/icons/CloseIcon";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import Pressable from "../Pressable";

export interface ModalProps extends RNModalProps {
  visible: boolean;
  onClose: () => void;
}

const Modal = ({ visible, onClose, children, ...rest }: ModalProps) => {
  const theme = useTheme<Theme>();

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      {...rest}
    >
      <Box
        height="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Box
            position="absolute"
            top={0}
            left={0}
            height="100%"
            width="100%"
            backgroundColor="elevation-surface-2"
          />
        </TouchableWithoutFeedback>
        <Box
          backgroundColor="interactive-primary-on"
          margin="4"
          borderRadius="ml"
          flex={1}
        >
          <Box alignItems="flex-end">
            <Pressable
              onPress={onClose}
              width={24}
              height={24}
              margin="2"
            >
              <CloseIcon color={theme.colors["interactive-icon-idle"]} />
            </Pressable>
          </Box>
          {children}
        </Box>
      </Box>
    </RNModal>
  );
};

export default Modal;
