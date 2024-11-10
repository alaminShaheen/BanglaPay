import localFont from "next/font/local";
import { ReactNode } from "react";

import "./globals.css";
import ProviderWrapper from "@/app/ProviderWrapper";
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
    description: "Get payed, not played"
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout(props: RootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}>
        <ProviderWrapper>
            {children}
        </ProviderWrapper>
        </body>
        </html>
    );
}
