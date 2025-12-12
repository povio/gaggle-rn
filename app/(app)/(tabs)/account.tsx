import { useRouter } from "expo-router";
import { Text } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import { useAuthStore } from "@/modules/auth/stores/authStore";

const AccountPage = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    console.log('[Account] Logout button clicked');
    logout();
    console.log('[Account] Logout function completed');
    console.log('[Account] Navigating to /welcome');
    router.replace("/welcome");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      p="4"
      pt="2"
    >
      <Text style={{ fontSize: 15 }}>Account page</Text>
      <Button
        label="Logout"
        onPress={handleLogout}
      />
    </Box>
  );
};

export default AccountPage;
