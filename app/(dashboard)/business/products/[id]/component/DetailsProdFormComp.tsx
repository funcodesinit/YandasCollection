'use client'
import LoadingComp from '@/components/app/LoadingComp'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Divider } from '@/components/divider'
import { Label } from '@/components/fieldset'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import { useAppContext } from '@/context/AppProvider'
import { RootState } from '@/store'
import { fetchPublicCategoryList, fetchPublicProductDetails } from '@/store/actions/productActions'
import { ErrorMessage, Field, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';

export default function DetailsProdFormComp({ id }: { id: number }) {

  const {  setAppAlert } = useAppContext();

  const [loading, setLoading] = useState(true);
  
  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPublicCategoryList())
  }, [])

  useEffect(() => {
    dispatch(fetchPublicProductDetails(id)).finally(() => setLoading(false));
    
  }, [id])


  const category = useSelector((state: RootState) => state.products.category)
  const product = useSelector((state: RootState) => state.products.selected_product)


  const initialValues = {
    name: product.name || 'test',
    price: product.price || '',
    discount: product.discount || '',
    description: product.description || '',
    stock: product.stock || '1',  
    categoryId: product.categoryId || '',
    // category: [],
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').min(0),
    discount: Yup.number().min(0),
    description: Yup.string(),
    stock: Yup.number().required('Stock is required').min(0),
    categoryId: Yup.string().required('Category is required'),
  })


  const handleSubmit = (values: typeof initialValues) => {
    // console.log('Form Submitted:', values)
    // dispatch action or make API call here
    const Method = 'PATCH'
    const url = '/api/products'
    const body = {
      name: values.name,
      description: values.description,
      price: parseFloat(values.price),
      discount: parseFloat(values.discount),
      stock: parseInt(values.stock),
      isPub: true,
      categoryId: values.categoryId,
    }
    // console.log('Form Submitted:', body)
    fetch(url, {
      method: Method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        // Handle success
      })
      .catch((error) => {
        console.error('Error:', error)
        // Handle error
      }) 
      setAppAlert({
        status:'success',
        title:'Created Product',
        msg: 'Product created successfully',
        live:true,
      })
      // redirect 
      router.push('/business/products')
  }

  if(loading) return <LoadingComp />

  console.log('--------------', product)

  return <Formik initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    enableReinitialize={true}
  >
    {({ isSubmitting, values, handleSubmit, handleChange }) => (
      <form method="post" onSubmit={handleSubmit}  className="mx-auto max-w-4xl">
        <Heading>Create Product</Heading>
        <Divider className="my-10 mt-6" />
        {/* Product cate */}

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Category</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Field as={Select} name="categoryId">
              <option value="">Select category</option>

              {Array.isArray(category) && category?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="categoryId" component="div" className="text-red-500" />
          </div>
        </section>

        <Divider className="my-5" soft />

        {/* Product Name */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Product Name</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Field as={Input} name="name"   placeholder="Product Name" />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>
        </section>

        <Divider className="my-5" soft />

        {/* Price */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Price (ZMW)</Subheading>
            <Text>Set the base price of the product in kwacha.</Text>
          </div>
          <div>
            <Field as={Input} type="number" name="price" placeholder="Price" />
            <ErrorMessage name="price" component="div" className="text-red-500" />
          </div>
        </section>

        <Divider className="my-5" soft />

        {/* Discount */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Discount (ZMW)</Subheading>
            <Text>Optional. Value of discount in kwacha.</Text>
          </div>
          <div>
            <Field as={Input} type="number" name="discount" placeholder="Discount in kwacha" />
            <ErrorMessage name="discount" component="div" className="text-red-500" />
          </div>
        </section>

        <Divider className="my-5" soft />

        {/* Description */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Description</Subheading>
            <Text>This is where your organization is registered.</Text>
          </div>
          <div>
            <Field as={Textarea} name="description" placeholder="Description..." />
            <ErrorMessage name="description" component="div" className="text-red-500" />
          </div>
        </section>

        <Divider className="my-5" soft />

        {/* stock */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>stock</Subheading>
            <Text>The product stock .</Text>
          </div>
          <div>
            <Field as={Input} type="number" value={values.stock} name="stock" placeholder="Product stock" />

            <ErrorMessage name="currency" component="div" className="text-red-500" />
          </div>
        </section>

       

        <Divider className="my-5" soft />

        <div className="flex justify-end gap-4">
          {/* <Button type="reset" plain>
            Reset
          </Button> */}
          <Button type="submit"  className='cursor-pointer' disabled={isSubmitting}>
            <span>Save changes</span>
            {isSubmitting ?
              (
                <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd" />
                </svg>
              )
            }
          </Button>
        </div>
      </form>
    )}
  </Formik>

}
