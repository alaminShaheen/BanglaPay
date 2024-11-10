import localFont from "next/font/local";
import { ReactNode } from "react";

import "./globals.css";
import ProviderWrapper from "@/app/ProviderWrapper";
import { Metadata } from "next";
import Head from "next/head";

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
    description: "Get payed, not played",
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout(props: RootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en">
        <Head>
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}>
        <ProviderWrapper>
            {children}
        </ProviderWrapper>
        </body>
        </html>
    );
}
