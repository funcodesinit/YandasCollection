
import React from 'react'
import { Metadata } from 'next'; 
import ProductDetails from '@/components/app/ProductDetails';


export const metadata: Metadata = {
  title: "Yanda's Collection",
  description: "find the best clothes",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product_id = parseInt(id, 10);
  
  return (
    <> 
        <ProductDetails id={product_id} /> 
    </>

  )
}

