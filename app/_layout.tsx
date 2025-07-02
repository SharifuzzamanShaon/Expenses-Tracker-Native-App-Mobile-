import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "./../context/authContext";
import Toast from "react-native-toast-message";

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
