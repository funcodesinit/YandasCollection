import React from 'react'
import DetailsProdFormComp from './component/DetailsProdFormComp'

interface PageProps {
  params: Promise<{ id: string }>;
}


export default async function page({ params }: PageProps) {
  const { id } = await params;
  const product_id = parseInt(id, 10);
  return (
    <>
     <DetailsProdFormComp  id={product_id} />
    </ >
  )
}
 