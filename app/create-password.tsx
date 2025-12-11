import { useRouter } from "expo-router";
import { ScanFace } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";
import { UsersQueries } from "@/data/users";
import { useOnboarding } from "@/hooks/useOnboarding";
import { showToast } from "@/utils/toast";

const CreatePassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const createUser = UsersQueries.useCreateUser();
  const { getWaitlistEmail, setUserCreated } = useOnboarding();

  useEffect(() => {
    const loadEmail = async () => {
      const savedEmail = await getWaitlistEmail();
      if (savedEmail) {
        setEmail(savedEmail);
      }
    };
    loadEmail();
  }, []);

  const handleNext = () => {
    router.push("/profile-setup");
  };

  const handleCreateUser = async () => {
    if (!email) {
      setError("Email not found. Please start again.");
      showToast({
        variant: "error",
        message: "Email not found",
      });
      return;
    }

    createUser.mutate(
      { email, password },
      {
        onSuccess: async () => {
          await setUserCreated(email);

          showToast({
            variant: "success",
            message: "Account created successfully!",
          });
          handleNext();
        },
        onError: (error) => {
          const errorMessage = error instanceof Error ? error.message : "Failed to create account";
          setError(errorMessage);
          showToast({
            variant: "error",
            message: errorMessage,
          });
        },
      },
    );
  };

  const handleEnableFaceID = () => {
    // Handle Face ID setup
  };

  const isValidPassword = password.length >= 8;

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
        gap="4"
        style={styles.contentContainer}
      >
        <Box marginBottom="4">
          <Text
            variant="variant-2-prominent"
            textAlign="center"
          >
            Create Password
          </Text>
        </Box>

        {error && (
          <Text
            variant="variant-1"
            textAlign="center"
            color="informational-error"
            marginBottom="4"
          >
            {error}
          </Text>
        )}

        <Input
          label=""
          placeholder="Enter password"
          value={password}
          variant="default"
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          secureTextEntry
        />

        <Button
          label="NEXT"
          onPress={handleCreateUser}
          width="fit"
          textVariant="variant-2-prominent"
          variant="secondary"
          disabled={!isValidPassword}
          loading={createUser.isPending}
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
