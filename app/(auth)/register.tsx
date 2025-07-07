import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useGlobalContext } from "../../context/authContext";
import { checkRegFormData } from "../../utils/formValidator";

const Register = () => {
  const router = useRouter();
  const [regInfo, setRegInfo] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setLoading] = React.useState(false);
  const { register } = useGlobalContext();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const errors = checkRegFormData(regInfo);
      if (errors.length > 0) {
        Toast.show({
          type: "error",
          text1: `${errors[0]}`,
        });
        return;
      }
      const response = await register(
        regInfo.email,
        regInfo.username,
        regInfo.password
      );
      if (response.success === false) {
        Toast.show({
          type: "error",
          text1: `${response.message}`,
        });
        setLoading(false);
        return;
      }
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Welcome to Expense Tracker",
      });
      setLoading(false);
    } catch (error: any) {
      console.log("catch err", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong, Try again",
      });
      setLoading(false);
      return;
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
            onChangeText={(text) => setRegInfo({ ...regInfo, email: text })}
          ></Input>
          <Input
            placeholder="Enter Your Username"
            onChangeText={(text) => setRegInfo({ ...regInfo, username: text })}
          ></Input>
          <Input
            placeholder="Enter Your Password"
            secureTextEntry={true}
            onChangeText={(text) => setRegInfo({ ...regInfo, password: text })}
          ></Input>
          {/* <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
          ..
          </Typo> */}
          <Button
            loading={isLoading}
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
          <TouchableOpacity onPress={() => router.push("/login")}>
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
