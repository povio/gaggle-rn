import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Button from "@/components/buttons/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const BottomNavbar = () => {
  const handleHome= () => {
    // 
  }
  const handleFavorites= () => {
    // 
  }
  const handleBookings= () => {
    // 
  }
  const handleChats= () => {
    // 
  }
  const handleProfile= () => {
    // 
  }
  
  return (
    <View style={styles.container}>
      <Button
          label="Home"
          onPress={handleHome}
          width="fit"
          variant="text"
        />
      <Button
          label="Favorites"
          onPress={handleFavorites}
          width="fit"
          variant="text"
        />
      <Button
          label="Bookings"
          onPress={handleBookings}
          width="fit"
          variant="text"
        />
      <Button
          label="Chats"
          onPress={handleChats}
          width="fit"
          variant="text"
        />
       <Button
          label="Profile"
          onPress={handleProfile}
          width="fit"
          variant="text"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
    height: 78,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "column-reverse",
  }
});
