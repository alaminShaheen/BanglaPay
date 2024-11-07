import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { Compensation } from "@/models/Compensation";

export function getCompensations() {
    return axiosInstance.get<{}, AxiosResponse<Compensation[]>>("/compensation");
}