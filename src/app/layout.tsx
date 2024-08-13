import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "./context/SessionAuthProvider";
// import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PUB Nayarit",
  description: "Pub del estado de Nayarit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <SessionAuthProvider>
            {children}
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}