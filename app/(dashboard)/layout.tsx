import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import '../styles/globals.css'
import { Sidebar } from "@/components/sidebar/Sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "menu dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div className={`flex w-full h-screen justify-center`}>
     
      <div className={`hidden 
        md:w-64 md:block 
        `}>
        <Sidebar />
      </div>

      <div className={` w-full h-screen flex justify-center items-center  p-4 `}>
        {children}
      </div>
    </div>

  );
}
