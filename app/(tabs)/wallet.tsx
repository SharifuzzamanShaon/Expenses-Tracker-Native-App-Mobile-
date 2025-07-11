import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Wallet = () => {
  const router = useRouter()
  const getTotalBalance = () => {
    return 2293;
  };

  const handlePress=()=>{
    router.push("(modals)/walletModal");
  }
  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        {/* balance view */}
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={40} fontWeight={"500"}>
              ${getTotalBalance()?.toFixed(2)}
            </Typo>
          </View>
        </View>
      </View>
      <View style={styles.wallets}>
        <View style={styles.flexRow}>
          <Typo size={20}>My Wallet</Typo>
          <TouchableOpacity onPress={()=>router.push("/(modals)/walletModal")}>
            <Icons.PlusCircleIcon weight="fill" color={colors.primary} size={verticalScale(33)}></Icons.PlusCircleIcon>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
