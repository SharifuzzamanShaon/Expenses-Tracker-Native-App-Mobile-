import { colors, radius } from "@/constants/theme";
import { getFilePath } from "@/services/ImageService";
import { ImageUploadProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import * as ImagePicker from "expo-image-picker";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import Typo from "./Typo";
const ImageUpload = ({
  file = null,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}: ImageUploadProps) => {
  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      onSelect(result.assets[0]);
    }
  };
  
  return (
    <View>
      {!file && (
        <TouchableOpacity
          onPress={onPickImage}
          style={[styles.inputContainer, containerStyle && containerStyle]}
        >
          <Icons.UploadSimple
            size={34}
            color={colors.neutral200}
          ></Icons.UploadSimple>
          {placeholder && <Typo size={15}>{placeholder}</Typo>}
        </TouchableOpacity>
      )}
      {file && (
        <View style={[styles.image, imageStyle && imageStyle]}>
          <Image style={{ flex: 1 }} source={getFilePath(file)} />
          <TouchableOpacity style={styles.deleteIcon} onPress={onClear}>
            <Icons.XCircle
              size={verticalScale(24)}
              weight="fill"
              color={"red"}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    borderRadius: radius._15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
  },
  image: {
    width: scale(150),
    height: scale(150),
    overflow: "hidden",
    borderCurve: "continuous",
    borderRadius: radius._15,
  },
  deleteIcon: {
    position:"absolute",
    top:scale(6),
    right:scale(6),
    shadowColor:colors.black,
    shadowOffset:{width:0, height:5},
    shadowOpacity:1,
    shadowRadius:10,
  },
});
