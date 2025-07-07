import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./../context/authContext";

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
      <Toast position="top" bottomOffset={20} />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
