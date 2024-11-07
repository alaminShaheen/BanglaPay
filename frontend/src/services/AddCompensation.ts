import { AxiosResponse } from "axios";

import axiosInstance from "@/lib/axiosInstance";
import { Compensation } from "@/models/Compensation";
import { CompensationForm } from "@/models/forms/CompensationForm";

export function addCompensation(formData: CompensationForm) {
    return axiosInstance.post<{}, AxiosResponse<Compensation>>("/compensation/add", formData);
}