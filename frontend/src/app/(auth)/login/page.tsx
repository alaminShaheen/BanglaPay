"use client";

import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import React, { Fragment, useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/models/forms/LoginForm";
import { FirebaseError } from "@firebase/app";


const Register = () => {
    const { register, formState: { errors }, handleSubmit, setError, reset } = useForm<LoginForm>();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async (formData: LoginForm) => {
        try {
            setLoading(true);

            const firebaseAuth = getAuth();
            const userCredentials = await signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password);

            if (!userCredentials.user.emailVerified) {
                toast.error(`Email has not been verified`, {
                    richColors: true,
                    description: `${new Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date())} at ${new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    }).format(new Date())}`,
                    action: {
                        label: "Close",
                        onClick: () => console.log("Close")
                    }
                });
                reset({ email: "", password: "" });
                return;
            }
            // const token = userCredentials.user.getIdToken();
            // TODO: Set authorization headers with the JWT token
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error.code);
                if (error.code === "auth/invalid-email") {
                    setError("email", { message: "Invalid email" });
                } else if (error.code === "auth/invalid-credential") {
                    console.log("hello");
                    toast.error(`Invalid credentials entered`, {
                        richColors: true,
                        description: `${new Intl.DateTimeFormat("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }).format(new Date())} at ${new Intl.DateTimeFormat("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                        }).format(new Date())}`,
                        action: {
                            label: "Close",
                            onClick: () => console.log("Close")
                        }
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    }, [reset]);

    const loginWithGoogle = useCallback(async () => {
        try {
            const firebaseAuth = getAuth();
            const provider = new GoogleAuthProvider();
            const userCredentials = await signInWithPopup(firebaseAuth, provider);
            console.log(userCredentials);
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error.code);
            }
            console.log(error);
        }
    }, []);

    const loginWithFacebook = useCallback(async () => {
        try {
            const firebaseAuth = getAuth();
            const provider = new FacebookAuthProvider();
            const userCredentials = await signInWithPopup(firebaseAuth, provider);
            console.log(userCredentials);
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error.code);
            }
            console.log(error);
        }
    }, []);

    return (
        <Fragment>

            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="email" className={cn({ "text-destructive": errors.email })}>Email</Label>
                    <Input
                        className={cn("border mt-1", {
                            "border-border": !errors.email,
                            "border-destructive": errors.email
                        })}
                        id="email"
                        type="email"
                        {...register("email", { required: "Email is required." })} />
                    {errors.email && (
                        <span className="text-xs text-destructive">{errors.email.message}</span>
                    )}
                </div>
                <div>
                    <div className="flex justify-between">
                        <Label htmlFor="password"
                               className={cn({ "text-destructive": errors.password })}>Password</Label>
                        <Link href="/passwordReset" className="underline text-xs">Forgot password?</Link>
                    </div>
                    <div className="relative mt-1">
                        <Input
                            id="password"
                            className={cn("border", {
                                "border-border": !errors.password,
                                "border-destructive": errors.password
                            })}
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required." })} />
                        {
                            showPassword ?
                                <EyeOff
                                    className="absolute right-2 cursor-pointer top-1/2 transform -translate-y-1/2"
                                    size={16}
                                    onClick={() => setShowPassword(false)}
                                /> :
                                <Eye
                                    className="absolute right-2 cursor-pointer top-1/2 transform -translate-y-1/2"
                                    size={16}
                                    onClick={() => setShowPassword(true)}
                                />
                        }
                    </div>
                    {errors.password && (
                        <span className="text-xs text-destructive">{errors.password.message}</span>
                    )}
                </div>
                <Button variant="default" type="submit" className="w-full md:w-1/3 mx-auto">
                    {loading && <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                </Button>

                <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-xs">Or login with</span>
                    <div className="flex-grow border-t border-border"></div>
                </div>

            </form>

            <div className="flex gap-4">
                <Button variant="outline" className="mb-4 w-full" onClick={loginWithGoogle}>
                    <FcGoogle /> {" "} Google
                </Button>

                <Button variant="outline" className="mb-4 w-full" onClick={loginWithFacebook}>
                    <BsFacebook className="text-[#0765FF]" /> {" "} Facebook
                </Button>
            </div>

            <p className="text-xs">
                Don't have an account? {" "}
                <Link href="/register" className="underline">Register</Link>
            </p>
        </Fragment>
    );
};

export default Register;
