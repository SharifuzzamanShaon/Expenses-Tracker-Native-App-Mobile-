import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/authContext';

const Profile = () => {
    const {user: {email, password}} = useGlobalContext();
  return (
    <View>
      <Text>profile</Text>
      {email && (
        <View>
          <Text>Email: {email}</Text>
          <Text>Password: {password}</Text>
        </View>
      )}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})