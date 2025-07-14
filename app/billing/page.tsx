// app/billing/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function BillingPage() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id })
      })
      const { sessionId } = await response.json()
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Charge your credits</h1> 
      <div className="space-y-4">
        <div className="p-6 border rounded-lg">
          <p className="text-gray-600 mb-4">Basic Package</p>
          <p className="text-3xl font-bold mb-4">$40</p>
          <ul className="space-y-2 mb-6">
            <li>+10 credits</li>
            <li>Conversion up to 30 minutes of audio</li>
            <li>Support for major formats</li>
          </ul>
          <Button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full"
          >
          
            {loading ? 'Processing...' : 'Pay'}
          </Button>
        </div>
      </div>
    </div>
  )
}