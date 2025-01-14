'use client'; 
import "./globals.css";
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
const queryClient = new QueryClient();
const callbackUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/set-usuario' 
  : 'https://frontend-mocha-seven-79.vercel.app/set-usuario';

export default function RootLayout({ children }) {
  
  return (
    <Auth0Provider
      domain="dev-p3hv1ufn7l6q5x5j.us.auth0.com"
      clientId="VfTOaqE3myUEXYQfqkFae1OFfhXJ31ro"
      authorizationParams={{
        redirect_uri: callbackUrl
      }}
    >
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body>
            {children}
            <Toaster />
          </body>
        </html>
      </QueryClientProvider>
    </Auth0Provider>
  );
}