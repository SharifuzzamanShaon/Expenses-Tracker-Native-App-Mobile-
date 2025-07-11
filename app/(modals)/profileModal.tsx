import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useGlobalContext } from "@/context/authContext";
import { updateUser } from "@/context/userService";
import { UserDataType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import * as Icon from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
const ProfileModal = () => {
  const { user, updateUserData } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  console.log("user on frolie edit", user);

  const [userData, setUserData] = useState<UserDataType>({
    uid: "",
    name: "",
    image: null,
  });
  useEffect(() => {
    setUserData({
      uid: user?.uid || "",
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);
  const onSubmit = async () => {
    setLoading(true);
    console.log("Update user btn");

    if (!userData.name.trim()) {
      Toast.show({
        type: "error",
        text1: "Must contain name length min 6 char",
      });
      setLoading(false);
      return;
    }
    const res = await updateUser(userData?.uid, userData);
    if (res.success) {
      if (typeof updateUserData === "function") {
        updateUserData(userData?.uid as string);
      }
      Toast.show({
        type: "success",
        text1: "Name is update",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    return;
  };
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="Update Profile" leftIcon={<BackButton />} />
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity>
            <Icon.PencilIcon style={styles.editIcon}></Icon.PencilIcon>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Typo color={colors.neutral200}>Name</Typo>
          <Input
            placeholder="Name"
            value={userData.name}
            onChangeText={(value) => setUserData({ ...userData, name: value })}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          onPress={onSubmit}
          style={{ backgroundColor: colors.primary, flex: 1 }}
          loading={loading}
        >
          <Typo color={colors.white} fontWeight={500} size={16}>
            Updata
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._20,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 2,
    marginTop: 50,
    // overflow: "hidden",
    // position: "relative",

    borderColor: colors.primary,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._10,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._15,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
