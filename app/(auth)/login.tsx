import BackButton from "@/components/BackButton";
import Button from "@/components/Button"; // Assuming you have a Button component
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { checkLoginFormData } from "@/utils/formValidator";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useGlobalContext } from "../../context/authContext";

const Login = () => {
  const { login } = useGlobalContext();
  const router = useRouter();
  const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    const errors = checkLoginFormData(loginInfo);
    if (errors.length > 0) {
      setIsLoading(false);
      Alert.alert(errors[0]);
      return;
    } else {
      const result = await login(loginInfo.email, loginInfo.password);
      if (result.error) {
        setIsLoading(false);
        Alert.alert(result.error);
        Toast.show({
          type: "error",
          text1:`${result.error}`
        })
        return;
      }
      console.log("Login Details", {
        email: loginInfo.email,
        password: loginInfo.password,
      });
      Toast.show({
        type:"success",
        text1: "Login Successs",
        text2: "Welcome to your profile"
      })
      router.push("/profile");
    }
    setIsLoading(false);
  };
  return (
    <ScreenWrapper>
      <BackButton style={{ marginTop: 20, marginLeft: 20 }} />
      <View
        style={{
          gap: 5,
          marginTop: spacingY._50,
          marginHorizontal: spacingX._20,
        }}
      >
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
          <Input
            placeholder="Enter Your Email"
            onChangeText={(text) => setLoginInfo({ ...loginInfo, email: text })}
          ></Input>
          <Input
            placeholder="Enter Your Password"
            secureTextEntry={true}
            onChangeText={(text) =>
              setLoginInfo({ ...loginInfo, password: text })
            }
          ></Input>
          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password?
          </Typo>
          <Button
            loading={isLoading}
            onPress={handleSubmit}
            style={{
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 8,
            }}
            activeOpacity={0.8}
          >
            <Typo
              fontWeight={"500"}
              color={colors.black}
              size={18}
              style={{ textAlign: "center" }}
            >
              Login
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo size={15} color={colors.text}>
            Don&apos;t have an account?
          </Typo>
          <TouchableOpacity onPress={() => router.push("/register")}>
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
    paddingTop: spacingY._20,
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
