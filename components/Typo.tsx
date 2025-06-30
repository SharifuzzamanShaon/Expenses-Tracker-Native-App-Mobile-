import { View, Text, TextStyle } from "react-native";
import React from "react";
import { TypoProps } from "@/types";
import { verticalScale } from "@/utils/styling";

const Typo = ({
  style,
  children,
  color,
  size,
  fontWeight = "400",
  textProps = {},
}: TypoProps) => {
    const textStyle : TextStyle={
        fontSize: size ? verticalScale(size) : verticalScale(14),
        color,
        fontWeight,
    }
  return (
    <Text style={[style, textStyle]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;
