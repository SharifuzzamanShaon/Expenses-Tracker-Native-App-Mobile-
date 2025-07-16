import { colors, radius, spacingX } from "@/constants/theme";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Router } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import Typo from "./Typo";

const WalletList = ({
  item,
  index,
  router,
}: {
  item: WalletType;
  index: number;
  router: Router;
}) => {
  const openWallet=()=>{
    router.push({
      pathname:"/(modals)/walletModal",
      params:{
        id: item?.id,
        name: item?.name,
        image: item?.image,
      }
    })
  }


  return (
    <Animated.View
      entering={SlideInDown.delay(index * 200)
        .springify()
        .damping(20)}
    >
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        <View style={styles.imageContainer}>
          <Image style={{ flex: 1 }} source={{ uri: item?.image }} />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16}>{item?.name}</Typo>
          <Typo size={14} color={colors.neutral400}>
            ${item?.amount}
          </Typo>
        </View>
        <Icons.CaretRight
          size={verticalScale(20)}
          weight="bold"
          color={colors.white}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WalletList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
    // padding: spacingX._15,
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  },
});
