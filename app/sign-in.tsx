import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { ScanFace } from "lucide-react-native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";
import { STORAGE_KEYS } from "@/constants/storage";
import { AuthModels, AuthQueries } from "@/data/auth";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { getStorageItemAsync } from "@/utils/secureStore";
import { showToast } from "@/utils/toast";

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const signIn = AuthQueries.useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<AuthModels.SignInInput>({
    resolver: zodResolver(AuthModels.signInInputSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const loadLastEmail = async () => {
      const email = await getStorageItemAsync(STORAGE_KEYS.LAST_SIGNED_IN_EMAIL);
      if (email) {
        setValue("email", email, { shouldValidate: true });
      }
    };

    loadLastEmail();
  }, [setValue]);

  const onSubmit = (data: AuthModels.SignInInput) => {
    signIn.mutate(data, {
      onSuccess: (response) => {
        login(response.session.accessToken);
        showToast({
          variant: "success",
          message: `Welcome back, ${response.user.userName || response.user.email}!`,
        });
        router.replace("/(app)/(tabs)");
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : "Failed to sign in";
        showToast({
          variant: "error",
          message: errorMessage,
        });
      },
    });
  };

  const handleEnableFaceID = () => {
    // Handle Face ID setup
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      justifyContent="space-between"
      paddingHorizontal="6"
      overflow="hidden"
    >
      <View style={styles.topCircle} />

      <Box
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
        gap="4"
        style={styles.contentContainer}
      >
        <Text
          variant="variant-6-prominent"
          textAlign="center"
        >
          Sign In
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label=""
              placeholder="Enter email"
              value={value}
              variant="default"
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label=""
              placeholder="Enter password"
              value={value}
              variant="default"
              onChangeText={onChange}
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />
        <Box
          flexDirection="row"
          width="100%"
          justifyContent="flex-end"
          paddingBottom="4"
        >
          <Button
            label="Forgot password?"
            onPress={handleForgotPassword}
            width="fit"
            variant="text"
          />
        </Box>

        <Button
          label="NEXT"
          onPress={handleSubmit(onSubmit)}
          width="fit"
          variant="secondary"
          textVariant="variant-2-prominent"
          disabled={!isValid || signIn.isPending}
        />

        <Button
          label="ENABLE FACE ID"
          onPress={handleEnableFaceID}
          width="fit"
          textVariant="variant-2-prominent"
          variant="tertiary"
          leftElement={
            <ScanFace
              size={20}
              color="#1C1C1C"
            />
          }
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
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
    zIndex: -1,
  },
  yellowText: {
    color: "#F5C344",
  },
  link: {
    textDecorationLine: "underline",
    color: "#1F2937",
  },
  contentContainer: {
    marginTop: 100,
  },
});

export default SignIn;
