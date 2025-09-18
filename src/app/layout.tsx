import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { Toaster } from "../components/ui/sonner"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import { title } from "process";
import Navbar from "./_component/Navbar/Navbar";
import Footer from "./_component/Footer/Footer";
import CounterProvider from './CounterProvider'
import UserProvider from "./UserProvider";
import { store } from "image/Redux/store";
import ClientProvidet from "./ClientProvidet";
 const Encode_Sans_Font=Encode_Sans({
  subsets:["latin"]
 })

export const metadata={
  title:"E-commarce App",
  authors:[
    {
      name:"Fatma Mourad"
    }
  ]
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${Encode_Sans_Font.className} {
          constructor(parameters) {
            
          }
        }}  antialiased`}
      >
       <ClientProvidet>
        <UserProvider>
         <CounterProvider>
          <Navbar/>
          <main className="min-h-screen">
           {children}
           </main>
            <Toaster />
      
         </CounterProvider>
        
        </UserProvider>
        </ClientProvidet>
        <Footer/>
      </body>
    </html>
  );
}
