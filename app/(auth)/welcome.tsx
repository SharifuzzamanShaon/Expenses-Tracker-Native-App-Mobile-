import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
const Welcome = () => {
    const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
            <Typo color="white" fontWeight={600}>
              Sign In
            </Typo>
          </TouchableOpacity>
          <Animated.Image
            entering={FadeIn.duration(2000)}
            style={styles.welcomeImage}
            resizeMode="contain"
            source={require("../../assets/images/welcome.png")}
          />
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Animated.View style={{ alignItems: "center" }} entering={FadeInDown.duration(1000).damping(5)}>
            <Typo size={30} fontWeight={"800"}>
              Always take control
            </Typo>
            <Typo size={30} fontWeight={"800"}>
              of your finances
            </Typo>
          </Animated.View>
          <View style={{ alignItems: "center", gap: 2 }}>
            <Typo size={17} color={colors.textLight}>
              Finances must be arranged to set a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in future
            </Typo>
          </View>
          <Animated.View entering={FadeInDown.duration(300).damping(10)} style={styles.buttonContainer}>
            <Button onPress={() => router.push("/login")}><Typo color="black" fontWeight={500}>Get Started</Typo></Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

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
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  marginHorizontal: 15,
},

footerTopShadow: {
  position: 'absolute',
  top: -15,
  left: 15,
  right: 15,
  height: 20,
  backgroundColor: 'white',
  opacity: 0.08,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  zIndex: -1,
},


  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
