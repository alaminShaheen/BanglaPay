import { AxiosResponse } from "axios";

import axiosInstance from "@/lib/axiosInstance";
import { FormOptionsResponse } from "@/models/services/FormOptionsResponse";

export function getFormOptions() {
    return axiosInstance.get<{}, AxiosResponse<FormOptionsResponse>>("/compensation/form-options");
}