import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import BackButton from "@/components/BackButton";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
// eslint-disable-next-line import/no-unresolved
import  {checkRegFormData}  from "../../utils/formValidator"; // Assuming you have a utility function for form validation 
const Register = () => {
  // const email = useRef("");
  // const password = useRef("");
  const router = useRouter();
  const [loginInfo, setLoginInfo] = React.useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async () => {
    const errors = checkRegFormData(loginInfo);
    if (errors.length > 0) {
      Alert.alert(errors[0]);
      return;
    } else {
      console.log("Register Details", {
        email: loginInfo.email,
        username: loginInfo.username,
        password: loginInfo.password,
      });

      Alert.alert(
        "Register Successful",
        `Email: ${loginInfo.email}, Username: ${loginInfo.username}, Password: ${loginInfo.password}`
      );
    }
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
          Let&apos;s Get You Started
        </Typo>
        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Register now to track all your expenses
          </Typo>
          {/* /* input */}
            <Input
            placeholder="Enter Your Email"
            onChangeText={(text) => setLoginInfo({ ...loginInfo, email: text })}
          ></Input>
          <Input
            placeholder="Enter Your Username"
            onChangeText={(text) => setLoginInfo({ ...loginInfo, username: text })}
          ></Input>
          <Input
            placeholder="Enter Your Password"
            secureTextEntry={true}
            onChangeText={(text) => setLoginInfo({ ...loginInfo, password: text })}
          ></Input>
          {/* <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
          ..
          </Typo> */}
          <Button
            onPress={handleSubmit}
            style={{
              padding: 10,
              backgroundColor: colors.primary,
              borderRadius: 8,
            }}
          >
            <Typo
              fontWeight={"500"}
              color={colors.black}
              size={18}
              style={{ textAlign: "center" }}
            >
              Sign Up
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo size={15} color={colors.text}>
            Already have an account?
          </Typo>
          <TouchableOpacity onPress={()=>router.push("/login")}>
            <Typo size={15} color={colors.primary}>
              Login
            </Typo>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
