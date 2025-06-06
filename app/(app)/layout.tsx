import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import StoreProvider from "@/context/StoreProvider";
import NavBarComp from "@/components/app/Navbar";
import FooterComp from "@/components/app/footer";
import TopNaveComp from "@/components/app/TopNav";
import AlertActionComp from "@/components/app/Alert";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AlertActionComp />
      <TopNaveComp />

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <NavBarComp />
        {children}
      </div>

      <FooterComp />

    </>
  );
}
