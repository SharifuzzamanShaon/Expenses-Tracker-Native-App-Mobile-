import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const Header = ({ title, leftIcon }: { title: string; leftIcon: any |"" }) => {
  return (
    <View style={styles.container}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {title && (
        <Typo
          size={20}
          fontWeight={400}
          style={{ textAlign: "center", width: leftIcon ? "90%" : "100%" }}
        >
          {title}
        </Typo>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop:10
  },

  leftIcon: {
    alignSelf: "flex-start",
  },
});
