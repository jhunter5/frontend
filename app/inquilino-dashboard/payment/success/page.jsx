'use client'

import { PaymentStatus } from "../payment-status"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const paymentId = searchParams.get('payment_id')
    const contractId = searchParams.get('contractId')
    const [contractAmount, setContractAmount] = useState(0)
    const { user } = useAuth0()

    const createPayment = async (payment_id, contract_id) => {
        const tenantAuthID = user?.sub
        const response = await fetch("http://localhost:3001/api/payment", {
            method: "POST",
            body: JSON.stringify({ payment_id, contract_id, tenantAuthID }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Error creating payment")
        }

        return response.json()
    }

    const fetchContract = async (id) => {
        const contract = await fetch(`https://back-prisma-git-mercadopago-edr668s-projects.vercel.app/api/contracts/${id}`)

        if (!contract.ok) {
            throw new Error("Error fetching contract")
        }

        return contract.json()
    }

    useEffect(() => {
        const contract = fetchContract(contractId)
        setContractAmount(contract.monthlyRent)
        createPayment(paymentId, contractId)
    }, [])


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <PaymentStatus
                status="success"
                amount={contractAmount}
                paymentId={paymentId}
                date={new Date().toLocaleDateString()}
            />
        </div>
    )
}

