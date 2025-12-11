import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";
import { WaitlistModels, WaitlistQueries } from "@/data/waitlist";
import { useForm } from "@/hooks/useForm";
import { useOnboarding } from "@/hooks/useOnboarding";
import { showToast } from "@/utils/toast";

const EnterEmail = () => {
  const router = useRouter();
  const createWaitlistEntry = WaitlistQueries.useCreateWaitlistEntry();
  const { data: waitlistMap } = WaitlistQueries.useGetAllWaitlistEntries();
  const { setEmailVerified } = useOnboarding();
  const [isChecking, setIsChecking] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WaitlistModels.EmailForm>({
    zodSchema: WaitlistModels.emailFormSchema,
    mode: "onChange",
  });

  const submitEmailRequest = async (data: WaitlistModels.EmailForm) => {
    if (!waitlistMap) return;

    setIsChecking(true);

    const emailInWaitlist = data.email in waitlistMap;
    const isUsed = waitlistMap[data.email];

    if (!emailInWaitlist) {
      createWaitlistEntry.mutate(
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
          onError: () => {
            setIsChecking(false);
            showToast({
              variant: "error",
              message: "Failed to join waitlist. Please try again.",
            });
          },
        },
      );
      return;
    }

    if (isUsed) {
      setIsChecking(false);
      showToast({
        variant: "error",
        message: "This email is already registered.",
      });
      return;
    }

    await setEmailVerified(data.email);
    setIsChecking(false);
    router.push("/invitation-code");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      justifyContent="space-between"
      paddingHorizontal="6"
    >
      <View style={styles.topCircle} />

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
          Enter your{"\n"}e-mail address
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
          loading={isChecking || createWaitlistEntry.isPending}
        />
      </Box>

      <View style={styles.bottomCircle} />
    </Box>
  );
};

const styles = StyleSheet.create({
  topCircle: {
    position: "absolute",
    top: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
  },
  bottomCircle: {
    position: "absolute",
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
