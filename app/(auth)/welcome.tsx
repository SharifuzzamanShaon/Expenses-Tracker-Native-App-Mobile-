import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";

const welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
            <TouchableOpacity style={styles.loginButton}>
                <Typo color="white" fontWeight={500}>Sign In</Typo>
            </TouchableOpacity>
            <Image
              style={styles.welcomeImage}
              resizeMode="contain"
              source={require('../../assets/images/welcome.png')}
            />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },

  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
