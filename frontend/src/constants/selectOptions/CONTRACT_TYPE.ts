import { SelectOption } from "@/models/SelectOption";
import { ContractType } from "@/models/enums/ContractType";

export const CONTRACT_TYPE: SelectOption<ContractType>[] = [
    { value: ContractType.FULL_TIME, label: "Full Time" },
    { value: ContractType.CONTRACTUAL, label: "Contractual" },
    { value: ContractType.FREELANCE, label: "Freelance" },
    { value: ContractType.PART_TIME, label: "Part time" },
    { value: ContractType.OTHER, label: "Other" }
];