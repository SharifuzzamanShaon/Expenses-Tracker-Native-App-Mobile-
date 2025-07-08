import Button from "@/components/Button";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { myAuth } from "@/config/firebase";
import { colors } from "@/constants/theme";
import { useGlobalContext } from "@/context/authContext";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, View } from "react-native";

const Profile = () => {
  const { user } = useGlobalContext();
  // const {user} = useGlobalContext();
  console.log('====================================');
  console.log('user from profile', user);
  console.log('====================================');
  const handleLogout = async () => {
    await signOut(myAuth);
  };
  return (
    <ScreenWrapper>
      <Header title="Profile" />
      <Typo style={{ padding: 20 }} fontWeight={500} size={16}>
        {`${user?.name || user?.email}`}
      </Typo>
      <View style={styles.container}>
        <Button onPress={handleLogout}>
          <Typo color={colors.white} fontWeight={500} size={16}>
            Logout
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    // alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
