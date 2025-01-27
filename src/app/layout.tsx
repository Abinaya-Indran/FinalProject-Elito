// src/app/layout.tsx
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/global.css";

export const metadata = {
  title: "Elito",
  description: "An online platform for buying and selling cakes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  );
}
