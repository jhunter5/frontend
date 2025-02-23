'use client'

import { PaymentStatus } from "../payment-status"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef, Suspense } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { getAuth0Id } from "@/app/utils/getAuth0id"

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const paymentId = searchParams.get('payment_id')
    const contractId = searchParams.get('contractId')
    const [contractAmount, setContractAmount] = useState(0)
    const { user } = useAuth0()
    const hasFetched = useRef(false);

    const createPayment = async (payment_id, contract_id) => {
        const tenantAuthID = getAuth0Id(user?.sub)
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
        if (hasFetched.current) return;
        hasFetched.current = true;
    
        const fetchAndCreatePayment = async () => {
            if (!contractId || !paymentId) return;
    
            try {
                const contract = await fetchContract(contractId);
                setContractAmount(contract.monthlyRent);
                const payment = await createPayment(paymentId, contractId);
            } catch (error) {
                console.error("Error en la carga del contrato o creación de pago:", error);
            }
        };
    
        fetchAndCreatePayment();
    }, [contractId, paymentId]);  
    

    return (
        <Suspense>
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                <PaymentStatus
                    status="success"
                    amount={contractAmount}
                    paymentId={paymentId}
                    date={new Date().toLocaleDateString()}
                />
            </div>
        </Suspense>
    )
}

