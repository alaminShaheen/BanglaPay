"use client"

import React, { ReactNode } from "react";

type AuthLayoutProps = Readonly<{ children: ReactNode }>;

const AuthLayout = (props: AuthLayoutProps) => {
    const { children } = props;

    return (
        <div className="mx-auto w-full md:w-2/3 px-4 py-20">
            <div className="mb-14">
                <h1 className="text-center text-xl md:text-2xl font-bold">
                    Know Your Worth—From Real Sources.
                </h1>
                <p className="text-center mt-4 text-sm md:text-base">
                    Post anonymously, explore confidently. Gain access to the latest salary trends from people just like
                    you.
                </p>
            </div>
            <div className="max-w-lg mx-auto border border-border rounded-md p-4 bg-background">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
