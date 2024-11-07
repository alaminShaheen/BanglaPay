"use client"

import { JSX } from "react/jsx-runtime";
import { toast } from "sonner";
import React, { ComponentType } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/Routes";
import { useAuthContext } from "@/contexts/AuthContext";
import { toastDateFormat } from "@/lib/utils";
import IntrinsicAttributes = JSX.IntrinsicAttributes;
import { RefreshCcw } from "lucide-react";

export function Protected<T extends IntrinsicAttributes>(Page: ComponentType<T>): ComponentType<T> {
    const PageWithAuth = (props: T) => {
        const { authenticated, appLoading } = useAuthContext();
        const router = useRouter();

        useEffect(() => {
            if (!authenticated && !appLoading) {
                toast.error("Login to view this page", {
                    richColors: true,
                    description: toastDateFormat(new Date()),
                    action: {
                        label: "Go to Login",
                        onClick: () => router.push(ROUTES.LOGIN),
                    }
                });
                router.push(ROUTES.LOGIN);
            }
        }, [authenticated, router, appLoading]);

        if (appLoading) return <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />

        if (!authenticated) return null;

        // Render the wrapped component with its props
        return <Page {...props} />;
    };

    PageWithAuth.displayName = `withAuth(${
        Page.displayName || Page.name || "Component"
    })`;

    return PageWithAuth;
}