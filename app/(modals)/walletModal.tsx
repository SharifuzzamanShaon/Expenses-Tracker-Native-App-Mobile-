import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useGlobalContext } from "@/context/authContext";
import { create0rUpdateWallet, deleteWallet } from "@/services/walletService";
import { WalletType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

const WalletModal = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContext();
  const router = useRouter();
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  });
  const oldWalltet: { id: string; name: string; image: string } =
    useLocalSearchParams();
  useEffect(() => {
    if (oldWalltet?.id) {
      setWallet({
        name: oldWalltet.name,
        image: oldWalltet.image,
      });
    }
  }, []);
  const onSubmit = async () => {
    setLoading(true);
    const { name, image } = wallet;
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Must contain name length min 6 char",
      });
      setLoading(false);
      return;
    }
    let data: WalletType = {
      uid: user?.uid,
      name: name,
      image: image,
    };
    if (oldWalltet?.id) data.id = oldWalltet?.id;

    setLoading(true);
    const res = await create0rUpdateWallet(data);
    if (res.success) {
      router.back();
      Toast.show({
        type: "success",
        text1: oldWalltet?.id ? "Wallet Updated" : "Wallet is Created",
      });
      setLoading(false);
      return;
    } else {
    }
    setLoading(false);
    return;
  };
  const onDelete = async() => {
    if (!oldWalltet?.id) return;
    setLoading(true);
    const res= await deleteWallet(oldWalltet?.id);

    setLoading(false);
    if(res.success){
      router.back()
    }else{
      Alert.alert("Fiald", "Failed to delete")
    }
  };
  const hanldeDeleteWallet = () => {
    Alert.alert("Delete Wallte", "Are you sure to delete this wallet", [
      { text: "cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDelete() },
    ]);
  };
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWalltet.id ? "Update Wallet" : "New Wallet"}
          leftIcon={<BackButton />}
        />

        <View style={styles.inputContainer}>
          <Typo color={colors.neutral200}>Wallet Name</Typo>
          <Input
            placeholder="Name"
            value={wallet.name}
            onChangeText={(value) => setWallet({ ...wallet, name: value })}
          />
          <Typo color={colors.neutral200}>Wallet Icon</Typo>
          <ImageUpload
            placeholder="Upload Image"
            onClear={() => setWallet({ ...wallet, image: null })}
            onSelect={(file) => setWallet({ ...wallet, image: file })}
            file={wallet.image}
          />
        </View>
      </View>
      <View style={styles.footer}>
        {oldWalltet.id && !loading && (
          <Button
            onPress={hanldeDeleteWallet}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Icons.Trash color={colors.white}></Icons.Trash>
          </Button>
        )}
        <Button
          onPress={onSubmit}
          style={{ backgroundColor: colors.primary, flex: 1 }}
          loading={loading}
        >
          <Typo color={colors.black} fontWeight={500} size={16}>
            {oldWalltet?.id ? "Update" : "Add Wallet"}
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
    marginTop: 30,
    gap: spacingY._10,
  },
});
