import "./globals.css";
import Preloader from "./components/Preloader";

export const metadata = {
  title: "Mundo Express | Logística y Transporte",
  description: "Servicios de logística, transporte y envíos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
