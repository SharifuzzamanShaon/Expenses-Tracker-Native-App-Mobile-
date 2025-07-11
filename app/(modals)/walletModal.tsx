import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { UserDataType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
const WalletModal = () => {
   
  const [loading, setLoading] = useState(false);
   
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });
  
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="New Wallet" leftIcon={<BackButton />} />

        <View style={styles.inputContainer}>
          <Typo color={colors.neutral200}>Wallet Name</Typo>
          <Input
            placeholder="Name"
            value={userData.name}
            onChangeText={(value) => setUserData({ ...userData, name: value })}
          />
           <Typo color={colors.neutral200}>Wallet Icon</Typo>
            <ImageUpload placeholder="Upload Image" onClear={()=>{}} onSelect={()=>{}}/>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          onPress={() => {}}
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

export default WalletModal;

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
    marginTop:30,
    gap: spacingY._10,
  },
});
