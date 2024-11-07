import { SelectOption } from "@/models/SelectOption";
import { OfficeArrangement } from "@/models/enums/OfficeArrangement";

export const OFFICE_ARRANGEMENT: SelectOption<OfficeArrangement>[] = [
    { value: OfficeArrangement.IN_OFFICE, label: "In Office" },
    { value: OfficeArrangement.HYBRID, label: "Hybrid" },
    { value: OfficeArrangement.REMOTE, label: "Remote" }
];