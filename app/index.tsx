import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'

const Index = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/welcome')
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
      style={styles.logo}
        resizeMode="contain"
        source={require('../assets/images/splashImage.png')}
      />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral900,
  },
  logo:{
    width: 150,
    height: 150,
    marginBottom: 20,
  }
})