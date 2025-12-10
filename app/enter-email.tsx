import { useRouter } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";
import Image from "@/components/Image";
import { WaitlistModels, WaitlistQueries } from "@/data/waitlist";
import { useForm } from "@/hooks/useForm";
import { showToast } from "@/utils/toast";
import { useOnboarding } from "@/hooks/useOnboarding";

const EnterEmail = () => {
  const router = useRouter();
  const { data: emails = [] } = WaitlistQueries.useGetAllEmails();
  const createWaitlistEntry = WaitlistQueries.useCreateWaitlistEntry();
  const { setEmailVerified } = useOnboarding();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WaitlistModels.EmailForm>({
    zodSchema: WaitlistModels.emailFormSchema,
    mode: "onSubmit",
  });

  const submitEmailRequest = async (data: WaitlistModels.EmailForm) => {
    if (emails.includes(data.email)) {
      await setEmailVerified(data.email);
      router.push("/invitation-code");
      return;
    }

    createWaitlistEntry.mutate(
      {
        data: {
          email: data.email,
        },
      },
      {
        onSuccess: () => {
          showToast({
            variant: "success",
            message: "Successfully added to waitlist!",
          });
          router.replace("/waitlist-input");
        },
        onError: () => {
          showToast({
            variant: "error",
            message: "Failed to join waitlist. Please try again.",
          });
        },
      },
    );
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
          variant="display-3-prominent-1"
          textAlign="center"
        >
          Enter your{"\n"}e-mail address
        </Text>

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
            />
          )}
        />

        <Button
          label="NEXT"
          onPress={handleSubmit(submitEmailRequest)}
          width="l"
          variant="secondary"
          disabled={!isValid}
          loading={createWaitlistEntry.isPending}
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
    zIndex: -1
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
