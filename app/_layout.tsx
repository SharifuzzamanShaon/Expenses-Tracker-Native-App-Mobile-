import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./../context/authContext";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/profileModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
      name="(modals)/walletModal"
      options={{presentation:"modal"}}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
      <Toast position="top" bottomOffset={20} />
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({});
