import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { RootState } from '@/store'
// import { getOrders } from '@/data'
import type { Metadata } from 'next'
import { useSelector } from 'react-redux'
import CreateStaffUserFormComp from './components/CreateStaffUserFormComp'

export const metadata: Metadata = {
  title: 'Create Staff Users',
}

export default async function Customers() {
  

  return (
    <>
       <CreateStaffUserFormComp  />
    </>
  )
}
 
