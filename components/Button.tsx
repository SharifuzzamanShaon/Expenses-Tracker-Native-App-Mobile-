import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Loading from './Loading'
const Button = ({ onPress , style, loading, children }:CustomButtonProps) => {
    if(loading) return (
        <View style={[styles.button, style, { backgroundColor:"transparent", justifyContent: "center" }]}>
            <Loading />
        </View>
    )
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
button: {
backgroundColor: colors.primary,
borderRadius: radius._17,
borderCurve: "continuous",
height: verticalScale(52),
justifyContent: "center",
alignItems: "center",
},
});