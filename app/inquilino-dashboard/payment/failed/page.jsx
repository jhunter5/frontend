"use client"

import { PaymentStatus } from "../payment-status"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef, Suspense } from 'react'

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const contractId = searchParams.get('contractId')
  const preferenceId = searchParams.get('preference_id')
  const [contractAmount, setContractAmount] = useState(0)
  const hasFetched = useRef(false);


  const handleRetry = () => {
    // Implement retry payment logic here
    console.log("Retrying payment...")
  }

  const fetchContract = async (id) => {
    const contract = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/contracts/${id}`)

    if (!contract.ok) {
        throw new Error("Error fetching contract")
    }

    return contract.json()
  }

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchContractUseEffect = async () => {
        if (!contractId) return;

        try {
            const contract = await fetchContract(contractId);
            setContractAmount(contract.monthlyRent);
        } catch (error) {
            console.error("Error en la carga del contrato:", error);
        }
    };

    fetchContractUseEffect();
}, [contractId]);  



  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <PaymentStatus
        status="failed"
        amount={contractAmount}
        paymentId={preferenceId}
        date={new Date().toLocaleDateString()}
        onRetry={handleRetry}
      />
    </div>
  )
}

