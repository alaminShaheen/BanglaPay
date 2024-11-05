"use client"

import React, { ReactNode } from "react";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type ProviderWrapperProps = {
    children: ReactNode
}

const ProviderWrapper = (props: ProviderWrapperProps) => {
    const {children} = props;
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <div className="bg-gray-100 dark:bg-zinc-900 flex-1">
                        {children}
                    </div>
                    <Toaster />
                </ThemeProvider>
            </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
};

export default ProviderWrapper;
