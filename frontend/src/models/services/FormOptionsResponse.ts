import { Seniority } from "@/models/enums/Seniority";
import { ContractType } from "@/models/enums/ContractType";
import { HighestEducation } from "@/models/enums/HighestEducation";
import { OfficeArrangement } from "@/models/enums/OfficeArrangement";
import { GroupedSelectOption, SelectOption } from "@/models/SelectOption";

export type FormOptionsResponse = {
    contractType: SelectOption<ContractType>[];
    education: SelectOption<HighestEducation>[];
    jobFamily: (SelectOption<string> | GroupedSelectOption<string>)[];
    seniority: SelectOption<Seniority>[];
    arrangement: SelectOption<OfficeArrangement>[];
}