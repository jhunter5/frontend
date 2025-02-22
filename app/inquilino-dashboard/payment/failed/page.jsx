"use client"

import { PaymentStatus } from "../payment-status"

export default function PaymentFailedPage() {
  const handleRetry = () => {
    // Implement retry payment logic here
    console.log("Retrying payment...")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <PaymentStatus
        status="failed"
        amount={1500}
        paymentId="PAY-123456789"
        date="22 Feb, 2025"
        paymentMethod="Tarjeta de crédito ****4242"
        onRetry={handleRetry}
      />
    </div>
  )
}

