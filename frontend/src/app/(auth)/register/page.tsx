"use client";
import React, { useCallback, useState } from "react";
import { FirebaseError } from "@firebase/app";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { RegisterForm } from "@/models/forms/RegisterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";

const Register = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        reset
    } = useForm<RegisterForm>({
        defaultValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: ""
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async (formData: RegisterForm) => {
        try {
            setLoading(true);
            const firebaseAuth = getAuth();
            const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, formData.email, formData.password);
            await sendEmailVerification(userCredentials.user);

            toast(`An account verification link has been sent to your email`, {
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
                    onClick: () => console.log("Undo")
                }
            });

            reset();
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error.code);
                if (error.code === "auth/invalid-email") {
                    setError("email", { message: "Invalid email" });
                } else if (error.code === "auth/email-already-in-use") {
                    setError("email", { message: "Email is already in use" });
                }
            }
        } finally {
            setLoading(false);
        }
    }, [reset]);

    return (
        <form className="flex flex-col gap-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                    <Label htmlFor="firstname" className={cn({ "text-destructive": errors.firstname })}>
                        First Name
                    </Label>
                    <Input
                        id="firstname"
                        className={cn("border mt-1", {
                            "border-border": !errors.firstname,
                            "border-destructive": errors.firstname
                        })}
                        type="text"
                        {...register("firstname", { required: "First name is required." })}
                    />
                    {errors.firstname && (
                        <span className="text-xs text-destructive">{errors.firstname.message}</span>
                    )}
                </div>
                <div className="md:w-1/2">
                    <Label htmlFor="lastname" className={cn({ "text-destructive": errors.lastname })}>Last
                        Name</Label>
                    <Input
                        id="lastname"
                        className={cn("border mt-1", {
                            "border-border": !errors.lastname,
                            "border-destructive": errors.lastname
                        })}
                        type="text"
                        {...register("lastname", { required: "First name is required." })}
                    />
                    {errors.lastname && (
                        <span className="text-xs text-destructive">{errors.lastname.message}</span>
                    )}
                </div>
            </div>
            <div>
                <Label htmlFor="email" className={cn({ "text-destructive": errors.email })}>Email</Label>
                <Input
                    id="email"
                    className={cn("border mt-1", {
                        "border-border": !errors.email,
                        "border-destructive": errors.email
                    })}
                    type="text"
                    {...register("email", { required: "Email is required." })} />
                {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                )}
            </div>
            <div>
                <Label htmlFor="password" className={cn({ "text-destructive": errors.password })}>Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        className={cn("border mt-1", {
                            "border-border": !errors.password,
                            "border-destructive": errors.password
                        })}
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: "Password is required.",
                            minLength: { value: 6, message: "Password must be at least 6 characters long" }
                        })} />
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
            <Button variant="default" type="submit" className="w-full md:w-28 mx-auto" disabled={loading}>
                {loading && <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />}
                Register
            </Button>
            <p className="text-xs">
                Already have an account? {" "}
                <Link href={"/login"} className="underline">Login</Link>
            </p>
        </form>
    );
};

export default Register;
