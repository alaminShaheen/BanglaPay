"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { RefreshCcw } from "lucide-react";
import React, { useCallback, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FirebaseError } from "@firebase/app";
import { PasswordResetForm } from "@/models/forms/PasswordResetForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PasswordReset = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError
    } = useForm<PasswordResetForm>({
        defaultValues: { email: "" }
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = useCallback(async (formData: PasswordResetForm) => {
        try {
            setLoading(true);
            const firebaseAuth = getAuth();
            await sendPasswordResetEmail(firebaseAuth, formData.email);

            toast.success(`A password reset link has been sent to your email`, {
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
                    onClick: () => console.log("Undo")
                }
            });
            router.push("/login");
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error.code);
                if (error.code === "auth/invalid-email") {
                    setError("email", { message: "Invalid email" });
                }
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor="email" className={cn({ "text-destructive": errors.email })}>Email</Label>
                <Input
                    className={cn("border mt-1", {
                        "border-border": !errors.email,
                        "border-destructive": errors.email
                    })}
                    type="text"
                    id="email"
                    {...register("email", { required: "Email is required." })} />
                {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                )}
            </div>
            <Button variant="default" type="submit" className="w-full md:w-1/3 mx-auto">
                {loading && <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
            </Button>
            <p className="text-xs">
                Have an account? {" "}
                <Link href={"/login"} className="underline">Login</Link>
            </p>
        </form>
    );
};

export default PasswordReset;
