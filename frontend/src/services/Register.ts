import { RegisterForm } from "@/models/forms/RegisterForm";
import axiosInstance from "@/lib/axiosInstance";

export function register(formData: RegisterForm) {
    return axiosInstance.post("/auth/register", formData);
}