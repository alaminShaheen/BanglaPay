import { AxiosResponse } from "axios";

import { Company } from "@/models/Company";
import axiosInstance from "@/lib/axiosInstance";
import { AddCompanyRequest } from "@/models/services/AddCompanyRequest";

export function getCompanies() {
    return axiosInstance.get<{}, AxiosResponse<Company[]>>("/company");
}