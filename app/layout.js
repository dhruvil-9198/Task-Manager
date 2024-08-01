import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { UserProvider } from '@auth0/nextjs-auth0/client';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager",
  description: "Manage all your tasks at one place",
  icons:{
    icon:['/download.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={`bg-black ${inter.className}`}>
        <Navbar />
        <div className="text-white">
          {children}
        </div>
      </body>
      </UserProvider>
    </html>
  );
}
