'use client'
import LoadingComp from '@/components/app/LoadingComp'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { RootState } from '@/store'
import { fetchAdminOrder } from '@/store/actions/cartActions'
import { NoSymbolIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function OrderListComp() {


  const orders = useSelector((state:RootState) => state.cart.order)

  const [appLoading, setAppLoading] = useState(true);
  const distpatch = useDispatch();

  useEffect(() => { 
    distpatch(fetchAdminOrder()).then(()=>setAppLoading(false)) 
  }, [])
  
  if(appLoading) return <LoadingComp />

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Orders</Heading>
        <Button className="-my-0.5">Create order</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Product</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader >Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
        {orders?.length <   1 && (
            <TableRow className="h-24 text-start" colSpan={5}>
                <TableCell className='text-lg text-pink-500 flex items-center flex-row gap-2'><span>No orders found</span> <NoSymbolIcon className='size-4'/></TableCell>
            </TableRow> )
        } 
          {orders?.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
