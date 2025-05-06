import React from 'react'
import CreateProdFormComp from './component/CreateProdFormComp'
import { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'Create Product',
}

export default function page() {
  return (
    < >
        <CreateProdFormComp />
    </ >
  )
}