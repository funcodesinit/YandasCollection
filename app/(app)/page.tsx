
import { View, Text } from 'react-native'
import React from 'react'
import { Metadata } from 'next';
import TopComp from '@/components/app/carousel';
import TrendingProducts from '@/components/app/TrendingProducts';
import CatSmartComp from '@/components/app/catSmart';
import IncentivesComp from '@/components/app/incetives';
 


export const metadata: Metadata = {
  title: "Yanda's Collection",
  description: "find the best clothes",
};


export default function LoginPage() {

  return (
    <>
        <TopComp />
        <TrendingProducts />
        {/* category barner for smart wear  */}
        <CatSmartComp />
 
    
        {/* <CatLingerieComp /> */}
        <IncentivesComp /> 
  
    </>

  )
}

