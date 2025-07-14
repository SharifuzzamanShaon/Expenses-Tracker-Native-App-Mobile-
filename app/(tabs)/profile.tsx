import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { myAuth } from "@/config/firebase";
import { colors } from "@/constants/theme";
import { useGlobalContext } from "@/context/authContext";
import { accountOptionType } from "@/types";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import * as Icons from "phosphor-react-native"; // Ensure you have this package installed
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
const Profile = () => {
  const { user } = useGlobalContext();
  const router = useRouter()
  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#a3e635",
    },
    {
      title: "Settings",
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/settings",
      bgColor: "#f59e0b",
    },
    {
      title: "Privacy",
      icon: <Icons.LockKey size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/privacy",
      bgColor: "#6366f1",
    },
    {
      title: "Logout",
      icon: <Icons.SignOut size={26} color={colors.white} weight="fill" />,
      routeName: "",
      bgColor: "red",
    },
  ];
  const handlePress = (item: accountOptionType) => {
    if (item?.title === "Logout") {
      Alert.alert(
        "Logout",
        "Are you sure you want to Logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: handleLogout,
          },
        ],
        { cancelable: false }
      );
    } 
     if (item.routeName === "/(modals)/profileModal") {
        router.push("/(modals)/profileModal")
    } 
  };
  const handleLogout = async () => {
    await signOut(myAuth);
  };
  return (
    <ScreenWrapper>
      <Header title="Profile" leftIcon={""} />
      <View style={styles.profileInfo}>
        <Image
          source={{
            uri:
              user?.image 
          }}
          style={styles.profileImage}
        />
        <Typo style={{}} fontWeight={500} size={20}>
          {`${user?.name || user?.email}`}
        </Typo>

        <Typo style={{ color: colors.neutral400 }} fontWeight={400} size={16}>
          {` ${user?.email}`}
        </Typo>
      </View>
      {/* Account Options */}
      <View style={styles.accountOptions}>
        {accountOptions.map((item, index) => {
          return (
            <Animated.View
              entering={SlideInDown.delay(index * 200)
                .springify()
                .damping(20)}
              style={styles.listItem}
              key={index}
            >
              <TouchableOpacity
                style={styles.flexRow}
                onPress={() => handlePress(item)}
              >
                <View
                  style={[
                    styles.listIcon,
                    {
                      backgroundColor: item?.bgColor,
                    },
                  ]}
                >
                  {item.icon}
                </View>
                <Typo size={16} style={{ flex: 1 }} fontWeight={"500"}>
                  {item.title}
                </Typo>
                <Icons.CaretRight
                  size={20}
                  weight="bold"
                  color={colors.white}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileInfo: {
    flex: 1,
    paddingBlock: 5,
    marginBottom: 40,
    alignItems: "center",
  },
  logoutBtn: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: colors.primary,
    borderWidth: 4,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  accountOptions: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    backgroundColor: colors.neutral800,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
// (Removed duplicate handleLogout function)
function handleLogout(): void {
  throw new Error("Function not implemented.");
}
