import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, type SharedValue } from "react-native-reanimated";

import Box from "@/components/Box";
import Text from "@/components/text/Text";
import Image from "@/components/Image";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_WIDTH = SCREEN_WIDTH * 0.66;

const CAROUSEL_DATA = [
  {
    image: require("@/assets/illustrations/flock_camping.svg"),
    headline: "Welcome to Gaggle",
    description: "Easily search among thousands of kids' camps, activities, and party providers",
  },
  {
    image: require("@/assets/illustrations/flock_trophy.svg"),
    headline: "Welcome to Gaggle",
    description: "Read candid reviews summarized from thousands of pieces of parent feedback",
  },
  {
    image: require("@/assets/illustrations/flock_speechbubbles.svg"),
    headline: "Welcome to Gaggle",
    description: "Save favorites and easily share with friends and other family members",
  },
];

export const WelcomeCarousel = () => {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const descriptionScrollRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);
  const currentIndex = useRef(0);
  const autoScrollInterval = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;

      descriptionScrollRef.current?.scrollTo({
        x: event.contentOffset.x,
        animated: false,
      });
    },
  });

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    currentIndex.current = Math.round(contentOffsetX / CAROUSEL_WIDTH);
  };

  useEffect(() => {
    autoScrollInterval.current = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % CAROUSEL_DATA.length;
      currentIndex.current = nextIndex;

      scrollViewRef.current?.scrollTo({
        x: nextIndex * CAROUSEL_WIDTH,
        animated: true,
      });
    }, 3000);

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, []);

  return (
    <>
      <View style={styles.carouselContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {CAROUSEL_DATA.map((item, index) => (
            <View key={index} style={styles.carouselItem}>
              <Image
                source={item.image}
                style={styles.illustration}
                contentFit="contain"
              />
              <Text
        variant="title-1-default"
        textAlign="center"
                marginBottom="5"
      >
        Welcome to Gaggle
      </Text>
               <Text
                variant="body-1-prominent-1"
                textAlign="center"
                color="text-default-secondary"
              >
                {item.description}
              </Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>

      
      <Box
        flexDirection="row"
        gap="2"
        marginTop="4"
      >
        {CAROUSEL_DATA.map((_, index) => (
          <Dot key={index} index={index} scrollX={scrollX} />
        ))}
      </Box>
    </>
  );
};

const Dot = ({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * CAROUSEL_WIDTH,
      index * CAROUSEL_WIDTH,
      (index + 1) * CAROUSEL_WIDTH,
    ];

    const width = interpolate(
      scrollX.value,
      inputRange,
      [8, 24, 8],
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
    );

    return {
      width,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
        { backgroundColor: "#1F2937" },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
   width: CAROUSEL_WIDTH,
    height: 572,
  },
  scrollView: {
    flex: 1,
  },
  carouselItem: {
    width: CAROUSEL_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: 400,
    maxWidth: CAROUSEL_WIDTH,
  },
  descriptionContainer: {
    width: SCREEN_WIDTH,
    marginLeft: -24,
    paddingHorizontal: 24,
  },
  descriptionScrollView: {
    flex: 1,
  },
  descriptionItem: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
