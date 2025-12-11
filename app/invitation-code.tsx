import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import TextButton from "@/components/buttons/TextButton";
import Image from "@/components/Image";
import Text from "@/components/text/Text";
import { WaitlistQueries } from "@/data/waitlist";
import { useOnboarding } from "@/hooks/useOnboarding";
import { showToast } from "@/utils/toast";

const InvitationCode = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(RNTextInput | null)[]>([]);
  const verifyCode = WaitlistQueries.useVerifyInvitationCode();
  const markCodeAsUsed = WaitlistQueries.useMarkCodeAsUsed();
  const { getWaitlistEmail, setEmailVerified } = useOnboarding();

  useEffect(() => {
    const loadEmail = async () => {
      const savedEmail = await getWaitlistEmail();
      if (savedEmail) {
        setEmail(savedEmail);
      }
    };
    loadEmail();
  }, []);

  useEffect(() => {
    setIsCodeValid(code.every((v) => /^\d+$/.test(v)));
  }, [code]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (!/^\d$/.test(key) && key !== "Backspace") return;

    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = async () => {
    if (!email) {
      setError("Email not found. Please start again.");
      return;
    }

    const enteredCode = code.join("");

    verifyCode.mutate(
      { email, code: enteredCode },
      {
        onSuccess: async () => {
          markCodeAsUsed.mutate(
            { email },
            {
              onSuccess: async () => {
                await setEmailVerified(email);
                showToast({
                  variant: "success",
                  message: "Code verified successfully!",
                });
                router.push("/create-password");
              },
              onError: () => {
                setError("Failed to verify code. Please try again.");
                showToast({
                  variant: "error",
                  message: "Verification failed",
                });
              },
            },
          );
        },
        onError: () => {
          setError("Invalid invitation code. Please try again.");
          showToast({
            variant: "error",
            message: "Invalid invitation code",
          });
        },
      },
    );
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      paddingHorizontal="6"
      justifyContent="space-between"
    >
      <View style={styles.bottomCircle} />

      <Box
        flex={1}
        marginTop="12"
      >
        <Box
          alignItems="center"
          marginBottom="12"
        >
          <Image
            source={require("@/assets/illustrations/capa_2.svg")}
            style={styles.logo}
            contentFit="contain"
          />
        </Box>

        <Text
          variant="variant-6-prominent"
          textAlign="center"
          marginBottom="2"
        >
          Please enter the invitation code
        </Text>

        {email && (
          <Text
            textAlign="center"
            color="text-default-secondary"
            marginBottom="6"
          >
            We sent it to {email}
          </Text>
        )}

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

        <Box
          flexDirection="row"
          justifyContent="center"
          gap="3"
          marginBottom="6"
        >
          {code.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.codeInput}
              value={digit}
              onChangeText={(value) => {
                if (/^\d$/.test(value)) handleCodeChange(index, value);
              }}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          width="100%"
          flexDirection="row"
          marginBottom="6"
        >
          <TextButton
            label="Didn't receive the code?"
            onPress={() => router.push("/code-resent")}
            variant="secondary"
            textVariant="variant-10-prominent"
          />
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          width="100%"
          flexDirection="row"
          marginBottom="6"
        >
          <Button
            label="NEXT"
            onPress={handleNext}
            textVariant="variant-2-prominent"
            width="m"
            disabled={!isCodeValid}
            loading={verifyCode.isPending || markCodeAsUsed.isPending}
            variant="secondary"
          />
        </Box>
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
    </Box>
  );
};

const styles = StyleSheet.create({
  bottomCircle: {
    position: "absolute",
    bottom: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
  },
  logo: {
    width: 64,
    height: 64,
  },
  codeInput: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#1F2937",
  },
  link: {
    textDecorationLine: "underline",
    color: "#1F2937",
    fontWeight: 600,
  },
});

export default InvitationCode;
