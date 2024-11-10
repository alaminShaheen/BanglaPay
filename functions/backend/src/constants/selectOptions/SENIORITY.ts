import { SelectOption } from "@/models/SelectOption";
import { Seniority } from "@/models/enums/Seniority";

export const SENIORITY: SelectOption<Seniority>[] = [
    { value: Seniority.INTERN, label: "Entry-level (often <1 years of experience)" },
    { value: Seniority.JUNIOR, label: "Entry-level (often 1-2 years of experience)" },
    { value: Seniority.MID_LEVEL, label: "Mid-level (often 2-5 years of experience)" },
    { value: Seniority.SENIOR, label: "Senior (often 5-10 years of experience)" },
    { value: Seniority.SENIOR_PLUS, label: "Senior+ (often 10+ years of experience)" },
    { value: Seniority.EXECUTIVE, label: "Executive (VP, C-level)" }
];