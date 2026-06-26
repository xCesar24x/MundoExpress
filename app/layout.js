import "./globals.css";

export const metadata = {
  title: "Mundo Express | Logística y Transporte",
  description: "Servicios de logística, transporte y envíos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
