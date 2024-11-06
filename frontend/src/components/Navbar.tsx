"use client";

import React, { Fragment, useCallback } from "react";
import { useTheme } from "next-themes";
import { CircleUserRound, KeySquare, LogOut, Menu, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/Routes";
import { useErrorHandler } from "@/hooks/useErrorHandler";

const Navbar = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const { authenticated } = useAuthContext();
    const router = useRouter();
    const {handleErrors} = useErrorHandler();


    const onThemeChange = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme]);

    const onLogout = useCallback(async () => {
        try {
            await signOut(auth);
            router.push(ROUTES.LOGIN);
        } catch (error) {
            handleErrors(error);
        }
    }, [signOut, handleErrors]);

    return (
        <nav className="p-6 flex justify-between items-center bg-background">
            <div>
                <h1 className="text-2xl font-bold md:block hidden">
                    🅱🅰🅽🅶🅻🅰🅿🅰🆈
                </h1>
                <h1 className="text-2xl font-bold  md:hidden block">
                    🅱🅿
                </h1>
            </div>
            <div className="flex items-center gap-x-1 md:gap-x-4">
                <Button variant="ghost" size="icon" onClick={onThemeChange}
                        title={resolvedTheme === "dark" ? "Toggle dark mode" : "Toggle light mode"}>
                    {resolvedTheme === "dark" ? <Sun /> : <Moon />}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="block md:hidden">
                        <Button variant="ghost" size="icon" className="flex justify-center items-center" title="Menu">
                            <Menu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                {authenticated ? (
                                    <Link href={"/account"} className="flex items-center gap-2" title="Account">
                                        <CircleUserRound size="14" />
                                        Account
                                    </Link>

                                ) : (
                                    <Link href="/login" className="flex items-center gap-2" title="Login">
                                        <KeySquare size="14" />
                                        Login
                                    </Link>
                                )}
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        {
                            authenticated && (
                                <Fragment>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer">
                                        Logout
                                    </DropdownMenuItem>
                                </Fragment>
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="hidden md:flex items-center gap-x-4">
                    <Link href={authenticated ? "/account" : "/login"}>
                        <Button variant="ghost">
                            <KeySquare />
                            {authenticated ? "Account" : "Login"}
                        </Button>
                    </Link>
                    {/*  TODO: Move to "Account" page  */}
                    {
                        authenticated &&
                        <Button variant="destructive" onClick={onLogout} title="Logout">
                            <LogOut />
                            Logout
                        </Button>
                    }
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
