'use client'
import convertToSubCurrency from '@/lib/convertToSubCurrency';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

export default function PaymentComp({ total }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("teast");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/public/payment', {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json"
      },
      body: JSON.stringify({ amount: convertToSubCurrency(total) }),
    }).then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))

  }, [total])

  return (
    <div >
      {/* {clientSecret && <PaymentElement />} */}
      <PaymentElement />
    </div>
  )
}