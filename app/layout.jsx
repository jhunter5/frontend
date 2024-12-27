import "./globals.css";

export const metadata = {
  title: "Limitless Holdings",
  description: "Gestiona tus propiedades y contratos con facilidad, automatiza los cobros y mantenimientos, y toma decision"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}