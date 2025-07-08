import Button from '@/components/Button'
import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const index = () => {
  return (
    <ScreenWrapper>
      <Header title="Home" />
      <Typo>index</Typo>
            <View style={styles.logoutBtn}>
              <Button  onPress={() => {}} style={{ backgroundColor: colors.primary }}>
                <Typo color={colors.white} fontWeight={500} size={16}>
                  Logout
                </Typo>
              </Button>
            </View>
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({
  logoutBtn: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },})