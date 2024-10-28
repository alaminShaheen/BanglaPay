import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/models/services/LoginResponse";

export function googleLogin() {
    return axiosInstance.post<{}, AxiosResponse<LoginResponse>>("/auth/google/login");
}