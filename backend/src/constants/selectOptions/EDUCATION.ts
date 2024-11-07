import { SelectOption } from "@/models/SelectOption";
import { HighestEducation } from "@/models/enums/HighestEducation";

export const EDUCATION: SelectOption<HighestEducation>[] = [
    { value: HighestEducation.BACHELORS, label: "Bachelor's" },
    { value: HighestEducation.HIGH_SCHOOL, label: "High School" },
    { value: HighestEducation.MASTERS, label: "Master's" },
    { value: HighestEducation.PHD, label: "Phd" },
    { value: HighestEducation.OTHER, label: "Other" },
];