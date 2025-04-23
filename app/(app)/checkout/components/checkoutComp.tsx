'use client'

import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { TrashIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { deletePublicCart, fetchPublicCart } from '@/store/actions/cartActions'
import { RootState } from '@/store'
import { useAppContext } from '@/context/AppProvider'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentComp from './PaymentComp'
import LoadingComp from '@/components/app/LoadingComp'

const stripePromise = loadStripe(process.env.NEXT_STRIPE_PUB_KEY as string)


const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]

const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

const validationSchema = Yup.object({
  customerId: Yup.string().required('Product name is required'),
  email: Yup.string().required('email is required'),
  firstName: Yup.string().required('first name is required'),
  lastName: Yup.string().required('last name is required'),
  address: Yup.string().required('address is required'),
  company: Yup.string().required('company is required'),
  city: Yup.string().required('city is required'),
  country: Yup.string().required('country is required'),
  province: Yup.string().required('province is required'),
  postalAdd: Yup.string().required('postal address is required'),
  phone: Yup.string().required('phone is required'),
  shipping: Yup.number().positive('shipping fee must be a positive number'),
  tax: Yup.number().positive('tax must be a positive number'),
  total: Yup.number().positive('total must be a positive number'),
  cartItems: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required("Please select product quantity"),
    })
  ),
});




export default function CheckOutComp() {
  const { cartDrawerOpen, toggleCartDrawer, appAlert, setAppAlert } = useAppContext();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])

  const dispatch = useDispatch();
  const router = useRouter();



  const cart = useSelector((state: RootState) => state.cart.cart);

  const user = useSelector((state: RootState) => state.user.account)
  const tax = useSelector((state: RootState) => state.cart.tax)
  const total = useSelector((state: RootState) => state.cart.total)
  const shipping = useSelector((state: RootState) => state.cart.shipping)

  // if(!cart || !tax || !total || !shipping) return <LoadingComp />

  useEffect(() => {
    fetchPublicCart()
  }, [dispatch, appAlert])

  const initialValues = {
    customerId: user.id,
    email: user.email || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    address: '',
    company: '',
    city: '',
    country: 'Zambia',
    province: '',
    postalAdd: '',
    phone: user.phoneNumber || '',
    shipping: shipping || 0,
    tax: (tax / 100) * total || 0,
    total: total,
    cartItems: cart?.items?.map((item) => ({
      id: item.id,
    })) || [],
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const res = await fetch("/api/public/order", {
                method: "POST",
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
              console.log("Order Created:", data.product);
              // clear cart items 
              router.push('/checkout/order-history');
            } catch (error) {
              console.error("Request failed:", error);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (

            <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                  <div className="mt-4">
                    <label htmlFor="email-address" className="block text-sm/6 font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email-address"
                        name='email'
                        value={values.email}
                        errors={errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          id="first-name"
                          name='firstNmae'
                          value={values.firstName}
                          errors={errors.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          autoComplete="given-name"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-700">
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          id="last-name"
                          name='lastName'
                          value={values.lastName}
                          errors={errors.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          autoComplete="family-name"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="company" className="block text-sm/6 font-medium text-gray-700">
                        Company
                      </label>
                      <div className="mt-2">
                        <input
                          id="company"
                          name='company'
                          value={values.company}
                          errors={errors.company}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm/6 font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="address"
                          name='address'
                          value={values.address}
                          errors={errors.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm/6 font-medium text-gray-700">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name='city'
                          value={values.city}
                          errors={errors.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm/6 font-medium text-gray-700">
                        Country
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>Zambia</option>

                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="region" className="block text-sm/6 font-medium text-gray-700">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="region"
                          name='province'
                          value={values.province}
                          errors={errors.province}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-700">
                        Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postal-code"
                          name='postalAdd'
                          value={values.postalAdd}
                          errors={errors.postalAdd}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          autoComplete="postal-code"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-700">
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          name='phone'
                          value={values.phone}
                          errors={errors.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          autoComplete="tel"
                          className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>





                {/* Payment */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      mode: "payment",
                      amount: total,
                      currency: 'ZMW',
                    }}>
                      <PaymentComp total={900} /> 
                  </Elements>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cart?.items?.map((item) => (
                      <li key={item.id} className="flex px-4 py-6 sm:px-6">
                        <div className="shrink-0">
                          <img alt={item?.product?.imageUrl} src={item?.product?.imageUrl} className="w-20 rounded-md" />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-lg capitalize">
                                {item?.product?.name}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">size: {item?.size}</p>
                            </div>

                            <div className="ml-4 flow-root shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  dispatch(deletePublicCart(item?.id));
                                  setAppAlert({
                                    live: true,
                                    status: 'success',
                                    title: 'Remove an Item from cart',
                                    msg: 'removed with success 1 item from cart, This item can not be retrieved from the server.'
                                  })
                                }
                                }
                                className="-m-2.5 cursor-pointer flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon aria-hidden="true" className="size-5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">ZMW {item?.product?.price} * {item?.quantity} </p>

                            <div className="ml-4  text-pink-500">
                              <p>ZMW {item?.product?.price * item?.quantity}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">K{total}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">K{shipping}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">K{(tax / 100) * total}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-bold text-pink-500 text-bold ">K{total + shipping + ((tax / 100) * total)}</dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <button disabled={isSubmitting}
                      type="submit"
                      className="w-full flex flex-row justify-center gap-3 rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
                    >
                      <span>
                        Confirm order
                      </span>
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
                    </button>
                  </div>
                </div>
              </div>
            </form>

          )}
        </Formik>

      </div>
    </div>
  )
}
