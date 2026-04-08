import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/ui/side-bar";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Honkai Star Rail - Database",
  description: "Database for Honkai Star Rail",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lato.variable}} h-full antialiased`}>
      <body className="min-h-full flex flex-row">
      <SideBar />
        <div className={"w-full h-screen flex flex-col bg-[url(https://preview.redd.it/aha-instant-evanescia-v0-7o6tdntracog1.png?auto=webp&s=6ba505b114ee1338c84af89dae42d88cb5934c5e)] bg-cover bg-center"}>
          <div className="flex flex-col bg-gray-600/90 h-screen backdrop-blur-[2px] overflow-y-scroll">
            <div className={"flex-1 py-8 text-white w-6xl m-auto"}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
