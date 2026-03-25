import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css'
import StoreProvider from "./StoreProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MonitorApp",
  description: "Monitoreo de residenciales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-screen">
          <StoreProvider >
          {children}
          </StoreProvider>
        </div>
      </body >
    </html >
  );
}
