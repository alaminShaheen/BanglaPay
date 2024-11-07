import { Compensation } from "@/models/Compensation";

export type AddCompensationRequestDto = Omit<Compensation, "id">;