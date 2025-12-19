import { useRouter } from "expo-router";
import { ScanFace } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import { GoBack } from "@/components/navigation/GoBack";
import Text from "@/components/text/Text";
import { useForm } from "@/hooks/useForm";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { UserAuthModels } from "@/openapi/userAuth/userAuth.models";
import { UserAuthQueries } from "@/openapi/userAuth/userAuth.queries";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

const CreatePassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [invitationCode, setInvitationCode] = useState<string>("");
  const registerMutation = UserAuthQueries.useRegister();
  const { login } = useAuthStore();
  const { getWaitlistEmail, getInvitationCode, setUserCreated, clearInvitationCode, clearPassword } = useOnboarding();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserAuthModels.UserAuthPasswordRegisterRequest>({
    zodSchema: UserAuthModels.UserAuthPasswordRegisterRequestSchema,
    mode: "onChange",
    defaultValues: {
      email: "",
      invitationCode: "",
      name: "test",
      password: "",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      const savedEmail = await getWaitlistEmail();
      const savedCode = await getInvitationCode();

      if (!savedEmail || !savedCode) {
        showToast({
          variant: "error",
          message: "Missing email or invitation code. Please start again.",
        });
        router.replace("/welcome");
        return;
      }

      setEmail(savedEmail);
      setInvitationCode(savedCode);
      setValue("email", savedEmail);
      setValue("invitationCode", savedCode);
    };
    loadData();
  }, [setValue]);

  const handleCreateUser = async (data: UserAuthModels.UserAuthPasswordRegisterRequest) => {
    if (!email || !invitationCode) {
      showToast({
        variant: "error",
        message: "Missing email or invitation code. Please start again.",
      });
      router.replace("/welcome");
      return;
    }

    registerMutation.mutate(
      {
        data: {
          email: email,
          invitationCode: invitationCode.toUpperCase(),
          name: "test",
          password: data.password,
        },
      },
      {
        onSuccess: async (response) => {
          login(response.accessToken);
          await setUserCreated(email);

          // Clear onboarding storage data - no longer needed
          await clearInvitationCode();
          await clearPassword();

          showToast({
            variant: "success",
            message: "Account created successfully!",
          });
          router.push("/profile-setup");
        },
        onError: (error) => {
          const errorMessage = RestUtils.extractServerErrorMessage(error);
          showToast({
            variant: "error",
            message: errorMessage || "Failed to create account",
          });
        },
      },
    );
  };

  const handleEnableFaceID = () => {
    // Handle Face ID setup
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
        gap="4"
        style={styles.contentContainer}
      >
        <Box marginBottom="4">
          <Text
            variant="variant-2-prominent"
            textAlign="center"
          >
            Create Your Password
          </Text>
        </Box>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label=""
              placeholder="Create password"
              value={value}
              variant="default"
              onChangeText={onChange}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />

        <Button
          label="NEXT"
          onPress={handleSubmit(handleCreateUser)}
          width="fit"
          textVariant="variant-2-prominent"
          variant="secondary"
          disabled={!isValid}
          loading={registerMutation.isPending}
        />

        <Button
          label="ENABLE FACE ID"
          onPress={handleEnableFaceID}
          width="fit"
          variant="tertiary"
          textVariant="variant-2-prominent"
          leftElement={
            <ScanFace
              size={20}
              color="#1C1C1C"
            />
          }
        />
      </Box>

      <Box
        paddingBottom="8"
        alignItems="center"
      >
        <Text
          textAlign="center"
          color="text-default-secondary"
        >
          By continuing, you agree to our <Text style={styles.link}>Terms of Services</Text>
          {"\n"}and that you have read our <Text style={styles.link}>Privacy Policy</Text>
        </Text>
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
    fontWeight: 600,
  },
  contentContainer: {
    marginTop: 100,
  },
});

export default CreatePassword;
