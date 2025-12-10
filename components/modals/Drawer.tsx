import {
  BottomSheetBackdrop,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@shopify/restyle";
import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import TextButton from "../buttons/TextButton";
import ListItem from "../input/ListItem";

export interface DrawerProps extends Omit<BottomSheetModalProps, "children"> {
  children?: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryActionPress?: () => void;
  onSecondaryActionPress?: () => void;
}

const Drawer = ({
  visible,
  onClose,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryActionPress,
  onSecondaryActionPress,
  stackBehavior = "push",
  ...rest
}: DrawerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme<Theme>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["1%"], []); // TODO: figure out if there is a less hacky way to handle dynamic content size

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const handleDismiss = () => {
    onClose();
  };

  const hasActions = !!(primaryActionLabel || secondaryActionLabel);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      enableDynamicSizing
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
      onDismiss={handleDismiss}
      stackBehavior={stackBehavior}
      handleIndicatorStyle={{
        backgroundColor: theme.colors["elevation-surface-2"],
      }}
      handleStyle={{
        backgroundColor: theme.colors["elevation-surface-1"],
        borderTopLeftRadius: theme.borderRadii["xl"],
        borderTopRightRadius: theme.borderRadii["xl"],
      }}
      onChange={(index) => {
        if (index === -1) {
          handleDismiss();
        }
      }}
      {...rest}
    >
      <Box
        justifyContent="space-between"
        flex={1}
      >
        <BottomSheetView
          style={{
            paddingBottom: insets.bottom,
            backgroundColor: theme.colors["elevation-surface-1"],
          }}
        >
          <Box backgroundColor="elevation-surface-1">{children}</Box>
          {hasActions && (
            <Box
              backgroundColor="elevation-surface-1"
              p="4"
            >
              <ListItem
                label=""
                variant="action"
                leftElement={
                  <>
                    {!!primaryActionLabel && (
                      <TextButton
                        label={primaryActionLabel}
                        variant="primary"
                        onPress={() => onPrimaryActionPress?.()}
                      />
                    )}
                  </>
                }
                rightElement={
                  <>
                    {!!secondaryActionLabel && (
                      <TextButton
                        label={secondaryActionLabel}
                        variant="secondary"
                        onPress={() => onSecondaryActionPress?.()}
                      />
                    )}
                  </>
                }
              />
            </Box>
          )}
        </BottomSheetView>
      </Box>
    </BottomSheetModal>
  );
};

export default Drawer;
