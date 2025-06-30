import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ScreenWrapperProps } from "../types";
import { colors } from "@/constants/theme";

const { height } = Dimensions.get("window");
const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const padding = Platform.OS === "ios" ? height * 0.6 : 40;
  return (
    <View
      style={[
        style,
        { paddingTop: padding, backgroundColor: colors.neutral900, flex: 1 },
      ]}
    >
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
