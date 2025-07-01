import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { verticalScale } from "@/utils/styling";
import { colors, radius } from "@/constants/theme";
import { InputProps } from "@/types";

const Input = (props: InputProps) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}
    >
      {props.icon && props.icon}
      <TextInput
        style={[styles.input, props.inputStyle, { fontSize: verticalScale(16) }]}
        placeholderTextColor={colors.neutral400}
        // ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
  },
  input: {
    flex: 1,
    fontSize: verticalScale(14),
    paddingHorizontal: verticalScale(15),
    color: colors.white,
  },
});
