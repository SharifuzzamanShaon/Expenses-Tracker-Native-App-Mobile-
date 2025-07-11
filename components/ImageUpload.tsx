import { colors, radius } from "@/constants/theme";
import { getFilePath } from "@/services/ImageService";
import { ImageUploadProps } from "@/types";
import { verticalScale } from "@/utils/styling";
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
  return (
    <View>
      {!file && (
        <TouchableOpacity
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
          <Image
            style={{ flex: 1 }}
            source={getFilePath(file)}
            contentFit="cover"
            transition={100}
          />
          <TouchableOpacity style={styles.deleteIcon}>
            <Icons.XCircle
              size={verticalScale(24)}
              weight="fill"
              color={colors.white}
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
  image: {},
  deleteIcon: {},
});
