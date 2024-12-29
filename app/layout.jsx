'use client'; // Marca el archivo como un componente cliente
import "./globals.css";
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';

// export const metadata = {
//   title: "Limitless Holdings",
//   description: "Gestiona tus propiedades y contratos con facilidad, automatiza los cobros y mantenimientos, y toma decision"
// };

export default function RootLayout({ children }) {
  
  return (
    <Auth0Provider
      domain="dev-p3hv1ufn7l6q5x5j.us.auth0.com"
      clientId="VfTOaqE3myUEXYQfqkFae1OFfhXJ31ro"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/valida-rol"
      }}
    >
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </Auth0Provider>
  );
}