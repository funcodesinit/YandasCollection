
import { Metadata } from 'next'; 
import ProductsList from '@/components/app/productsList';
 

export const metadata: Metadata = {
  title: "Yanda's Collection",
  description: "find the best clothes",
};


export default function ProductPage() {
  return (
    <>
      <ProductsList />
    </>
  )
}

