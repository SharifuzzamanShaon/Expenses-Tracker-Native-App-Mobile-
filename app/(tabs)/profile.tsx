import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { myAuth } from '@/config/firebase'
import { colors } from '@/constants/theme'
import { signOut } from 'firebase/auth'
import React from 'react'
import { StyleSheet, View } from 'react-native'
// import { useGlobalContext } from '@/context/authContext';

const Profile = () => {
    // const {user} = useGlobalContext();
  const handleLogout=async()=>{
   await signOut(myAuth)
  }
  return (
    <View>
      <Button onPress={handleLogout}>
        <Typo color={colors.black}>
          Logout
        </Typo>
      </Button>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})