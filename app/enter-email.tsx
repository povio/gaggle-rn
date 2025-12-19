import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import { GoBack } from "@/components/navigation/GoBack";
import Text from "@/components/text/Text";
import { useForm } from "@/hooks/useForm";
import { useOnboarding } from "@/hooks/useOnboarding";
import { WaitlistModels } from "@/openapi/waitlist/waitlist.models";
import { WaitlistQueries } from "@/openapi/waitlist/waitlist.queries";
import { showToast } from "@/utils/toast";

const EnterEmail = () => {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode: "waitlist" | "onboarding" }>();
  const [isChecking, setIsChecking] = useState(false);

  const waitlistMutation = WaitlistQueries.useJoin();
  const { setWaitlistEmail } = useOnboarding();

  const isWaitlistMode = mode === "waitlist";

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WaitlistModels.WaitlistJoinRequest>({
    zodSchema: WaitlistModels.WaitlistJoinRequestSchema,
    mode: "onChange",
  });

  const submitEmailRequest = async (data: WaitlistModels.WaitlistJoinRequest) => {
    setIsChecking(true);

    if (isWaitlistMode) {
      // Waitlist flow: POST to API
      await waitlistMutation.mutate(
        {
          data: {
            email: data.email,
          },
        },
        {
          onSuccess: () => {
            setIsChecking(false);
            showToast({
              variant: "success",
              message: "Successfully added to waitlist!",
            });
            router.replace("/waitlist-input");
          },
          onError: (error) => {
            setIsChecking(false);
            showToast({
              variant: "error",
              message: error.message || "Failed to join waitlist. Please try again.",
            });
          },
        },
      );
    } else {
      // Onboarding flow: Save email to storage and go to invitation code
      await setWaitlistEmail(data.email);
      setIsChecking(false);
      router.push("/invitation-code");
    }
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      justifyContent="space-between"
      paddingHorizontal="6"
    >
      <View style={styles.topCircle} />

      <GoBack />

      <Box
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
        gap="6"
        style={styles.contentContainer}
      >
        <Image
          source={require("@/assets/illustrations/flock_envelope_open.svg")}
          style={styles.illustration}
          contentFit="contain"
        />

        <Text
          variant="variant-6-prominent"
          textAlign="center"
        >
          {isWaitlistMode ? "Join our waitlist" : "Enter your e-mail address"}
        </Text>

        <Box
          flexDirection="row"
          width="100%"
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label=""
                placeholder="Your e-mail"
                value={value}
                variant="default"
                onChangeText={onChange}
                error={errors.email?.message}
                alignSelf="stretch"
              />
            )}
          />
        </Box>

        <Button
          label="NEXT"
          onPress={handleSubmit(submitEmailRequest)}
          width="m"
          textVariant="variant-2-prominent"
          variant="secondary"
          disabled={!isValid}
          loading={isChecking || (isWaitlistMode && waitlistMutation.isPending)}
        />
      </Box>

      <View style={styles.bottomCircle} />
    </Box>
  );
};

const styles = StyleSheet.create({
  topCircle: {
    position: "fixed",
    top: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
  },
  bottomCircle: {
    position: "fixed",
    bottom: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
    zIndex: -1,
  },
  yellowCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#F5C344",
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 140,
    height: 140,
  },
  contentContainer: {
    marginTop: 100,
  },
});

export default EnterEmail;
