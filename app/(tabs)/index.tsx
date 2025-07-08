import Header from '@/components/Header'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import React from 'react'
import { StyleSheet } from 'react-native'

const index = () => {
  return (
    <ScreenWrapper>
      <Header title="Home" />
      <Typo>index</Typo>
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({})