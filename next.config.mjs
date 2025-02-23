/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com'], // Agrega el dominio aquí
      },
    eslint: {
        ignoreDuringBuilds: true, // Desactiva ESLint en el build
      },
    experimental: {
        missingSuspenseWithCSRBailout: false, // Configuración experimental
      },
};

export default nextConfig;
