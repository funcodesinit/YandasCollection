'use client'
import { fetchPublicProductList } from '@/store/actions/productActions';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function TopComp() {
    const dispatch = useDispatch();
     
    useEffect(() => {
        dispatch(fetchPublicProductList())
    }, [dispatch])
    

    return (
        <div className="flex flex-row gap-2 bg-pink-200  h-180 mt-7">
            <div className='w-2/5 bg-blue-100   '>
                <img src='https://i.pinimg.com/236x/83/3d/19/833d1972183ff9b8015b8b91ed00c4e9.jpg' 
                className="h-1/2 w-fit basis-64 " />
                <img src='https://i.pinimg.com/236x/b0/c8/aa/b0c8aa63332351a30257229d9818584a.jpg'
                 className="h-1/2  basis-64 w-fit " />
            </div>
            <img src='https://i.pinimg.com/474x/f1/15/09/f115092afd92f8d56b04a6445a132447.jpg' 
            className="aspect-auto bg-red-200 " />
        </div>
    )
}