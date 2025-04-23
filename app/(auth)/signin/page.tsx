
import { View, Text } from 'react-native'
import React from 'react'
import SignInComp from './Components/SignInComp'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign-in Yandascollection",
  description: "find the best clothes",
};


export default function LoginPage() {

  return (
    <>
      <SignInComp /> 
    </>
  )
}

