import { PaymentStatus } from "../payment-status"

export default function PaymentPendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <PaymentStatus
        status="pending"
        amount={1500}
        paymentId="PAY-123456789"
        date="22 Feb, 2025"
        paymentMethod="Transferencia bancaria"
      />
    </div>
  )
}

