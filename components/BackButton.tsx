import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BackButtonProps } from '@/types'
import { useRouter } from 'expo-router'
import { CaretLeftIcon } from 'phosphor-react-native'
import { colors, radius } from '@/constants/theme'
const BackButton = ({style, iconSize=32}:BackButtonProps) => {
    const router = useRouter()
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => router.back()}>
        <CaretLeftIcon size={iconSize} color={colors.white} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
button: {
backgroundColor: colors.neutral600,
alignSelf: "flex-start",
borderRadius: radius._12,
borderCurve: "continuous",
padding: 5,
},
});  