
import localFont from "next/font/local";
import { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthContextProvider } from "@/contexts/AuthContext";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900"
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900"
});

export const metadata: Metadata = {
    title: "BanglaPay",
    description: "Generated by create next app"
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout(props: RootLayoutProps) {
    const { children } = props;
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthContextProvider>
                <Navbar />
                <div className="bg-gray-100 dark:bg-zinc-900 h-full flex-1">
                    {children}
                </div>
                <Toaster />
            </AuthContextProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
