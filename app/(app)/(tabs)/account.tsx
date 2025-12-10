import { Text } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import { useAuthStore } from "@/modules/auth/stores/authStore";

const AccountPage = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
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
