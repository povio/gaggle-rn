import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    router.push("/password-reset-sent");
  }

  const isValidEmail = (emailValue: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailValue);
  }

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
        <Text
            variant="variant-6-prominent"
            textAlign="center"
          >
            Enter your email
          </Text>

<Input
          label=""
          placeholder="Enter email"
          value={email}
          variant="default"
          onChangeText={setEmail}
          secureTextEntry
        />
        <Button
          label="SEND EMAIL"
          onPress={() => {}}
          width="fit"
          variant="secondary"
          disabled={true} 
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

export default ForgotPassword;
