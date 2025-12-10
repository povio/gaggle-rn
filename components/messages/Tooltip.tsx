import { type ComponentRef, type PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import {
  type GestureResponderEvent,
  type LayoutChangeEvent,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import Box from "../Box";
import Pressable from "../Pressable";
import Text from "../text/Text";

const MAX_WIDTH = 232;

interface TooltipProps extends PropsWithChildren {
  text: string;
  position?: "left" | "top" | "right" | "bottom";
  isOpen?: boolean;
  onTouch?: (value: boolean) => void;
}

interface Position {
  x: number;
  y: number;
}
interface Size {
  width: number;
  height: number;
}

interface TriggerLayout {
  width: number;
  height: number;
  x: number;
  y: number;
}

const DEFAULT_PADDING = 32;

const Tooltip = ({ text, position = "bottom", isOpen, onTouch, children }: TooltipProps) => {
  const triggerRef = useRef<ComponentRef<typeof TouchableOpacity>>(null);

  const dimensions = useWindowDimensions();

  const [max_width, setMaxWidth] = useState(MAX_WIDTH);
  const [showTooltip, setShowTooltip] = useState(false);
  const [contentSize, setContentSize] = useState<Size>({ width: 0, height: 0 });
  const [triggerSize, setTriggerSize] = useState<TriggerLayout>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [pressPosition, setPressPosition] = useState<Position>({ x: 0, y: 0 });

  const isPositionSet = !!(pressPosition.x && pressPosition.y);
  const shouldShowToolTip = isOpen === undefined ? showTooltip : isPositionSet && isOpen;

  const onTriggerTouch = (value: boolean) => {
    const fn = isOpen === undefined ? setShowTooltip : onTouch;
    fn && fn(value);
  };

  useEffect(() => {
    if (!isOpen || isPositionSet) return;

    // Default to trigger position
    triggerRef.current?.measure((_x, _y, _width, _height, px, py) => {
      setPressPosition({ x: px, y: py });
    });
  }, [isOpen, isPositionSet]);

  const tooltipPosition: Position = useMemo(() => {
    if (position === "top") {
      return {
        x: pressPosition.x,
        y: pressPosition.y + 4,
      };
    } else if (position === "bottom") {
      return {
        x: pressPosition.x,
        y: pressPosition.y + triggerSize.height + 12,
      };
    } else if (position === "right") {
      return {
        x: pressPosition.x + triggerSize.width + 16,
        y: pressPosition.y - (contentSize.height > 40 ? contentSize.height / 2 : 9),
      };
    } else if (position === "left") {
      return {
        x: pressPosition.x - contentSize.width - 13,
        y: pressPosition.y - (contentSize.height > 40 ? contentSize.height / 2 : 9),
      };
    }
    return {
      x: 0,
      y: 0,
    };
  }, [position, dimensions, triggerSize, pressPosition, contentSize]);

  const arrowStyle = useMemo(() => {
    if (position === "left") {
      return {
        transform: [{ rotate: "45deg" }],
        top: pressPosition.y + 6,
        left: triggerSize.x - 22,
      };
    } else if (position === "top") {
      return {
        transform: [{ rotate: "45deg" }],
        left: triggerSize.x + triggerSize.width / 2 - 6.5,
        top: pressPosition.y + contentSize.height - 2.5,
      };
    } else if (position === "right") {
      return {
        transform: [{ rotate: "45deg" }],
        left: triggerSize.x + triggerSize.width + 12,
        top: pressPosition.y + 6,
      };
    } else if (position === "bottom") {
      return {
        transform: [{ rotate: "45deg" }],
        left: triggerSize.x + triggerSize.width / 2 - 6.5,
        top: pressPosition.y + contentSize.height - 9.5,
      };
    }
    return {};
  }, [position, pressPosition, triggerSize]);

  const handleShowInfoClick = (evt: GestureResponderEvent) => {
    onTriggerTouch(true);

    let maxWidthTooltip = 0;

    if (position === "right") {
      maxWidthTooltip = dimensions.width - 16 - triggerSize.width - 5;
      setPressPosition({
        x: triggerSize.x,
        y: evt.nativeEvent.pageY - evt.nativeEvent.locationY,
      });
    } else if (position === "left") {
      maxWidthTooltip = dimensions.width - 16 - triggerSize.width - 5;
      setPressPosition({
        x: triggerSize.x,
        y: evt.nativeEvent.pageY - evt.nativeEvent.locationY,
      });
    } else if (position === "bottom") {
      maxWidthTooltip = dimensions.width - DEFAULT_PADDING;

      if (
        contentSize.width + triggerSize.x - DEFAULT_PADDING > dimensions.width ||
        triggerSize.x <= dimensions.width / 3
      ) {
        // Out of bounds OR trigger is around the center of the screen
        setPressPosition({
          x:
            triggerSize.x <= dimensions.width / 3 &&
            contentSize.width + triggerSize.x - DEFAULT_PADDING < dimensions.width
              ? triggerSize.x
              : (dimensions.width - contentSize.width) / 2,
          y: evt.nativeEvent.pageY - evt.nativeEvent.locationY,
        });
      } else {
        setPressPosition({
          x: triggerSize.x < dimensions.width / 2 ? triggerSize.x : dimensions.width - contentSize.width - 12,
          y: evt.nativeEvent.pageY - evt.nativeEvent.locationY,
        });
      }
    } else if (position === "top") {
      maxWidthTooltip = dimensions.width - DEFAULT_PADDING;

      if (
        contentSize.width + triggerSize.x - DEFAULT_PADDING > dimensions.width ||
        triggerSize.x <= dimensions.width / 3
      ) {
        // Out of bounds OR trigger is around the center of the screen
        setPressPosition({
          x:
            triggerSize.x <= dimensions.width / 3 &&
            contentSize.width + triggerSize.x - DEFAULT_PADDING < dimensions.width
              ? triggerSize.x
              : (dimensions.width - contentSize.width) / 2,
          y: evt.nativeEvent.pageY - evt.nativeEvent.locationY - contentSize.height - 18,
        });
      } else {
        setPressPosition({
          x: triggerSize.x < dimensions.width / 2 ? triggerSize.x : dimensions.width - contentSize.width - 12,
          y: evt.nativeEvent.pageY - evt.nativeEvent.locationY - contentSize.height - 18,
        });
      }
    }

    setMaxWidth(maxWidthTooltip);
  };

  const handleContentLayout = (evt: LayoutChangeEvent) => {
    setContentSize(evt.nativeEvent.layout);
  };

  const handleTriggerLayout = (evt: LayoutChangeEvent) => {
    setTriggerSize(evt.nativeEvent.layout);
  };

  return (
    <TouchableOpacity
      accessibilityLabel="tooltip"
      onPress={handleShowInfoClick}
      onLayout={handleTriggerLayout}
      ref={triggerRef}
    >
      {children}

      <Modal
        style={{ position: "relative" }}
        transparent
        visible={shouldShowToolTip}
        onRequestClose={() => onTriggerTouch(false)}
      >
        <Pressable
          width="100%"
          height="100%"
          onPress={() => onTriggerTouch(false)}
        />

        <Box
          backgroundColor="interactive-secondary-idle"
          height={13}
          width={13}
          position="absolute"
          style={arrowStyle}
        />

        <Box
          flexDirection="row"
          position="absolute"
          alignItems="center"
          maxWidth={max_width}
          onLayout={handleContentLayout}
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          <Box
            paddingHorizontal="3"
            paddingVertical="2"
            borderRadius="sm"
            backgroundColor="interactive-secondary-idle"
          >
            <Text
              variant="body-4-prominent-1"
              color="text-inverted-tertiary"
              style={{ flex: 1, flexWrap: "wrap" }}
            >
              {text}
            </Text>
          </Box>
        </Box>
      </Modal>
    </TouchableOpacity>
  );
};

export default Tooltip;
