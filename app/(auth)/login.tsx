import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import BackButton from "@/components/BackButton";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Input from "@/components/Input";

const Login = () => {
    const handleSubmit = () => {
        // Handle login logic here
        console.log("Login button pressed");
    };
  return (
    <ScreenWrapper>
      <BackButton style={{ marginTop: 20, marginLeft: 20 }} />
      <View style={{ gap: 5, marginTop: spacingY._20, marginLeft: spacingX._20 }}>
        <Typo size={30} fontWeight={"800"}>
          Hey,
        </Typo>
        <Typo size={30} fontWeight={"800"}>
          Welcome Back
        </Typo>
      {/* form */}
      <View style={styles.form}>
        <Typo size={16} color={colors.textLighter}>
          Login now to track all your expenses
        </Typo>
        {/* /* input */}
        <Input placeholder="Enter Your Email"></Input>
        <Input placeholder="Enter Your Password" secureTextEntry={true}></Input>
        <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password?
        </Typo>
        <TouchableOpacity  onPress={handleSubmit} style={{ padding: 12, backgroundColor: colors.primary, borderRadius: 8 }}>
          <Typo fontWeight={"600"} color={colors.black} size={21} style={{ textAlign: "center"}}>
            Login
          </Typo>
        </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Typo size={15} color={colors.text}>
            Don&apos;t have an account?
          </Typo>
          <TouchableOpacity>
            <Typo size={15} color={colors.primary}>
              Sign Up
            </Typo>
          </TouchableOpacity>
      </View>
        </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    paddingTop: spacingY._20,
    gap: spacingY._20,
    
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
