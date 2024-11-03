import { GroupedSelectOption, SelectOption } from "@/models/SelectOption";
import { ContractType } from "@/models/enums/ContractType";
import { HighestEducation } from "@/models/enums/HighestEducation";
import { Seniority } from "@/models/enums/Seniority";

export type FormOptionsResponseDto = {
    contractType: SelectOption<ContractType>[];
    education: SelectOption<HighestEducation>[];
    jobFamily: (SelectOption<string> | GroupedSelectOption<string>)[];
    seniority: SelectOption<Seniority>[];
}