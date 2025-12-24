import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

import Box from "../Box";

interface LoaderVariantProps {
  width: number;
  height: number;
}

type LoaderProps = LoaderVariantProps & React.SVGProps<SVGSVGElement>;

export const Loader = ({ width, height, ...props }: Omit<LoaderProps, "color">) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };

    spin();

    return () => {
      spinValue.stopAnimation();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Box
      width={width}
      height={height}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          {...props}
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="#cbcbcb"
            strokeWidth="4"
          />
          <path
            fill="#000000"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </Animated.View>
    </Box>
  );
};
