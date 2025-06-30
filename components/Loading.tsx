import {StyleSheet, ActivityIndicatorProps, View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const Loading = ({size="large", color=colors.primary}: ActivityIndicatorProps) => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        size={size}
        color={color}
        style={{marginVertical: 20}}
      />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})