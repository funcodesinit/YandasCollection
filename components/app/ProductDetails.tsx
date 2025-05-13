

'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabGroup, TabList, TabPanels, Tab, TabPanel } from '@headlessui/react';
import { RadioGroup, Radio } from '@headlessui/react';
import { StarIcon, HeartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { fetchPublicProductDetails } from '@/store/actions/productActions';
import { RootState } from '@/store';
import LoadingCompPop from './LoadingCompPop';
import * as Yup from 'yup';
import { FieldArray, Formik } from 'formik';
import { useAppContext } from '@/context/AppProvider';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}


const validationSchema = Yup.object({
  productId: Yup.number(),
  productImageId: Yup.string().required("please select product image color"),
  sizeId: Yup.string().required("please select product size"),
  quantity: Yup.number().required("please select product quantity"),
});

export default function ProductDetails({ id }: { id: number }) {
  const { cartDrawerOpen, toggleCartDrawer, setAppAlert } = useAppContext();
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [cart, setCart] = useState<{ [key: number]: { [key: number]: number } }>({});
  const product = useSelector((state: RootState) => state.products.selected_product);

  useEffect(() => {
    dispatch(fetchPublicProductDetails(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedColor(product.images[0]);
    }
  }, [product]);

  if (loading || !product || !selectedColor) return <LoadingCompPop />;

  const discountedPrice = product ? product.price - product.discount : 0;
  const outOfStock = product ? !product.stock === 0 : true;

  const getColorCount = (colorId: number) => {
    const colorCart = cart[colorId] || {};
    return Object.values(colorCart).reduce((sum, qty) => sum + qty, 0);
  };



  const submitForm = async (values) => {
    const METHOD = 'POST';
    try {
      const res = await fetch("/api/public/cart", {
        method: METHOD,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.error);
        return;
      }

      console.log("Cart Updated:", data.product);
      setAppAlert({
        status:'success',
        title:'Added an Item to cart',
        msg:`added ${values.quantity} item(s) ${product.name} to cart`
        live:true,
      })
      // router.push('/business/products');
    } catch (error) {
      console.error("Request failed:", error);
    }
  }
  
  return (
    <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Image gallery */}
        <TabGroup className="flex flex-col gap-4">
          <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList className="grid grid-cols-4 gap-6">
              {selectedColor.media.map((media: any) => (
                <Tab key={media.id} className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white hover:bg-gray-50">
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img alt="" src={media.url} className="h-full w-full object-cover" />
                  </span>
                  <span aria-hidden="true" className="absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500" />
                </Tab>
              ))}
            </TabList>
          </div>

          <TabPanels>
            {selectedColor.media.map((media: any) => (
              <TabPanel key={media.id}>
                <img alt="" src={media.url} className="aspect-square w-full object-cover sm:rounded-lg" />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>

        {/* Product info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

          <div className="mt-3">
            <p className="text-3xl tracking-tight text-gray-900">
              K{discountedPrice}
              {product.discount > 0 && (
                <span className="ml-2 text-sm line-through text-gray-400">K{product.price}</span>
              )}
            </p>
          </div>

          <div className="mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                      'h-5 w-5'
                    )}
                  />
                ))}
              </div>
              {product.rating === 0 && (
                <p className="ml-2 text-sm text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-6 text-base text-gray-700">
            {product.description}
          </div>
          <Formik
            initialValues={{
              productId: product.id || 1,
              productImageId: product.images[0].id || 1,
              sizeId: 1,
              quantity: 1,
            }}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
              <form className="mt-6" onSubmit={handleSubmit} >
                <div>
                  <h3 className="text-sm text-gray-600">Color</h3>
                  <RadioGroup value={selectedColor}
                    onChange={(color) => { setSelectedColor(color); setFieldValue('productImageId', color.id); setSelectedSize(null); }}
                    className="mt-2 flex items-center gap-x-3">
                    {product.images.map((color: any) => (
                      <RadioGroup.Option
                        key={color.id}
                        value={color}
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-checked:ring-2 data-checked:ring-indigo-500"
                      >
                        <span
                          aria-hidden="true"
                          style={{ backgroundImage: `url(${color.media[0].url})` }}
                          className="w-18 h-18 rounded-full border border-black/10 bg-cover bg-center"
                        />
                        {getColorCount(color.id) > 0 && (
                          <span className="absolute -top-1 -right-1 rounded-full bg-indigo-600 text-white text-xs px-2">
                            {getColorCount(color.id)}
                          </span>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </RadioGroup>
                </div>

                {errors.productImageId && (
                  <p className="text-red-500 text-sm">{errors.productImageId}</p>
                )}

                {selectedColor && selectedColor.stock.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm text-gray-600">Size</h3>
                    <RadioGroup value={selectedSize}
                      onChange={(stockObj) => { setSelectedSize(stockObj); setFieldValue('sizeId', stockObj.size.id); }}
                      // onChange={(size) => {  setFieldValue('productImageId', color.id); setSelectedSize(size); }}
                      className="mt-2 grid grid-cols-3 gap-3">
                      {selectedColor.stock.map((stockObj: any) => (
                        <RadioGroup.Option
                          key={stockObj.size.id}
                          value={stockObj}
                          className="relative flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none data-checked:ring-2 data-checked:ring-indigo-500"
                        >
                          <div className="text-center">
                            <div>{stockObj.size.size}</div>
                            <div className="text-xs text-gray-500">{stockObj.size.range}</div>
                            <div className="text-xs text-gray-400">{stockObj.stock} left</div>
                          </div>
                        </RadioGroup.Option>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {errors.sizeId && (
                  <p className="text-red-500 text-sm">{errors.sizeId}</p>
                )}


                <div className='mt-4'>Quantity</div>
                <div className='mt-3 flex flex-row gap-2'>
                  <button type='button' onClick={() => setFieldValue('quantity', parseInt(values.quantity) - 1)} className='cursor-pointer rounded-sm bg-white p-5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </button>
                  <input
                    id="stock"
                    name="quantity"
                    value={values.quantity}
                    type="text"
                    placeholder="quantity"
                    aria-label="quantity"
                    className="block w-fit rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <button type='button' onClick={() => setFieldValue('quantity', parseInt(values.quantity) + 1)} className='cursor-pointer rounded-sm bg-white p-5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
                {errors.quantity && (
                  <p className="text-red-500 text-sm">{errors.quantity}</p>
                )}

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    disabled={!selectedSize}
                    className={classNames(
                      outOfStock || !selectedSize ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700',
                      'flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full'
                    )}>
                    {outOfStock || !selectedSize ? 'Out of Stock' : 'Add to Bag'}
                  </button>
                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon className="h-6 w-6" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>
            )}
          </Formik>

        </div>
      </div>
    </main>
  );
}






