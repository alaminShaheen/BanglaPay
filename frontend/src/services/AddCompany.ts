import { AxiosResponse } from "axios";

import { Company } from "@/models/Company";
import axiosInstance from "@/lib/axiosInstance";
import { AddCompanyRequest } from "@/models/services/AddCompanyRequest";

export function addCompany(formData: AddCompanyRequest) {
    return axiosInstance.post<{}, AxiosResponse<Company>>("/company/add", formData);
}