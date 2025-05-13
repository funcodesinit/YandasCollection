import ProductsList from '@/components/app/productsList'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
// import { getOrders } from '@/data'
import type { Metadata } from 'next'
import StockListComp from './components/StockListComp'

export const metadata: Metadata = {
  title: 'Stock',
}

export default async function Customers() {
  
     

  return (
    <>
       <StockListComp  />
    </>
  )
}
 
