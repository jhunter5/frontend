'use client';

import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return (
        <nav className="bg-primary-500 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold"><img src="https://i.ibb.co/tbsXY21/Logo-Blanco.png" alt="Logo" className="h-8 w-full"/></div>
                    <div className="hidden md:flex space-x-8">
                    <Link href="/" className="hover:text-gray-200">Home</Link>
                    <Link href="/about-us" className="hover:text-gray-200">About Us</Link>
                    <Link href="/contact-us" className="hover:text-gray-200">Contact Us</Link>
                    {!isAuthenticated && (
                        <button onClick={() => loginWithRedirect()} className="hover:text-gray-200">
                            Login
                        </button>
                    )}
                    {isAuthenticated && (
                        <button onClick={() => logout({
                            logoutParams: {
                              returnTo: process.env.NODE_ENV === 'development'
                              ? 'http://localhost:3000/'
                              : 'https://frontend-mocha-seven-79.vercel.app/',
                            }
                          })} className="hover:text-gray-200">
                            Logout
                        </button>
                    )}
                    </div>
            </div>
        </nav>
    );
}