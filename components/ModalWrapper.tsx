import { colors } from "@/constants/theme";
import { ModalWrapperProps } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";

const ModalWrapper = ({
  style,
  children,
  bg = colors.neutral700,
}: ModalWrapperProps) => {
  return (
    <View style={[styles.container, { backgroundColor: bg }, style && style]}>
      {children}
    </View>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
