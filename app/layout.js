import "./globals.css";
import Preloader from "./components/Preloader";
import FeedbackButton from "./components/FeedbackButton";

export const metadata = {
  title: "Mundo Express | Logística y Transporte",
  description: "Servicios de logística, transporte y envíos.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Preloader />
        {children}
        <FeedbackButton />
      </body>
    </html>
  );
}
