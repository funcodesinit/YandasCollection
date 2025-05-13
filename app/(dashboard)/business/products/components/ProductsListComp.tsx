'use client'

import LoadingComp from '@/components/app/LoadingComp'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { TableCell, TableRow } from '@/components/table'
import { RootState } from '@/store'
import { fetchPublicCategoryList, fetchPublicProductList } from '@/store/actions/productActions'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { NoSymbolIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function ProductsListComp() {
    const [loading, setLoading] = useState(true)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(fetchPublicCategoryList())
      dispatch(fetchPublicProductList()).then(()=>setLoading(false))
    }, [dispatch])
    
    const prod = useSelector((state:RootState)=>state.products.products)
   
    if(loading) return <LoadingComp />

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Products</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search products&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="all">Select Category</option>
                <option value="date">Sort by date</option>
              </Select>
            </div>
          </div>
        </div>
        <a href="/business/products/create" className="max-sm:w-full sm:w-auto">
          {/* <Button variant="solid" color="lime" className="w-full sm:w-auto"> */}
          <Button>Create Product</Button>
        </a>
      </div>
      <ul className="mt-10">
        {prod?.length < 1 && (
            <TableRow className="h-24 text-start" colSpan={5}>
                <TableCell className='text-lg text-pink-500 flex items-center flex-row gap-2'><span>No products found</span> <NoSymbolIcon className='size-4'/></TableCell>
            </TableRow> )
        } 
        {prod?.map((product, index) => (
          <li key={product.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between">
              <div key={product.id} className="flex gap-6 py-6">
                <div className="w-32 shrink-0">
                  {/* <Link href={product?.url} aria-hidden="true">
                    <img className="aspect-3/2 rounded-lg shadow-sm" src={product.imgUrl} alt="" />
                  </Link> */}
                </div>
                <div className="space-y-1.5">
                  <div className="text-base/6 font-semibold">
                    <Link href={`/business/products/${product?.id}`}>{product.name}</Link>
                  </div>
                  <div className="text-xs/6 text-zinc-500">
                    ZMW {product?.price}  
                  </div>
                  <div className="text-xs/6 text-zinc-600">
                    {product?.createdAt}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="max-sm:hidden" color={!product?.isPub === 'On Sale' ? 'lime' : 'zinc'}>
                  is public
                </Badge>
               
                <Link href={`/business/products/${product?.id}`}>
                View
                </Link>
                  
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
