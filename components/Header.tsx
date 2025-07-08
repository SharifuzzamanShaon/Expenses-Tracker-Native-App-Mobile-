import React from 'react'
import { StyleSheet, View } from 'react-native'
import Typo from './Typo'

const Header = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <Typo size={20} fontWeight={400} style={styles.title}>{title}</Typo>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})